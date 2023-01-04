from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, SelectField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Book, User_Book

#for user bookshelf
class addBookToUserShelf(FlaskForm):
    user_id = IntegerField('userId',validators=[DataRequired()])
    book_id = IntegerField('bookId',validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])
    favorite = BooleanField('favorite')


class updateBookFromUserShelf(FlaskForm):
    user_id = IntegerField('userId',validators=[DataRequired()])
    book_id = IntegerField('bookId',validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])
    favorite = BooleanField('favorite')


#for bookclub shelf
class addBookToClubShelf(FlaskForm):
    book_id = IntegerField('bookId', validators=[DataRequired()])
    bookclub_id = IntegerField('clubId', validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])

class updateBookFromClubShelf(FlaskForm):
    book_id = IntegerField('bookId', validators=[DataRequired()])
    bookclub_id = IntegerField('clubId', validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])
