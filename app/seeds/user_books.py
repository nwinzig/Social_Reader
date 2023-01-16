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
    book4 = User_Book(
        user_id=1, book_id=4, status='planning', favorite=False
        )
    book5 = User_Book(
        user_id=1, book_id=8, status='planning', favorite=False
        )
    book6 = User_Book(
        user_id=1, book_id=10, status='planning', favorite=False
        )
    book7 = User_Book(
        user_id=1, book_id=31, status='completed', favorite=False
        )
    book8 = User_Book(
        user_id=1, book_id=28, status='completed', favorite=False
        )
    book9 = User_Book(
        user_id=1, book_id=29, status='completed', favorite=False
        )
    book10 = User_Book(
        user_id=1, book_id=30, status='completed', favorite=False
        )
    book11 = User_Book(
        user_id=1, book_id=32, status='completed', favorite=False
        )
    book12 = User_Book(
        user_id=1, book_id=5, status='completed', favorite=False
        )


    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    db.session.add(book4)
    db.session.add(book5)
    db.session.add(book6)
    db.session.add(book7)
    db.session.add(book8)
    db.session.add(book9)
    db.session.add(book10)
    db.session.add(book11)
    db.session.add(book12)
    db.session.commit()


def undo_userBooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
