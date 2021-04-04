"""external API tests."""
from flask import session
import os
from unittest import TestCase
from models import db, connect_db

os.environ['DATABASE_URL'] = "postgresql:///statshot_test"

from app import app

db.create_all()

class ExtAPITestCase(TestCase):
    """Test external API calls."""
    
    def setUp(self):
        """Create test client, add sample data"""

        db.drop_all()
        db.create_all()

        self.client = app.test_client()

    def test_valid_teams_response(self):
        """Test that external api call for teams list is functioning properly"""

        with self.client as c:
            reg = c.post('/api/users/register', json={
                                                "username": "validreg", 
                                                "password": "validpass"})
            resp = c.get('api/teams')

            json_data = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertIn("'teamName': 'Stars'", str(json_data))