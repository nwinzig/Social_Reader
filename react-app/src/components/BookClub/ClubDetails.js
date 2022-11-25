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
    console.log('do we get planning list', planningBooks)
    console.log('do we get reading list', readingBooks)
    return (
        <div className='ClubDetailsBody'>
            <div className='ClubDetailsHeader'>
                <div className='clubDetailImageWrapper'>
                    <img className='detailsImage' src={bookClub?.clubImage}>
                    </img>
                </div>
                <div className='clubDetailHeaderContent'>
                    <div>
                        <h2>
                            {bookClub?.name}
                        </h2>
                        <p>
                            Current Members: {numMembers}
                        </p>
                    </div>
                    <button className='joinClubButton'>
                        Join Club
                    </button>
                </div>
            </div>
            <div className='clubInformation'>
                <div className='currentlyReadingWrapper'>
                    <div>
                        Currently Reading
                    </div>
                    <div>

                    </div>
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
            <div>

            </div>
        </div>
    )
}

export default ClubDetails
