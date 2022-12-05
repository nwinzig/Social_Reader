from app.models import db, User, environment, SCHEMA, Book


def seed_books():
    book1 = Book(
        name='Dune',author='Frank Herbert', description=" Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib. He would avenge the traitorous plot against his noble family -- and would bring to fruition humankind's most ancient and unattainable dream. A stunning blend of adventure and mysticism, environmentalism and politics, Dune won the first Nebula Award, shared the Hugo Award, and formed the basis of what is undoubtedly the grandest epic in science fiction.", page_number=74, cover_image='https://res.cloudinary.com/dydhvazpw/image/upload/v1669153623/capstone/t93aqtmfiku41_ucwmfk.webp', genre= 'Fiction', added_by = 1
        )
    book2 = Book(
        name='Kafka on the Shore', author='Haruki Murakami', description='Here we meet a teenage boy, Kafka Tamura, who is on the run, and Nakata, an aging simpleton who is drawn to Kafka for reasons he cannot fathom. As their paths converge, acclaimed author Haruki Murakami enfolds readers in a world where cats talk, fish fall from the sky, and spirits slip out of their bodies to make love or commit murder, in what is a truly remarkable journey.', page_number=505, cover_image='https://res.cloudinary.com/dydhvazpw/image/upload/v1669153939/capstone/41EVg-wdnHL._AC_SY780__ykdk1t.jpg', genre='Fiction', added_by = 2
        )
    book3 = Book(
        name='The Art of War', author='Sun Tzu', description='Water shapes its course according to the nature of the ground over which it flows; the soldier works out his victory in relation to the foe whom he is facing. Therefore, just as water retains no constant shape, so in warfare there are no constant conditions.', page_number=224, cover_image='https://res.cloudinary.com/dydhvazpw/image/upload/v1669154483/capstone/41JFPRxkrLL._AC_SY780__obgp7a.jpg', genre = 'Nonfiction', added_by = 3
        )
    # book4 = Book(
    #     name='A Deadly Education', author='Naomi Novik', description="I decided that Orion Lake needed to die after the second time he saved my life. Everyone loves Orion Lake. Everyone else, that is. Far as I'm concerned, he can keep his flashy combat magic to himself. I'm not joining his pack of adoring fans. I don't need help surviving the Scholomance, even if they do. Forget the hordes of monsters and cursed artifacts, I'm probably the most dangerous thing in the place. Just give me a chance and I'll level mountains and kill untold millions, make myself the dark queen of the world. At least, that's what the world expects. Most of the other students in here would be delighted if Orion killed me like one more evil thing that's crawled out of the drains. Sometimes I think they want me to turn into the evil witch they assume I am. The school certainly does. But the Scholomance isn't getting what it wants from me. And neither is Orion Lake. I may not be anyone's idea of the shining hero, but I'm going to make it out of this place alive, and I'm not going to slaughter thousands to do it, either. Although I'm giving serious consideration to just one.", page_number=338, cover_image='https://res.cloudinary.com/dydhvazpw/image/upload/v1670200289/capstone/download_kmtixb.jpg', genre = 'Fiction', added_by = 1
    # )
    book5 = Book(
        name='The Sun Also Rises', author='Ernest Hemingway', description="Originally published in 1926. The Sun Also Rises is Ernest Hemingway's first novel and a classic example of his spare but powerful writing style. A poignant look at the disillusionment and angst of the post-World War 1 generation, the novel introduces two of Hemingway's most unforgettable characters: Jake Barnes and Lady Brett Ashley. The story follows the flamboyant Brett and the hapless Jake as they journey from the wild nightlife of 1920s Paris to the brutal bullfighting rings of Spain with a motley group of expatriates. In his first great literary masterpiece, Hemingway portrays an age of moral bankruptcy, spiritual dissolution, unrealized love, and vanishing illusions.", page_number=279, cover_image='https://res.cloudinary.com/dydhvazpw/image/upload/v1670200625/capstone/The_Sun_Also_Rises__1st_ed._cover_fe2tcr.jpg', genre = 'Fiction', added_by = 1
    )
    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    # db.session.add(book4)
    db.session.add(book5)
    db.session.commit()


def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
