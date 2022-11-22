from app.models import db, User, environment, SCHEMA, User_Book


def seed_userBooks():
    book1 = User_Book(
        user_id=1, book_id=1, status='reading', favorite=False
        )
    book2 = User_Book(
        user_id=2, book_id=2, status='completed', favorite=True
        )
    book3 = User_Book(
        user_id=3, book_id=3, status='planning', favorite=False
        )

    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    db.session.commit()


def undo_userBooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
