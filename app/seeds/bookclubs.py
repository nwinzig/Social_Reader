from app.models import db, User, environment, SCHEMA, BookClub


def seed_bookclubs():
    club1 = BookClub(
        name='Demo Club', description="Welcome to the first demo club. This club is used to show the functionality of a club from the demo user's perspective.",clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1669398116/capstone/istockphoto-1260329669-612x612_h3d8na.jpg', private=False
        )
    club2 = BookClub(
        name='Explore Goodness', description="We read everything. As long as you enjoy a book then it's a good book. We can't wait to read with you! ",clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1673279862/capstone/download-2_d8wuwy.jpg', private=False
        )
    club3 = BookClub(
        name='Hemingway Rules', description='Be ready for Hemingway. We only read Hemingway. Our goal is to get through all of his works.', clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1673279975/capstone/download-3_p2fi88.jpg',private=False
        )
    club4 = BookClub(
    name='Club Coffee', description='Theres nothing better than drinking coffee and reading a good book.', clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1670203576/capstone/download-1_kdvbij.jpg',private=False
    )
    club5 = BookClub(
        name='Night Owls', description='Read before bed or well into the night. Join us on our nightly adventures.', clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1670254296/capstone/download-1_qayup7.jpg',private=False
    )
    club6 = BookClub(
        name='Fantasy Freaks', description='We love everything fantasy!', clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1673279111/capstone/Writing-Magic-Systems-Feature_jlelgv.jpg',private=False
    )
    club7 = BookClub(
        name='Lonesome Readers', description='I like to read alone. I bet you do too. Join my club if you want book recommendations but want to continue reading alone.', clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1673279460/capstone/download-1_krejnf.jpg',private=False
    )
    club8 = BookClub(
        name='1 2 3 Action', description='We want books that pack a punch. Movies and TV will never come close to the action in a book.', clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1673896156/capstone/download_pkwn34.jpg',private=False
    )

    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.add(club4)
    db.session.add(club5)
    db.session.add(club6)
    db.session.add(club7)
    db.session.add(club8)
    db.session.commit()


def undo_bookclubs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
