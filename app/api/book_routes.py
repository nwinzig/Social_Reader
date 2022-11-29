from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, BookClub, User_BookClub, BookClub_Book, Book
from app.forms import CreateBookForm

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

# create a book
@book_routes.route('/newBook', methods=['POST'])
# @login_required
def createABook():
    """This route is used to add a book to the database """
    # user_id = current_user.id

    form = CreateBookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newBook = Book(
            name = form.data['name'],
            author = form.data['author'],
            description = form.data['description'],
            page_number = form.data['page_number'],
            cover_image = form.data['cover_image'],
            genre = form.data['genre']
        )
        db.session.add(newBook)
        db.session.commit()

        bookToReturn = newBook.to_dict()
        return {'Book': bookToReturn}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401







def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
