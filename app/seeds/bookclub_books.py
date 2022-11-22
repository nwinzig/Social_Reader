from app.models import db, User, environment, SCHEMA, BookClub_Book


def seed_bookclub_books():
    club1 = BookClub_Book(
        book_id=1, bookclub_id=1, status='completed'
        )
    club2 = BookClub_Book(
        book_id=2, bookclub_id=2, status='reading'
        )
    club3 = BookClub_Book(
        book_id=3, bookclub_id=3, status='planning'
        )

    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.commit()


def undo_bookclub_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
