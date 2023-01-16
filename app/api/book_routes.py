from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, BookClub, User_BookClub, BookClub_Book, Book, User_Book
from app.forms import CreateBookForm, UpdateBookForm

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

#get bookclubs reading a specific book
@book_routes.route('/<int:id>/clubs', methods=['GET'])
def findClubsReading(id):
    """This route is used to find clubs reading a book by its id. This will be used in book details page """
    clubs = BookClub_Book.query.filter(BookClub_Book.book_id == id).all()
    allclubs = []
    allclubs.extend([i.to_dict() for i in clubs])
    allClubDetails = []
    for club in allclubs:
        clubDetails = BookClub.query.filter(BookClub.id == club['bookclub_id']).first()
        newClub = clubDetails.to_dict()
        newClub['status'] = club['status']
        allClubDetails.append(newClub)
    return {'clubs': allClubDetails}

#get books for a specific user
#'/userId/books'
@book_routes.route('/<int:id>/books', methods=['GET'])
@login_required
def getUserBooks(id):
    user_books = User_Book.query.filter(User_Book.user_id == id).all()
    allbooks = []
    print('what is user books', user_books)
    allbooks.extend([i.to_dict() for i in user_books])
    allBooksDetails = []
    for book in allbooks:
        bookDetails = Book.query.filter(Book.id == book['book_id']).first()
        newBook = bookDetails.to_dict()
        newBook['status'] = book['status']
        newBook['favorite'] = book['favorite']
        allBooksDetails.append(newBook)
    return {'Books':allBooksDetails}


# create a book
@book_routes.route('/newBook', methods=['POST'])
@login_required
def createABook():
    """This route is used to add a book to the database """
    user_id = current_user.id
    # user_id = 1
    form = CreateBookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        coverImage = form.data['cover_image']
        if not coverImage:
            coverImage = 'https://res.cloudinary.com/dydhvazpw/image/upload/v1673291086/capstone/040868_hcimnv.jpg'

        pageNumber = int(form.data['page_number'])
        newBook = Book(
            name = form.data['name'],
            author = form.data['author'],
            description = form.data['description'],
            page_number = pageNumber,
            cover_image = coverImage,
            genre = form.data['genre'],
            added_by = user_id
        )
        db.session.add(newBook)
        db.session.commit()

        bookToReturn = newBook.to_dict()
        return {'Book': bookToReturn}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#update a book
@book_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateBook(id):
    """This route is used to update a book if the user was the one to add it. In the future I would like to change the route to only be accessible by an admin user """
    # user_id = current_user.id

    form = UpdateBookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        book = Book.query.get(id)

        coverImage = form.data['cover_image']
        if not coverImage:
            coverImage = 'https://res.cloudinary.com/dydhvazpw/image/upload/v1673291086/capstone/040868_hcimnv.jpg'

        book.name = form.data['name']
        book.author = form.data['author']
        book.description = form.data['description']
        book.page_number = form.data['page_number']
        book.cover_image = coverImage
        book.genre = form.data['genre']

        db.session.commit()
        return book.to_dict()
    return {'Message': 'Failed to update'}


#delete a book
@book_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteBook(id):
    """This route is used to delete a book by the user that added it. In the future this will only be accessible to admin """

    book = Book.query.get(id)
    if book is not None:
        db.session.delete(book)
        db.session.commit()
        return {'Message': 'Successfully deleted'}
    return 'Book not found'




def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
