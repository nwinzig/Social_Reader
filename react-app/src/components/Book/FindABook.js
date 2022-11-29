import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { getAllBooks } from '../../store/books'
import './findABook.css'

function FindABook(){
    const history = useHistory()
    const dispatch = useDispatch()
    const session = useSelector((state) => state.session.user)
    const books = useSelector((state) => state.books.Books)
    console.log('what are books', books)

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
                                <img className='clubImage' alt='bookclub' src={book?.cover_image}></img>
                            </div>
                            <h3>
                                {book?.name}
                            </h3>
                            <h4>
                                By: {book?.author}
                            </h4>
                            <button className='viewClubButton' onClick={() => history.push(`/findABook/${book?.id}`)}>
                                Book details
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default FindABook
