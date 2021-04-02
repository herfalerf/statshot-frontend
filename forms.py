from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired

class RegisterForm(FlaskForm):
    """Form for registering a user."""

    username = StringField("username", validators=[InputRequired()])
    password = PasswordField("password", validators=[InputRequired()])

class LoginForm(FlaskForm):
    """Form for validating user login"""

    username = StringField("username", validators=[InputRequired()])
    password = PasswordField("password", validators=[InputRequired()])