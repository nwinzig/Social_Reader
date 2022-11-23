from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, BookClub, User_BookClub
from app.forms import CreateClubForm, UpdateClubForm



bookClub_routes = Blueprint('bookClub', __name__)


#get all book clubs
@bookClub_routes.route('/', methods=['GET'])
def getAllClubs():
    """ This route will be used to access all bookclubs """

    bookClubs = BookClub.query.all()

    allclubs = []

    allclubs.extend([i.to_dict() for i in bookClubs])

    return {'BookClubs': allclubs}


# get a single club
@bookClub_routes.route('/<int:id>', methods=['GET'])
def getOneClub(id):
    """This route will be used to get the details of one bookclub """

    bookClub = BookClub.query.get(id)

    wantedClub = bookClub.to_dict()

    return {'BookClub': wantedClub}


@bookClub_routes.route('/newClub', methods=['POST'])
# @login_required
def createBookClub():
    """This route will be used to create a new book club """
    # userId = current_user.id
    # user id to test
    userId = 1
    #end
    form = CreateClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newClub = BookClub(
            name = form.data['name'],
            description = form.data['description'],
            private = form.data['private']
        )

        db.session.add(newClub)
        db.session.commit()

        newMember = User_BookClub(
            user_id = userId,
            bookclub_id = newClub.id,
            member_status = 'owner'
        )

        db.session.add(newMember)
        db.session.commit()

        clubToReturn = newClub.to_dict()
        print('what does the new club look like', clubToReturn)
        return {'BookClub': clubToReturn}
    return {'Message': "Couldn't create Bookclub"}


#update a club
@bookClub_routes.route('/int:<id>', methods=['PUT'])
# @login_required
def updateClub(id):
    # userId = current_user.id
    #find the club
    bookClub = BookClub.query.get(id)

    #find the owner of the club
    owner = User_BookClub.query.filter(User_BookClub.book_club_id == id and member_status == 'owner')
    print('this should be User_BookClub with owner status', owner)

    #compare to see if user is also owner
    if owner.user_id == userId:
        form = UpdateClubForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        bookClub.name = form.data['name']
        bookClub.description = form.data['description']
        bookClub.private = form.data['private']

        db.session.commit()
