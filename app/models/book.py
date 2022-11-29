from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from .user import User
from .bookClub import BookClub
from sqlalchemy.orm import relationship

# base = declarative_base()

# user_books = db.Table(
#     'user_books',
#     db.Model.metadata,
#     db.Column('user_id', db.ForeignKey('users.id'), primary_key=True),
#     db.Column('book_id', db.ForeignKey('books.id'), primary_key=True),
#     db.Column('status', db.String),
#     db.Column('favorite', db.Boolean)
# )

# bookClub_books = db.Table(
#     'bookClub_books',
#     db.Model.metadata,
#     db.Column('bookClub_id', db.ForeignKey('book_clubs.id', primary_key=True),
#     db.Column('book_id', db.ForeignKey('books.id'), primary_key=True),
#     db.Column('status', db.String))
# )

class Book(db.Model):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    author = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String, nullable=False)
    page_number = db.Column(db.Integer, nullable=False)
    cover_image = db.Column(db.String, nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    added_by = db.Column(db.Integer, nullable=False)

    user_book = db.relationship('User_Book', back_populates='book')
    bookclub_book = db.relationship('BookClub_Book', back_populates='book')

    # users = db.relationship('User', secondary='user_books', back_populates='books')
    # book_clubs = db.relationship('BookClub', secondary='bookClub_books', back_populates='books')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'author': self.author,
            'description': self.description,
            'page_number': self.page_number,
            'cover_image': self.cover_image,
            'genre': self.genre,
            'added_by': self.added_by
        }
