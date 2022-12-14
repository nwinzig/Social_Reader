from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, BookClub, User_BookClub, BookClub_Book, Book, User_Book
from app.forms import CreateBookForm, UpdateBookForm, addBookToUserShelf, updateBookFromUserShelf, addBookToClubShelf, updateBookFromClubShelf


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


######################
#reading list routes for a bookclub's shelf
#getting books for a club is already done in bookClub_routes.py
#/api/readingList/bookclub
######################

#add a book to a clubs shelf
@readingList_routes.route('/bookclub/<int:clubId>/add', methods=['POST'])
@login_required
def addToClubShelf(clubId):
    """This route is used to add a book to a specific bookclubs bookshelf """

    form = addBookToClubShelf()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        addBook = BookClub_Book(
            book_id = form.data['book_id'],
            bookclub_id = form.data['bookclub_id'],
            status = form.data['status'],
        )
        print('in backend', addBook)
        db.session.add(addBook)
        db.session.commit()

        toReturn = addBook.to_dict()
        return {'Book': toReturn}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#remove a book from a clubs shelf
@readingList_routes.route('/bookclub/<int:clubId>/remove/<int:bookId>', methods=['DELETE'])
@login_required
def removeFromClubShelf(clubId,bookId):
    """This route is used to delete a book from a clubs reading list. It takes in both a club Id and book Id to correctly find the requested book for removal. """

    bookToRemove = BookClub_Book.query.filter(BookClub_Book.bookclub_id == clubId, BookClub_Book.book_id == bookId).first()

    if bookToRemove is not None:
        db.session.delete(bookToRemove)
        db.session.commit()
        return {'Message': 'Removed from list'}
    return 'Book not found'


#update a book already on a clubs shelf
@readingList_routes.route('/bookclub/<int:clubId>/update/<int:bookId>', methods=['PUT'])
@login_required
def updateBookFromClubList(clubId, bookId):
    """This route is used to update existing books in a clubs reading list """

    form = updateBookFromClubShelf()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        book = BookClub_Book.query.filter(BookClub_Book.book_id == bookId, BookClub_Book.bookclub_id == clubId).first()

        if book is not None:
            book.status = form.data['status']

            db.session.commit()
            return book.to_dict()
