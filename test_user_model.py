"""User model tests."""

import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User

os.environ['DATABASE_URL'] = "postgresql:///statshot_test"

from app import app

db.create_all()

class UserModelTestCase(TestCase):
    """Tests for user model"""

    def setUp(self):
        """Crease test client, add sample data"""

        db.drop_all()
        db.create_all()

        u1 = User.register("test1", "passwordtest1")
        uid1 = 1111
        u1.id = uid1

        db.session.commit()

        u1 = User.query.get(uid1)

        self.u1 = u1
        self.uid1 = uid1

        self.client = app.test_client()
    
    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res
    
    def test_user_model(self):
        """Test basic model functionality"""

        u = User(
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        self.assertEqual(u.username, "testuser")
        self.assertEqual(self.u1.username, "test1")
    
    def test_valid_register(self):
        u_test = User.register("regtest", "regpasswordtest")
        uid = 999
        u_test.id = uid
        db.session.commit()

        u_test = User.query.get(uid)
        self.assertIsNotNone(u_test)
        self.assertEqual(u_test.username, "regtest")
        self.assertNotEqual(u_test.password, "regpasswordtest")
        # Bcrpt strings should start with $2b$
        self.assertTrue(u_test.password.startswith("$2b$"))