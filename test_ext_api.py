"""external API tests."""
from flask import session
import os
from unittest import TestCase
from models import db, connect_db

os.environ['DATABASE_URL'] = "postgresql:///statshot_test"

from app import app

db.create_all()