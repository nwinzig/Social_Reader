from app.models import db, User, environment, SCHEMA, BookClub_Book


def seed_bookclub_books():
    club1 = BookClub_Book(
        book_id=1, bookclub_id=1, status='completed'
        )
    club1b2 = BookClub_Book(
        book_id=10, bookclub_id=1, status='reading'
        )
    club1b3 = BookClub_Book(
        book_id=20, bookclub_id=1, status='completed'
        )
    club1b4 = BookClub_Book(
        book_id=22, bookclub_id=1, status='completed'
        )
    club1b4 = BookClub_Book(
        book_id=23, bookclub_id=1, status='planning'
        )
    club2 = BookClub_Book(
        book_id=2, bookclub_id=2, status='reading'
        )
    club2b2 = BookClub_Book(
        book_id=4, bookclub_id=2, status='planning'
        )
    club2b3 = BookClub_Book(
        book_id=6, bookclub_id=2, status='planning'
        )
    club2b4 = BookClub_Book(
        book_id=8, bookclub_id=2, status='completed'
        )
    club3 = BookClub_Book(
        book_id=5, bookclub_id=3, status='reading'
        )
    club3b2 = BookClub_Book(
        book_id=8, bookclub_id=3, status='planning'
        )
    club4b1 = BookClub_Book(
        book_id=30, bookclub_id=4, status='planning'
        )
    club4b2 = BookClub_Book(
        book_id=31, bookclub_id=4, status='planning'
        )
    club4b3 = BookClub_Book(
        book_id=27, bookclub_id=4, status='reading'
        )
    club4b4 = BookClub_Book(
        book_id=18, bookclub_id=4, status='completed'
        )
    club4b5 = BookClub_Book(
        book_id=26, bookclub_id=4, status='completed'
        )
    club5b1 = BookClub_Book(
        book_id=29, bookclub_id=5, status='completed'
        )
    club5b2 = BookClub_Book(
        book_id=30, bookclub_id=5, status='completed'
        )
    club5b3 = BookClub_Book(
        book_id=31, bookclub_id=5, status='completed'
        )
    club5b4 = BookClub_Book(
        book_id=7, bookclub_id=5, status='reading'
        )
    club5b5 = BookClub_Book(
        book_id=21, bookclub_id=5, status='planning'
        )
    club5b6 = BookClub_Book(
        book_id=20, bookclub_id=5, status='planning'
        )
    club5b7 = BookClub_Book(
        book_id=18, bookclub_id=5, status='planning'
        )
    club6b1 = BookClub_Book(
        book_id=9, bookclub_id=6, status='reading'
        )
    club6b2 = BookClub_Book(
        book_id=10, bookclub_id=6, status='planning'
        )
    club6b3 = BookClub_Book(
        book_id=11, bookclub_id=6, status='planning'
        )
    club6b4 = BookClub_Book(
        book_id=12, bookclub_id=6, status='completed'
        )
    club6b5 = BookClub_Book(
        book_id=13, bookclub_id=6, status='completed'
        )
    club6b6 = BookClub_Book(
        book_id=15, bookclub_id=6, status='completed'
        )
    club6b7 = BookClub_Book(
        book_id=16, bookclub_id=6, status='completed'
        )
    club6b8 = BookClub_Book(
        book_id=17, bookclub_id=6, status='completed'
        )
    club6b9 = BookClub_Book(
        book_id=18, bookclub_id=6, status='completed'
        )
    club7b1 = BookClub_Book(
        book_id=19, bookclub_id=7, status='completed'
        )
    club7b2 = BookClub_Book(
        book_id=20, bookclub_id=7, status='completed'
        )
    club7b3 = BookClub_Book(
        book_id=33, bookclub_id=7, status='reading'
        )
    club7b4 = BookClub_Book(
        book_id=21, bookclub_id=7, status='planning'
        )
    club7b5 = BookClub_Book(
        book_id=22, bookclub_id=7, status='planning'
        )
    club8b1 = BookClub_Book(
        book_id=23, bookclub_id=8, status='reading'
        )
    club8b2 = BookClub_Book(
        book_id=24, bookclub_id=8, status='planning'
        )
    club8b3 = BookClub_Book(
        book_id=25, bookclub_id=8, status='planning'
        )
    db.session.add(club1)
    db.session.add(club1b2)
    db.session.add(club1b3)
    db.session.add(club1b4)
    db.session.add(club2)
    db.session.add(club2b2)
    db.session.add(club2b3)
    db.session.add(club2b4)
    db.session.add(club3)
    db.session.add(club3b2)
    db.session.add(club4b1)
    db.session.add(club4b2)
    db.session.add(club4b3)
    db.session.add(club4b4)
    db.session.add(club4b5)
    db.session.add(club5b1)
    db.session.add(club5b2)
    db.session.add(club5b3)
    db.session.add(club5b4)
    db.session.add(club5b5)
    db.session.add(club5b6)
    db.session.add(club5b7)
    db.session.add(club6b1)
    db.session.add(club6b2)
    db.session.add(club6b3)
    db.session.add(club6b4)
    db.session.add(club6b5)
    db.session.add(club6b6)
    db.session.add(club6b7)
    db.session.add(club6b8)
    db.session.add(club6b9)
    db.session.add(club7b1)
    db.session.add(club7b2)
    db.session.add(club7b3)
    db.session.add(club7b4)
    db.session.add(club7b5)
    db.session.add(club8b1)
    db.session.add(club8b2)
    db.session.add(club8b3)


    db.session.commit()


def undo_bookclub_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
