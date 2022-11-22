from .db import db, environment, SCHEMA, add_prefix_for_prod



class User_Book(db.Model):
    __tablename__ = 'user_books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')))
    status = db.Column(db.String(50))
    favorite = db.Column(db.Boolean)

    user = db.relationship('User', back_populates='user_book')
    book = db.relationship('Book', back_populates='user_book')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'status': self.status,
            'favorite': self.favorite
        }
