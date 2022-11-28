from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, BookClub, User_BookClub, BookClub_Book, Book

book_routes = Blueprint('book', __name__)
#/api/book

#get all books
@book_routes.route('/', methods=['GET'])
def getAllBooks():
    """This route is used to get all books """

    books  = Book.query.all()
    # print('this shouuld be books', books)
    allBooks = []

    allBooks.extend([i.to_dict() for i in books])
    # print('trying to get all books', allBooks)
    return {'Books': allBooks}


#get one book
@book_routes.route('/<int:id>', methods=['GET'])
def getOneBook(id):
    """This route is used to get details of one book by id """

    book = Book.query.get(id)

    wantedBook = book.to_dict()

    return {'Book': wantedBook}
