from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, BookClub, User_BookClub, BookClub_Book, Book, User_Book
from app.forms import CreateBookForm, UpdateBookForm, addBookToUserShelf, updateBookFromUserShelf


readingList_routes = Blueprint('readingList', __name__)
# /api/readingList


#get user book list without details
@readingList_routes.route('/get')
@login_required
def userBooksList():
    """This route is used to get books in a user's reading list without specific details. It will be used to compare books in list for update, and also used to assist with state """

    userId = current_user.id
    user_books = User_Book.query.filter(User_Book.user_id == userId).all()
    allBooks = []
    allBooks.extend([i.to_dict() for i in user_books])

    return {'books': allBooks}


# add book to user reading list(bookshelf)
@readingList_routes.route('/add', methods=['POST'])
@login_required
def addToShelf():
    """This route is being used to add a book to the users list, it will need a userId, bookId, and status """

    userId = current_user.id
    form = addBookToUserShelf()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        isFavorite = form.data['favorite']
        if not isFavorite:
            isFavorite = False

        addBook = User_Book(
            user_id = form.data['user_id'],
            book_id = form.data['book_id'],
            status = form.data['status'],
            favorite = isFavorite
        )

        db.session.add(addBook)
        db.session.commit()

        toReturn = addBook.to_dict()
        return {'Book': toReturn}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



#remove book from a users reading list
@readingList_routes.route('/remove/<int:bookId>', methods=['DELETE'])
@login_required
def removeBook(bookId):
    """This route is used to remove a book from a reading list, this will NOT remove the book from the database """
    userId = current_user.id

    bookToDelete = User_Book.query.filter(User_Book.book_id == bookId, User_Book.user_id == userId).first()

    if bookToDelete is not None:
        db.session.delete(bookToDelete)
        db.session.commit()
        return {'Message': 'Removed from list'}
    return 'Book not found'


#update status of a book in user reading list
@readingList_routes.route('/update/status/<int:bookId>', methods=['PUT'])
@login_required
def updateBookStatus(bookId):
    """This route is used to update an existing books status in the users list """

    form = updateBookFromUserShelf()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        book = User_Book.query.filter(User_Book.book_id == bookId, User_Book.user_id == current_user.id).first()

        if book is not None:
            book.status = form.data['status']

            db.session.commit()
            return book.to_dict()
