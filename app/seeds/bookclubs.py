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

    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.commit()


def undo_bookclubs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
