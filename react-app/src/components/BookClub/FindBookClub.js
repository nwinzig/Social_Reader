import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './findAClub.css'
import { getAllClubs } from '../../store/bookclub'

function FindAClub(){
    const history = useHistory()
    const dispatch = useDispatch()
    const session = useSelector((state) => state.session.user)
    const bookClubs = useSelector((state) => state.bookclubs.BookClubs)

    useEffect(() => {
        dispatch(getAllClubs())
    }, [dispatch])

    // console.log('all bookclubs', bookClubs[0])
    return (
        <div className='findAClubBody'>
            <div className='findAClubWrapper'>
                <div className='findBackgroundImageWrapper'>
                    <div className='findClubImage'>

                    </div>
                    <div className='findClubContent'>
                        <h2 className='findClubContentH'>
                            Find your community.
                        </h2>
                        <p className='findClubContentP'>
                            Do you have a book your enjoyingor are looking for something new? Do you want to find a group of people to share your experiences with? If you answered any of these questions with yes, then you've came to the right place! Check out existing communities or create one of your own!
                        </p>
                    </div>
                </div>
                <div className='findSearchWrapper'>

                </div>
            </div>
            <h2 className='browseClubsTitle'>
                Browse current clubs
            </h2>
            <div className='clubResultsWrapper'>
                {bookClubs?.map(club =>(
                    <div className='clubCardWrapper' key={club?.id}>
                        <div>
                            <img className='clubImage' src={club?.clubImage}></img>
                        </div>
                        <h3>
                            {club?.name}
                        </h3>
                        {/* <div>
                            {club?.description}
                        </div> */}
                        <button className='viewClubButton'>
                            View Club
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FindAClub
