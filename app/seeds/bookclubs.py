from app.models import db, User, environment, SCHEMA, BookClub


def seed_bookclubs():
    club1 = BookClub(
        name='Club1', description='This is the first seeder club.',clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1669398116/capstone/istockphoto-1260329669-612x612_h3d8na.jpg', private=False
        )
    club2 = BookClub(
        name='Club2', description='This is the second seeder club.',clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1669398116/capstone/istockphoto-1260329669-612x612_h3d8na.jpg', private=False
        )
    club3 = BookClub(
        name='Club3', description='This is the third seeder club.', clubImage='https://res.cloudinary.com/dydhvazpw/image/upload/v1669398116/capstone/istockphoto-1260329669-612x612_h3d8na.jpg',private=False
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

    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.add(club4)
    db.session.add(club5)
    db.session.add(club6)
    db.session.commit()


def undo_bookclubs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
