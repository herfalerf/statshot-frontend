"""User API tests."""
from flask import session
import os
from unittest import TestCase
from models import db, connect_db, User, Preference

os.environ['DATABASE_URL'] = "postgresql:///statshot_test"

from app import app

db.create_all()

class UserAPITestCase(TestCase):
    """Test API for prefs"""

    def setUp(self):
        """Create test client, add sample data"""

        db.drop_all()
        db.create_all()

        app.config['SECRET_KEY'] = 'testsecretkey'

        self.client = app.test_client()

        db.session.commit()

    def tearDown(self):
        """Tear down after tests run"""
        resp = super().tearDown()
        db.session.rollback()
        return resp
    
    def test_valid_set_prefs_response(self):
        """Test json response from valid user prefs POST call"""

        with self.client as c:
            reg = c.post('/api/users/register', json={
                                                "username": "validreg", 
                                                "password": "validpass"})

            user = User.query.filter_by(username='validreg').first()
            resp = c.post(f'/api/prefs/{user.id}', json={"favTeamId": 25})

            json_data = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertIn("'favTeam': '25'", str(json_data))
            
