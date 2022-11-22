from .db import db, environment, SCHEMA, add_prefix_for_prod

class BookClub_Book(db.Model):
    __tablename__ = 'bookclub_books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')))
    bookclub_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('book_clubs.id')))
    status = db.Column(db.String(50))

    book = db.relationship('Book', back_populates='bookclub_book')
    book_club = db.relationship('BookClub', back_populates='bookclub_book')

    def to_dict(self):
        return {
            'id': self.id,
            'book_id': self.book_id,
            'bookclub_id': self.bookclub_id,
            'status': self.status
        }
