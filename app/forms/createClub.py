from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, SelectField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import BookClub

def club_exists(form,field):
    name = field.data
    findClub = BookClub.query.filter(BookClub.name == name).first()
    if findClub:
        raise ValidationError('Book club already exists')

class CreateClubForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), club_exists])
    description = StringField('Description', validators=[DataRequired()])
    clubImage = StringField('Image')
    private = BooleanField('Private')
