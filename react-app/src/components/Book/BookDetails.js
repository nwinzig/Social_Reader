import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams, NavLink } from 'react-router-dom'
import { getOneBook } from '../../store/books'
import './bookDetails.css'
import UserBookshelfModal from '../Modal/BookshelfModal'

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
                <NavLink className='deleteDiv' id='zIndex' to={`/findABook/${bookId}/update`}>
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

    const [dropdown, setDropdown] = useState(false)

    return (
        <div className='bookDetailWrapper'>
            <div className='bookDetailHeader'>
                <div>
                    <img src={book?.cover_image}
                    onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                    >
                    </img>
                    <div className='updateCompContainer'>
                        {updateComp}
                    </div>
                    <div className='dropdownButtonContainer'>
                        <button className='dropdownButton' onClick={() => {setDropdown(!dropdown)}}>
                            Add book to a bookshelf
                        </button>
                        {dropdown && (
                        <div className='selectListDropdown'>
                            <ul>
                                <UserBookshelfModal book={book} user={user}/>
                                <li>Your Bookclub</li>
                            </ul>
                        </div>
                        )}
                    </div>
                </div>
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
                </div>
            </div>
                <h3 className='otherClubTitle'>
                    Join a club reading {book?.name}
                </h3>
            <div className='otherClubsWrapper'>
                {clubs?.map(club => (
                    <div className='clubCardWrapper' key={club?.id}>
                    <div>
                        <img className='clubImage' alt='bookclub' src={club?.clubImage}
                        onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                        ></img>
                    </div>
                    <h3>
                        {club?.name}
                    </h3>
                    {/* <div>
                        {club?.description}
                    </div> */}
                    <NavLink to={`/findAClub/${club?.id}`}className='viewClubButton' onClick={() => window.scrollTo(0,0)}>
                        View Club
                    </NavLink>
                </div>
                ))}
            </div>
        </div>
    )
}
export default BookDetails
