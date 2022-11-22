from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User_BookClub(db.Model):
    __tablename__ = 'user_bookclubs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    bookclub_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('book_clubs.id')))
    member_status = db.Column(db.String(100))

    user = db.relationship('User', back_populates='user_bookclub')
    bookclub = db.relationship('BookClub', back_populates='user_bookclub')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bookclub_id': self.bookclub_id,
            'member_status': self.member_status
        }
