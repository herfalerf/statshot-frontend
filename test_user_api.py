"""User API tests."""

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
        