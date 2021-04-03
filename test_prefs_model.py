"""Preference model tests."""

import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Preference

os.environ['DATABASE_URL'] = "postgresql:///statshot_test"

from app import app

db.create_all()

class PrefsModelTestCase(TestCase):
    """Tests for Preference model"""

    def setUp(self):
        """Create test client, add sample data"""
        db.drop_all()
        db.create_all()

        u1 = User.register("test1", "passwordtest1")
        uid1 = 1111
        u1.id = uid1

        db.session.commit()

        p1 = Preference(
             user_id = u1.id,
             fav_team_ud = 25
        )

        db.session.commit()

        self.p1 = p1
        self.client = app.test_client()

    def tearDown(self):
        """Tear down after each test"""
        res = super().tearDown()
        db.session.rollback()
        return res



