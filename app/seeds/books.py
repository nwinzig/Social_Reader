from app.models import db, User, environment, SCHEMA, Book


def seed_books():
    book1 = Book(
        name='Dune',author='Frank Herbert', description=" Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib. He would avenge the traitorous plot against his noble family -- and would bring to fruition humankind's most ancient and unattainable dream. A stunning blend of adventure and mysticism, environmentalism and politics, Dune won the first Nebula Award, shared the Hugo Award, and formed the basis of what is undoubtedly the grandest epic in science fiction.", page_number=74, cover_image='https://res.cloudinary.com/dydhvazpw/image/upload/v1669153623/capstone/t93aqtmfiku41_ucwmfk.webp', genre= 'science fiction'
        )
    book2 = Book(
        name='Kafka on the Shore', author='Haruki Murakami', description='Here we meet a teenage boy, Kafka Tamura, who is on the run, and Nakata, an aging simpleton who is drawn to Kafka for reasons he cannot fathom. As their paths converge, acclaimed author Haruki Murakami enfolds readers in a world where cats talk, fish fall from the sky, and spirits slip out of their bodies to make love or commit murder, in what is a truly remarkable journey.', page_number=505, cover_image='https://res.cloudinary.com/dydhvazpw/image/upload/v1669153939/capstone/41EVg-wdnHL._AC_SY780__ykdk1t.jpg', genre='science fiction'
        )
    book3 = Book(
        name='The Art of War', author='Sun Tzu', description='Water shapes its course according to the nature of the ground over which it flows; the soldier works out his victory in relation to the foe whom he is facing. Therefore, just as water retains no constant shape, so in warfare there are no constant conditions.', page_number=224, cover_image='https://res.cloudinary.com/dydhvazpw/image/upload/v1669154483/capstone/41JFPRxkrLL._AC_SY780__obgp7a.jpg', genre = 'non-fiction'
        )

    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    db.session.commit()


def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
