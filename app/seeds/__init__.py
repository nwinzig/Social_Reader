from flask.cli import AppGroup
from .users import seed_users, undo_users
from .bookclub_books import seed_bookclub_books, undo_bookclub_books
from .user_books import seed_userBooks, undo_userBooks
from .bookclubs import seed_bookclubs, undo_bookclubs
from .books import seed_books, undo_books
from .user_bookclub import seed_userBookClub, undo_userBookClub

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_books()
        undo_bookclubs()
        undo_userBookClub()
        undo_userBooks()
        undo_bookclub_books()
    seed_users()
    seed_books()
    seed_bookclubs()
    seed_userBookClub()
    seed_userBooks()
    seed_bookclub_books()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_books()
    undo_bookclubs()
    undo_userBookClub()
    undo_userBooks()
    undo_bookclub_books()
    # Add other undo functions here
