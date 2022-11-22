from app.models import db, User, environment, SCHEMA, User_BookClub


def seed_userBookClub():
    club1 = User_BookClub(
        user_id=1, bookclub_id=1, member_status='owner'
        )
    club2 = User_BookClub(
        user_id=2, bookclub_id=2, member_status='owner'
        )
    club3 = User_BookClub(
        user_id=3, bookclub_id=3, member_status='owner'
        )
    club4 = User_BookClub(
        user_id=1, bookclub_id=3, member_status='member'
        )
    club5 = User_BookClub(
        user_id=2, bookclub_id=1, member_status='member'
        )
    club6 = User_BookClub(
        user_id=3, bookclub_id=2, member_status='member'
        )

    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.add(club4)
    db.session.add(club5)
    db.session.add(club6)
    db.session.commit()


def undo_userBookClub():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
