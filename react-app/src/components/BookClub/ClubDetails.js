import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams, NavLink } from 'react-router-dom'
import './ClubDetails.css'
import { getOneClub } from '../../store/bookclub'
import { getClubBooksList, removeFromClubList } from '../../store/clubReadingList'

function ClubDetails(){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const bookClub = useSelector((state) => state.bookclubs.BookClub)

    const books = useSelector((state) => state.clubReadingList.books)

    const {clubId} = useParams()
    useEffect(() => {
        dispatch(getOneClub(clubId)).then(dispatch(getClubBooksList(clubId)))
    }, [dispatch, clubId])

    const [members, setMembers] = useState([])
    useEffect(() => {

        async function fetchNumMembers(){
            const request = await fetch(`/api/bookclub/numMembers/${clubId}`)
            const newRequest = await request.json()
            setMembers(newRequest.Members)
        }
        fetchNumMembers()
    }, [dispatch, clubId])

    function checkUserStatus(){
        for(let i=0; i<members?.length; i++){
            if(members[i]?.user_id === user?.id && members[i]?.member_status === 'member'){
                return true
            }
        }
    }

    //handle functions are used for buttons
    const handleJoin = async (e) => {
        e.preventDefault()
        let newMember = {
            'user_id' : user.id,
            'bookclub_id' : clubId,
            'member_status' : 'member'
        }
        const response = await fetch(`/api/bookclub/${clubId}/join`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newMember)
        })
        window.location.reload()
    }

    const handleLeave = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/bookclub/${clubId}/leave`, {
            method: 'DELETE'
        })
        // console.log(response)
        if(response.ok){
            history.push('/findAClub')
            return
        }
    }

    const handleRemove = async (bookId) => {
        // e.preventDefault()
        const data = await dispatch(removeFromClubList(bookClub.id, bookId))
        window.location.reload()
        return
    }

    // component to render update button if user is the owner, user is a member, or user is not a member
    let updateComp;
    if(user?.id === bookClub?.ownerId){
        updateComp = (
                <NavLink className='deleteDiv' id='zIndex' to={`/findAClub/${clubId}/update`}>
                    Update Club
                </NavLink>
        )
    }
    if(checkUserStatus()){
        updateComp = (
            <button className='joinClubButton' onClick={handleLeave}>
                Leave Club
            </button>
        )
    }
    if(!checkUserStatus() && !(user?.id === bookClub?.ownerId)){
        updateComp = (
            <button className='joinClubButton' onClick={handleJoin}>
            Join Club
            </button>
        )
    }


    //seperate books from reading list into categories
    let completedBooks = []
    let readingBooks = []
    let planningBooks = []
    for(let i=0; i<books?.length; i++){

        if(books[i].status === 'completed'){
            completedBooks.push(books[i])
        }
        else if(books[i].status === 'reading'){
            readingBooks.push(books[i])
        } else if(books[i].status === 'planning'){
            planningBooks.push(books[i])
        }
    }

    //create components that will render each category
    let readingDisplay;
    if(readingBooks.length>=1){
        readingDisplay = (
            <div className='readingDisplay'>
                    <h4>{readingBooks[0]?.name}</h4>
                    <img className='readingCoverImage' alt='book cover' src={readingBooks[0]?.cover_image}
                    onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                    ></img>
                    {user?.id === bookClub?.ownerId && (
                        <button className='removeFromList' onClick={() => handleRemove(readingBooks[0]?.id)}>
                            Remove
                        </button>
                    )}
            </div>
        )
    } else {
        readingDisplay = (
            <div className='readingDisplay'>
                This club has not selected a book to read
            </div>
        )
    }
    let pastDisplay;
    if (completedBooks.length >= 1) {
        pastDisplay = (
            <div className='pastBooksWrapper' id='addBottomBorder'>
                {completedBooks?.map((book) => (
                    <div key={book?.id} className='pastBookCard'>
                        <h4>{book?.name}</h4>
                        {/* <h4>By: {book?.author}</h4> */}
                        <img className='readingCoverImage' src={book?.cover_image} alt='book cover'
                            onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                        ></img>
                        {user?.id === bookClub?.ownerId && (
                            <button className='removeFromList' onClick={() => handleRemove(book?.id)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        )
    } else {
        pastDisplay = (
            <div className='pastBooksWrapper' id='addBottomBorder'>
                This club has not completed any books
            </div>
        )
    }
    let planningDisplay;
    if(planningBooks.length>=1){
        planningDisplay = (
            <div className='pastBooksWrapper' >
                {planningBooks?.map((book) => (
                    <div key={book?.id} className='pastBookCard'>
                        <h3>{book?.name}</h3>
                        {/* <h4>By: {book?.author}</h4> */}
                        <img src={book?.cover_image} className='readingCoverImage' alt='book cover'
                        onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                        ></img>
                        {user?.id === bookClub?.ownerId && (
                            <button className='removeFromList' onClick={() => handleRemove(book?.id)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        )
    } else {
        planningDisplay = (
            <div className='pastBooksWrapper' >
                This club has not added any books to their planning list
            </div>
        )
    }



    return (
        <div className='ClubDetailsBody'>
            <div className='ClubDetailsHeader'>
                <div className='clubDetailImageWrapper'>
                    <div className='imageWrapper'>
                        <img className='detailsImage' alt='bookclub' src={bookClub?.clubImage}
                        onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                        >
                        </img>
                    </div>
                    <div className='name_numMembers'>
                        <h2>
                            {bookClub?.name}
                        </h2>
                        <p>
                            {members.length} members
                        </p>

                    </div>
                </div>
                <div className='clubDetailHeaderContent'>
                    {user && updateComp}
                </div>
            </div>
            <div className='clubInformation'>
                <div className='currentlyReadingWrapper'>
                    <div style={{borderBottom:'1px solid #E66752', fontSize:'18px'}}>
                        Currently Reading
                    </div>
                        {readingDisplay}
                </div>
                <div className='clubInformationContent'>
                    <h3>
                        About: {bookClub?.name}
                    </h3>
                    <p id='wordBreak'>
                        {bookClub?.description}
                    </p>
                </div>
            </div>
            <h3 className='pastBookTitle'>Books completed by {bookClub?.name}</h3>
            {pastDisplay}
            <h3 className='pastBookTitle'>{bookClub?.name} plans to read</h3>
            {planningDisplay}
        </div>
    )
}

export default ClubDetails
