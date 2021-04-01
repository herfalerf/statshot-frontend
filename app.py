from flask import Flask, jsonify, request
import requests
from flask_debugtoolbar import DebugToolbarExtension
from secrets import API_SECRET_KEY

app = Flask(__name__)

API_BASE_URL = "https://statsapi.web.nhl.com/api/v1"

app.config['SQLALCHEMY_DATABASE_URI'] = 'no_db_yet'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = API_SECRET_KEY

debug = DebugToolbarExtension(app)

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

