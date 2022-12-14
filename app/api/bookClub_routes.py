from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, BookClub, User_BookClub, BookClub_Book, Book
from app.forms import CreateClubForm, UpdateClubForm, JoinClubForm



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
@bookClub_routes.route('/userClubs/<int:id>', methods=['GET'])
@login_required
def userClubs(id):
    """This route will get all bookclubs for the current user. It will NOT filter based on membership status, the argument it recieves is the id of a user """

    #find bookclubs in join based on user id
    userToClub = User_BookClub.query.filter(User_BookClub.user_id == id).all()
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
    return {'bookClubs': detailedClubList}


#get all clubs that the user owns
@bookClub_routes.route('/userClubs/<int:id>/owned', methods=['GET'])
@login_required
def userOwnedClubs(id):
    """This route is used to get the clubs that a user owns. It will filter all clubs associated with the user to only return clubs with membership_status of owner."""

    #find clubs from join table
    userOwnedClubs = User_BookClub.query.filter(User_BookClub.user_id == id, User_BookClub.member_status == 'owner')

    clubList = []
    clubList.extend([i.to_dict() for i in userOwnedClubs])
    detailedList = []

    #get details for the clubs to be returned
    for club in clubList:
        clubId = club['bookclub_id']
        desiredClub = getOneClub(clubId)
        myClub = desiredClub['BookClub']
        myClub['member_status'] = club['member_status']
        detailedList.append(myClub)
    return {'bookClubs': detailedList}



# get a single club
@bookClub_routes.route('/<int:id>', methods=['GET'])
def getOneClub(id):
    """This route will be used to get the details of one bookclub """

    bookClub = BookClub.query.get(id)

    wantedClub = bookClub.to_dict()

    clubOwner = User_BookClub.query.filter(User_BookClub.bookclub_id == id, User_BookClub.member_status == "owner").first()

    # print('looking for an owner instance', clubOwner.to_dict())

    owner = clubOwner.to_dict()

    wantedClub['ownerId'] = owner['user_id']
    # print('new wanted club', wantedClub)
    return {'BookClub': wantedClub}

## getting number of members for a club
@bookClub_routes.route('/numMembers/<int:id>')
def findNumMembers(id):
    """This route is only used incase the number of members for a group is needed """

    members = User_BookClub.query.filter(User_BookClub.bookclub_id == id).all()
    allMembers = []
    allMembers.extend([i.to_dict() for i in members])

    # print('allmembers from numMembers', allMembers)
    return {'Members': allMembers}

#getting books for the club
@bookClub_routes.route('/<int:id>/books')
def findclubBooks(id):
    """This route will only be used to find a clubs books """

    books = BookClub_Book.query.filter(BookClub_Book.bookclub_id == id).all()
    allBooks = []
    allBooks.extend([i.to_dict() for i in books])
    allBooksDetails = []
    for book in allBooks:
        bookDetails = Book.query.filter(Book.id == book['book_id']).first()
        newBook = bookDetails.to_dict()
        newBook['status'] = book['status']
        allBooksDetails.append(newBook)
    return {'books': allBooksDetails}


#create a club
@bookClub_routes.route('/newClub', methods=['POST'])
@login_required
def createBookClub():
    """This route will be used to create a new book club """
    userId = current_user.id
    # user id to test
    # userId = 1
    #end
    form = CreateClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print('club image in back', form.data['clubImage'])
        bookClubImage = form.data['clubImage']
        if not bookClubImage:
            bookClubImage = 'https://res.cloudinary.com/dydhvazpw/image/upload/v1669156973/capstone/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714_ts2m47.jpg'

        newClub = BookClub(
            name = form.data['name'],
            description = form.data['description'],
            clubImage = bookClubImage,
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
        # print('what does the new club look like', clubToReturn)
        return {'BookClub': clubToReturn}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#update a club
@bookClub_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateClub(id):
    """This route will be used to update a club that the user owns """
    #find the owner of the club
    # owner = User_BookClub.query.filter(User_BookClub.book_club_id == id and member_status == 'owner')
    # print('this should be User_BookClub with owner status', owner)

    #form
    form = UpdateClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        bookClubImage = form.data['clubImage']
        if not bookClubImage:
            bookClubImage = 'https://res.cloudinary.com/dydhvazpw/image/upload/v1669156973/capstone/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714_ts2m47.jpg'


        #find the club
        club = BookClub.query.get(id)
        club.name = form.data['name']
        club.description = form.data['description']
        club.clubImage = bookClubImage
        # club.private = form.data['private']

        db.session.commit()
        return club.to_dict()

    return {'Message': 'Failed to upate'}


#delete a club
@bookClub_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteClub(id):

    """This route will be used to delete a club that the user owns """

    #add check to see if user is the owner either here or on the frontend component
    # print('made it here')
    club = BookClub.query.get(id)
    if club is not None:
        db.session.delete(club)
        db.session.commit()
        return {'Message': 'Successfully deleted'}
    return 'Bookclub not found'



#become a member of a club
@bookClub_routes.route('/<int:id>/join', methods=['POST'])
@login_required
def joinClub(id):
    # print('we are in here for a join')
    userId = current_user.id
    form = JoinClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newMember = User_BookClub(
            user_id = userId,
            bookclub_id = id,
            member_status = 'member'
        )
        db.session.add(newMember)
        db.session.commit()

        memberToReturn = newMember.to_dict()
        return {'Member': memberToReturn}
    return {'errors': 'could not join club'}


#remove member from a club
@bookClub_routes.route('/<int:id>/leave', methods=['DELETE'])
@login_required
def leaveClub(id):
    # print('inside the function!!!!!!!!!!!!!!!!!!!!')
    userId = current_user.id
    # print('user Id', userId)
    # print('should be the club id', id)
    member = User_BookClub.query.filter(User_BookClub.user_id == userId, User_BookClub.member_status == "member", User_BookClub.bookclub_id == id).first()
    # newMember = member.to_dict()
    # print('member from query', newMember)
    # print('what happens with all', member)
    db.session.delete(member)
    db.session.commit()
    return {'Message': 'Removed from club'}




def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
