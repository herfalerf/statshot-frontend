"""Preference model tests."""

import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Prefence

os.environ['DATABASE_URL'] = "postgresql:///statshot_test"

from app import app

db.create_all()