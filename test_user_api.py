"""User API tests."""
from flask import jsonify
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