"""empty message

Revision ID: 369469e48270
Revises:
Create Date: 2022-11-23 12:02:41.106545

"""
from alembic import op
import sqlalchemy as sa
import os
# environment = os.getenv("FLASK_ENV")
# SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '369469e48270'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('book_clubs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('private', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )

    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('author', sa.String(length=150), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('page_number', sa.Integer(), nullable=False),
    sa.Column('cover_image', sa.String(), nullable=False),
    sa.Column('genre', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )

    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('profile_image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    op.create_table('bookclub_books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('bookclub_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['bookclub_id'], ['book_clubs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('user_bookclubs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('bookclub_id', sa.Integer(), nullable=True),
    sa.Column('member_status', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['bookclub_id'], ['book_clubs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('user_books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.String(length=50), nullable=True),
    sa.Column('favorite', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_books')
    op.drop_table('user_bookclubs')
    op.drop_table('bookclub_books')
    op.drop_table('users')
    op.drop_table('books')
    op.drop_table('book_clubs')
    # ### end Alembic commands ###
