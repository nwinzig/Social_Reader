import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams, NavLink } from 'react-router-dom'
import { getOneBook } from '../../store/books'
import './bookDetails.css'

function BookDetails(){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const book = useSelector((state) => state.books.Book)
    const {bookId} = useParams()

    console.log(book)

    useEffect(() => {
        dispatch(getOneBook(bookId))
    }, [dispatch,bookId])

    const [clubs, setClubs] = useState([])
    useEffect(() => {
        async function fetchAssociatedClubs(){
            const request = await fetch(`/api/book/${bookId}/clubs`)
            const newRequest = await request.json()

            setClubs(newRequest.clubs)
        }
        fetchAssociatedClubs()
    }, [dispatch, bookId])


    let updateComp;
    if(user?.id === book?.added_by){
        updateComp = (
                <NavLink className='deleteDiv' to={`/findABook/${bookId}/update`}>
                    Update Book
                </NavLink>
        )
    }
    // else {
    //     updateComp = (
    //         <button className='joinClubButton'>
    //             Add book to your shelf
    //         </button>
    //     )
    // }



    return (
        <div className='bookDetailWrapper'>
            <div className='bookDetailHeader'>
                <img src={book?.cover_image}>
                </img>
                <div className='bookDetails'>
                    <h1>
                        {book?.name}
                    </h1>
                    <h3>
                        Written by: {book?.author}
                    </h3>
                    <div>
                        {book?.description}
                    </div>
                    {updateComp}
                </div>
            </div>
                <h3 className='otherClubTitle'>
                    Join a club reading {book?.name}
                </h3>
            <div className='otherClubsWrapper'>
                {clubs?.map(club => (
                    <div className='clubCardWrapper' key={club?.id}>
                    <div>
                        <img className='clubImage' alt='bookclub' src={club?.clubImage}></img>
                    </div>
                    <h3>
                        {club?.name}
                    </h3>
                    {/* <div>
                        {club?.description}
                    </div> */}
                    <button className='viewClubButton' onClick={() => history.push(`/findAClub/${club?.id}`)}>
                        View Club
                    </button>
                </div>
                ))}
            </div>
        </div>
    )
}
export default BookDetails
