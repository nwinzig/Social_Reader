import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import { getAllBooks } from '../../store/books'
import './findABook.css'

function FindABook(){
    const history = useHistory()
    const dispatch = useDispatch()
    const session = useSelector((state) => state.session.user)
    const books = useSelector((state) => state.books.Books)
    // console.log('what are books', books)

    useEffect(() => {
        dispatch(getAllBooks())
    }, [dispatch])

    let createYourOwn;
    if(session){
        createYourOwn = (
            <div>
                <button onClick={() => history.push('/findABook/newBook')} className='createAClubButton'>
                    <h2>
                        add a book
                    </h2>
                </button>
            </div>
        )
    }
    return (
        <div className='findAClubBody'>
            <div className='findAClubWrapper'>
                <div className='findBackgroundImageWrapper'>
                    <div className='findClubImage'>

                    </div>
                    <div className='findClubContent'>
                        <h2 className='findClubContentH'>
                            Find a book
                        </h2>
                        <p className='findClubContentP'>
                            Take a look at our library to find your next read. If you can't find what you're looking for consider submitting an addition to the library.
                        </p>
                    </div>
                </div>
                <div className='findSearchWrapper'>

                </div>
            </div>
            <div className='browseOrCreateWrapper'>
            <h2 className='browseClubsTitle'>
                Browse our library {session && 'or'}
            </h2>
                {createYourOwn}
            </div>
            <div className='clubResultsWrapper'>
                {books?.map(book =>(
                        <div className='clubCardWrapper' key={book?.id}>
                            <div>
                                <img className='bookImage' alt='bookclub' src={book?.cover_image}
                                onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                                ></img>
                            </div>
                            <h3 id='wordBreak' className='maxWidth'>
                                {book?.name}
                            </h3>
                            {/* <h4 id='wordBreak'>
                                By: {book?.author}
                            </h4> */}
                            <NavLink to={`/findABook/${book?.id}`} className='viewClubButton' onClick={() => window.scrollTo(0, 0)}>
                                Book details
                            </NavLink>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default FindABook
