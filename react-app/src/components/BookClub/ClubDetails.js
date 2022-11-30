import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams, NavLink } from 'react-router-dom'
import './ClubDetails.css'
import { getOneClub } from '../../store/bookclub'

function ClubDetails(){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const bookClub = useSelector((state) => state.bookclubs.BookClub)

    const {clubId} = useParams()
    // console.log('this is the user', user)
    // console.log('this is the club', bookClub)
    useEffect(() => {
        dispatch(getOneClub(clubId))
    }, [dispatch, clubId])


    const [members, setMembers] = useState([])
    const [books, setBooks] = useState([])
    useEffect(() => {

        async function fetchNumMembers(){
            // console.log('are we in the function')
            const request = await fetch(`/api/bookclub/numMembers/${clubId}`)
            const newRequest = await request.json()
            // console.log('what do I get from the new fetch', newRequest)
            setMembers(newRequest.Members)
        }
        async function fetchClubBooks(){
            const request = await fetch(`/api/bookclub/${clubId}/books`)
            const newRequest = await request.json()

            setBooks(newRequest.books)
        }
        fetchClubBooks()
        fetchNumMembers()
    }, [dispatch, clubId])

    function checkUserStatus(){

        for(let i=0; i<members?.length; i++){

            if(members[i]?.user_id === user?.id && members[i]?.member_status === 'member'){
                return true
                // console.log(members[i], 'is already a member')
            }
        }

    }



    const handleJoin = async (e) => {
        // console.log('trying to join')
        e.preventDefault()
        let newMember = {
            'user_id' : user.id,
            'bookclub_id' : clubId,
            'member_status' : 'member'
        }
        // console.log('new member on click', newMember)
        const response = await fetch(`/api/bookclub/${clubId}/join`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newMember)
        })
        // console.log(response)
        window.location.reload()
    }

    // console.log('these are the members', members)
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
    // console.log('this is the club', bookClub)
    // console.log(checkUserStatus())
    let updateComp;
    if(user?.id === bookClub?.ownerId){
        updateComp = (
                <NavLink className='deleteDiv' to={`/findAClub/${clubId}/update`}>
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


    let completedBooks = []
    let readingBooks = []
    let planningBooks = []
    for(let i=0; i<books.length; i++){

        if(books[i].status === 'completed'){
            completedBooks.push(books[i])
        }
        else if(books[i].status === 'reading'){
            readingBooks.push(books[i])
        } else if(books[i].status === 'planning'){
            planningBooks.push(books[i])
        }
    }

    let readingDisplay;
    if(readingBooks.length>=1){
        readingDisplay = (
            <div className='readingDisplay'>
                    <h3>{readingBooks[0]?.name}</h3>
                    <img className='readingCoverImage' alt='book cover' src={readingBooks[0]?.cover_image}></img>
            </div>
        )
    } else {
        readingDisplay = (
            <div className='readingDisplay'>
                {bookClub?.name} has not selected a book to read.
            </div>
        )
    }
    let pastDisplay;
    if(completedBooks.length>=1){
        pastDisplay = (
            <div className='pastBooksWrapper' id='addBottomBorder'>
                {completedBooks?.map((book) => (
                    <div key={book?.id} className='pastBookCard'>
                        <h3>{book?.name}</h3>
                        <h4>By: {book?.author}</h4>
                        <img className='readingCoverImage' src={book?.cover_image} alt='book cover'></img>
                    </div>
                ))}
            </div>
        )
    } else {
        pastDisplay = (
            <div className='pastBooksWrapper' id='addBottomBorder'>
                {bookClub?.name} has not completed any books.
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
                        <h4>By: {book?.author}</h4>
                        <img src={book?.cover_image} className='readingCoverImage' alt='book cover'></img>
                    </div>
                ))}
            </div>
        )
    } else {
        planningDisplay = (
            <div className='pastBooksWrapper' >
                {bookClub?.name} has not added any books to their planning list.
            </div>
        )
    }
    return (
        <div className='ClubDetailsBody'>
            <div className='ClubDetailsHeader'>
                <div className='clubDetailImageWrapper'>
                    <div className='imageWrapper'>
                        <img className='detailsImage' alt='bookclub' src={bookClub?.clubImage}>
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
                    {updateComp}
                </div>
            </div>
            <div className='clubInformation'>
                <div className='currentlyReadingWrapper'>
                    <div style={{borderBottom:'1px solid #E66752'}}>
                        Currently Reading
                    </div>
                        {readingDisplay}
                </div>
                <div className='clubInformationContent'>
                    <h3>
                        About: {bookClub?.name}
                    </h3>
                    <p>
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
