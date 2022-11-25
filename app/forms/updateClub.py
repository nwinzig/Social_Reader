from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, SelectField, DecimalField, BooleanField
from wtforms.validators import DataRequired


class UpdateClubForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    clubImage = StringField('Image')
    private = BooleanField('Private')
