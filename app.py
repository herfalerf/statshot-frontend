from flask import Flask, jsonify, request, session
import requests
from flask_debugtoolbar import DebugToolbarExtension
from secrets import API_SECRET_KEY
from forms import RegisterForm, LoginForm
from models import connect_db, db, User, Preference



app = Flask(__name__)


API_BASE_URL = "https://statsapi.web.nhl.com/api/v1"

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///statshot_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = API_SECRET_KEY
app.config['WTF_CSRF_ENABLED'] = False

debug = DebugToolbarExtension(app)

connect_db(app)




@app.route('/api/teams', methods=["GET"])
def get_teams():
    """Call NHL API to get lucky number"""

    res_teams = requests.get(f"{API_BASE_URL}/teams")
    teams_data = res_teams.json()
    return jsonify(teams_data)


@app.route('/api/teams/<int:id>', methods=["GET"])
def get_specified_team(id):
    """Call data for specific team by team id"""

    res_team = requests.get(f"{API_BASE_URL}/teams/{id}")
    team_data = res_team.json()
    return jsonify(team_data)


@app.route('/api/register', methods=["POST"])
def register():
    """Register a user:  receive JSON form data and submit to DB"""
    
    success = {}
    form = RegisterForm()

    if form.validate_on_submit():

        username = request.json["username"]
        password = request.json["password"]

        user = User.register(username, password)

        db.session.add(user)
        db.session.commit()

        session['username'] = user.username

        success['success'] = 'True'
    
        return jsonify(success)
    else:
        success['success'] = 'False'
        return jsonify(success)

    
@app.route('/api/login', methods=["POST"])
def login():
    """Login a user: recieve JSON form data and authenticate username/password."""

    success = {}
    form = LoginForm()

    if form.validate_on_submit():

        username = request.json["username"]
        password = request.json["password"]

        user = User.authenticate(username, password)
        if user: 
            session['username'] = user.username
            success['success'] = 'True'

            return jsonify(success)
        else:
            success['success'] = 'False'
        
            return jsonify(success)

@app.route('/api/prefs', methods=["GET", "POST"])
def prefs():
    """Get user prefs on GET request, set user prefs on POST request"""

    