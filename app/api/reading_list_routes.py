from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, BookClub, User_BookClub, BookClub_Book, Book, User_Book
from app.forms import CreateBookForm, UpdateBookForm, addBookToUserShelf


readingList_routes = Blueprint('readingList', __name__)
# /api/readingList



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
        print('add book in backend', addBook)
        db.session.add(addBook)
        db.session.commit()

        toReturn = addBook.to_dict()
        return {'Book': toReturn}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
