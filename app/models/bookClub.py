from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from .user import User
from sqlalchemy.orm import relationship

# base = declarative_base()

# user_bookclub = db.Table(
#     'user_bookclub',
#     db.Model.metadata,
#     db.Column('user_id', db.ForeignKey('users.id'), primary_key=True),
#     db.Column('book_club_id', db.ForeignKey('book_clubs.id', primary_key=True),
#     db.Column('member_status', db.String))
# )

class BookClub(db.Model):
    __tablename__ = 'book_clubs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)
    clubImage = db.Column(db.String)
    private = db.Column(db.Boolean, nullable=False)



    user_bookclub = db.relationship('User_BookClub', back_populates='bookclub', cascade='all, delete-orphan')
    bookclub_book = db.relationship('BookClub_Book', back_populates='book_club', cascade='all, delete-orphan')

    # books = db.relationship('Book', secondary='bookClub_books', back_populates='book_clubs')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'clubImage': self.clubImage,
            'private': self.private
        }
