"""User API tests."""
from flask import session
import os
from unittest import TestCase
from models import db, connect_db, User, Preference

os.environ['DATABASE_URL'] = "postgresql:///statshot_test"

from app import app, API_BASE_URL

db.create_all()

class UserAPITestCase(TestCase):
    """Test API for users."""

    def setUp(self):
        """Create test client, add sample data"""

        db.drop_all()
        db.create_all()

        app.config['SECRET_KEY'] = 'testsecretkey'

        self.client = app.test_client()

        self.testuser = User.register(username="testuser",
                                      password="testpass")
        self.testuser_id = 9999
        self.testuser.id = self.testuser_id

        db.session.commit()

    def tearDown(self):
        """Tear down after tests run"""
        resp = super().tearDown()
        db.session.rollback()
        return resp


# Registration Tests

    def test_valid_register_response(self):
        """Test json response from valid user registration"""
        with self.client as c:
            resp = c.post('/api/users/register', json={
                                                "username": "validreg", 
                                                "password": "validpass"})
            json_data = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertIn('True', str(json_data))

    def test_invalid_username_response(self):
        with self.client as c:
            resp = c.post('/api/users/register', json={
                                                "username": "", 
                                                "password": "validpass"})
            
            json_data = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertIn('False', str(json_data))
    
    def test_none_username_response(self):
        with self.client as c:
            resp = c.post('/api/users/register', json={
                                                "username": None, 
                                                "password": "validpass"})
            
            json_data = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertIn('False', str(json_data))
    
    def test_invalid_password_response(self):
        with self.client as c:
            resp = c.post('/api/users/register', json={
                                                "username": "validreg", 
                                                "password": ""})
            
            json_data = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertIn('False', str(json_data))
    
    def test_invalid_password_response(self):
        with self.client as c:
            resp = c.post('/api/users/register', json={
                                                "username": "validreg", 
                                                "password": None})
            
            json_data = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertIn('False', str(json_data))
    
    def test_user_in_session_on_reg(self):
        with self.client as c:
            resp = c.post('/api/users/register', json={
                                                "username": "validreg", 
                                                "password": "validpass"})
            
            user = User.query.filter_by(username='validreg').first()

            self.assertEqual(session['username'], user.username)
            self.assertEqual(session['user_id'], user.id)

#Login Tests

    def test_valid_login_response(self):
        with self.client as c:
            resp_reg = c.post('/api/users/register', json={
                                                "username": "validreg", 
                                                "password": "validpass"})
            
            session.pop("username", None)
            session.pop("user_id", None)
            session.pop("fav_team", None)

            resp_login = c.post('/api/users/login', json={
                                                "username": "validreg", 
                                                "password": "validpass"})

            json_data = resp_login.get_json()
            
            self.assertEqual(resp_login.status_code, 200)
            self.assertIn('True', str(json_data))