import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './splash.css'
import { getAllClubs } from '../../store/bookclub'



function SplashPage(){
    const history = useHistory()
    const dispatch = useDispatch()
    const session = useSelector((state) => state.session.user)
    const bookClubs = useSelector((state) => state.bookclubs.BookClubs)
    console.log(bookClubs)

    useEffect(() => {
        dispatch(getAllClubs())
    }, [dispatch])

    let getStartedButton


    const directToSignUp = function (){
        history.push('/sign-up')
    }

    if(session){
        getStartedButton = (
            <div>
                <h2 className='quoteContent'>
                    "So many books, so little time."
                </h2>
                <h2 className='quoteAuthor'>
                    - Frank Zappa
                </h2>
            </div>
        )
    } else {
        getStartedButton = (
            <div className='getStartedContentWrapper'>
                <h3>
                    Get Started Today
                </h3>
                <button className='splashSignUpButton' onClick={directToSignUp}>
                    Sign up now
                </button>
            </div>
        )
    }
    return (
        <div className='splashWrapper'>
            <div className='introWrapper'>
                <div className='contentWrapper'>
                    <img className='splashImage' src='https://res.cloudinary.com/dydhvazpw/image/upload/v1669240945/capstone/images_wtngcc.jpg' alt='book club clipart'>
                    </img>
                    <div>
                        <p className='splashIntrotext'>
                            Join or create a book club to read with old and new friends.
                        </p>
                    </div>
                </div>
                <div className='contentWrapper'>
                    <img className='splashImage' src='https://res.cloudinary.com/dydhvazpw/image/upload/v1669240832/capstone/istockphoto-965384578-612x612_njvsuy.jpg' alt='book clipart'>
                    </img>
                    <div>
                        <p className='splashIntrotext'>
                            Find a book, or add something new to share.
                        </p>
                    </div>
                </div>
                <div className='contentWrapper'>
                    <img className='splashImage' src='https://res.cloudinary.com/dydhvazpw/image/upload/v1669242442/capstone/istockphoto-1158861397-612x612_rhgnue.jpg' alt='reading clipart'>
                    </img>
                    <div>
                        <p className='splashIntrotext'>
                            Never lose track of what your reading and plan your next book.
                        </p>
                    </div>
                </div>
            </div>
            <div className='getStartedWrapper'>
                <div className='getStartedImage'>

                </div>
                <div className='getStartedContent'>
                    <h2 className='quoteContent'>
                        "A book is a dream that you hold in your hand."
                    </h2>
                    <h2 className='quoteAuthor'>
                        - Neil Gaiman
                    </h2>
                    {getStartedButton}
                </div>
            </div>
        </div>
    )
}

export default SplashPage
