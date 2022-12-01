from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, SelectField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Book

def book_exists(form,field):
    name = field.data
    findBook = Book.query.filter(Book.name == name).first()
    if findBook:
        raise ValidationError('Book already exists, try to search for it')


class CreateBookForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), book_exists])
    author = StringField('Author', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    page_number = IntegerField('Pages', validators=[DataRequired()])
    cover_image = StringField('Image')
    genre = SelectField('genre', validators=[DataRequired()], choices=['Fiction', 'Nonfiction', 'Drama', 'Poetry', 'Folktale'])
    added_by = IntegerField('AddedBy')
