from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, BookClub, User_BookClub
from app.forms import CreateClubForm, UpdateClubForm



bookClub_routes = Blueprint('bookClub', __name__)
#/api/bookclub

#get all book clubs
@bookClub_routes.route('/', methods=['GET'])
def getAllClubs():
    """ This route will be used to access all bookclubs """

    bookClubs = BookClub.query.all()

    allclubs = []

    allclubs.extend([i.to_dict() for i in bookClubs])

    return {'BookClubs': allclubs}


#get all clubs of the current user
@bookClub_routes.route('/userClubs', methods=['GET'])
# @login_required
def userClubs():
    """This route will get all bookclubs for the current user. It will NOT filter based on membership status """

    #get user id
    # userId = current_user.id
    #test user id
    userId = 2
    #find bookclubs in join based on user id
    userToClub = User_BookClub.query.filter(User_BookClub.user_id == userId).all()

    clubList = []
    clubList.extend([i.to_dict() for i in userToClub])

    detailedClubList = []
    ##get details for each club
    for club in clubList:

        clubId = club['bookclub_id']
        desiredClub = getOneClub(clubId)
        myClub = desiredClub['BookClub']
        myClub['member_status'] = club['member_status']
        detailedClubList.append(myClub)


    return {'clubList': detailedClubList}



# get a single club
@bookClub_routes.route('/<int:id>', methods=['GET'])
def getOneClub(id):
    """This route will be used to get the details of one bookclub """

    bookClub = BookClub.query.get(id)

    wantedClub = bookClub.to_dict()

    return {'BookClub': wantedClub}

## getting number of members for a club
@bookClub_routes.route('/numMembers/<int:id>')
def findNumMembers(id):

    members = User_BookClub.query.filter(User_BookClub.bookclub_id == id).all()
    # print('can I take length of members', len(members))
    # print('should be members of the club', members)
    # print('what happens with members', members)
    return {'Members': len(members)}


#create a club
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
@bookClub_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def updateClub(id):
    """This route will be used to update a club that the user owns """
    #find the owner of the club
    # owner = User_BookClub.query.filter(User_BookClub.book_club_id == id and member_status == 'owner')
    # print('this should be User_BookClub with owner status', owner)

    #form
    form = UpdateClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        #find the club
        club = BookClub.query.get(id)
        club.name = form.data['name']
        club.description = form.data['description']
        club.private = form.data['private']

        db.session.commit()
        return club.to_dict()

    return {'Message': 'Failed to upate'}


#delete a club
@bookClub_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def deleteClub(id):

    """This route will be used to delete a club that the user owns """

    #add check to see if user is the owner either here or on the frontend component

    club = BookClub.query.get(id)
    if club is not None:
        db.session.delete(club)
        db.session.commit()
        return {'Message': 'Successfully deleted'}
    return 'Bookclub not found'
