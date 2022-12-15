from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, SelectField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Book, User_Book

class addBookToUserShelf(FlaskForm):
    user_id = IntegerField('userId',validators=[DataRequired()])
    book_id = IntegerField('bookId',validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])
    favorite = BooleanField('favorite')
