from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, SelectField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import User_BookClub


class JoinClubForm(FlaskForm):
    user_id = IntegerField('user_id')
    bookclub_id = IntegerField('bookclub_id')
    member_status = StringField('member_status')
