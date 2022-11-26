import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import './ClubDetails.css'
import { getOneClub } from '../../store/bookclub'

function ClubDetails(){
    const history = useHistory()
    const dispatch = useDispatch()
    const session = useSelector((state) => state.session.user)
    const bookClub = useSelector((state) => state.bookclubs.BookClub)

    const {clubId} = useParams()


    useEffect(() => {
        dispatch(getOneClub(clubId))
    }, [dispatch])


    const [numMembers, setNumMembers] = useState(1)
    const [books, setBooks] = useState([])
    useEffect(() => {

        async function fetchNumMembers(){
            // console.log('are we in the function')
            const request = await fetch(`/api/bookclub/numMembers/${clubId}`)
            const newRequest = await request.json()
            // console.log('what do I get from the new fetch', newRequest.Members)
            setNumMembers(newRequest.Members)
        }
        async function fetchClubBooks(){
            const request = await fetch(`/api/bookclub/${clubId}/books`)
            const newRequest = await request.json()

            setBooks(newRequest.books)
        }
        fetchClubBooks()
        fetchNumMembers()
    }, [dispatch])

    console.log('testing books', books)
    let completedBooks = []
    let readingBooks = []
    let planningBooks = []
    for(let i=0; i<books.length; i++){

        if(books[i].status == 'completed'){
            completedBooks.push(books[i])
        }
        else if(books[i].status == 'reading'){
            readingBooks.push(books[i])
        } else if(books[i].status == 'planning'){
            planningBooks.push(books[i])
        }
    }
    console.log('do we get completed books list', completedBooks)
    // console.log(completedBooks.length)
    console.log('do we get planning list', planningBooks)
    console.log('do we get reading list', readingBooks)
    // let pastbooks = completedBooks.map(book => book)
    // console.log('what is past books', pastbooks)
    let readingDisplay;
    if(readingBooks.length>=1){
        readingDisplay = (
            <div className='readingDisplay'>
                    <h3>{readingBooks[0]?.name}</h3>
                    <img className='readingCoverImage' src={readingBooks[0]?.cover_image}></img>
            </div>
        )
    } else {
        readingDisplay = (
            <div className='readingDisplay'>
                This club has not started a book
            </div>
        )
    }
    let pastDisplay;
    if(completedBooks.length>=1){
        console.log('this was a truthy value')
        pastDisplay = (
            <div className='pastBooksWrapper'>
                {completedBooks?.map((book) => (
                    <div key={book?.id}>
                        <h3>{book?.name}</h3>
                        <h4>By: {book?.author}</h4>
                        <img className='readingCoverImage' src={book?.cover_image}></img>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div className='ClubDetailsBody'>
            <div className='ClubDetailsHeader'>
                <div className='clubDetailImageWrapper'>
                    <div className='imageWrapper'>
                        <img className='detailsImage' src={bookClub?.clubImage}>
                        </img>
                    </div>
                    <div className='name_numMembers'>
                        <h2>
                            {bookClub?.name}
                        </h2>
                        <p>
                            {numMembers} members
                        </p>
                    </div>
                </div>
                <div className='clubDetailHeaderContent'>
                    <button className='joinClubButton'>
                        Join Club
                    </button>
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
            <h3>Books completed by {bookClub?.name}</h3>
            {pastDisplay}
        </div>
    )
}

export default ClubDetails
