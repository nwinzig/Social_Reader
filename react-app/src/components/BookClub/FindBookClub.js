import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, NavLink } from 'react-router-dom'
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
    // console.log(session)
    let createYourOwn;
    if(session){
        createYourOwn = (
            <div>
                <button onClick={() => history.push('/findAClub/newClub')} className='createAClubButton'>
                    <h2>
                        Create your own
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
                            Find your community.
                        </h2>
                        <p className='findClubContentP'>
                            Do you have a book your enjoying? Maybe your looking for something new? Do you want to find a group of people to share your experiences with? If you answered any of these questions with yes, then you've came to the right place! Check out existing communities or create one of your own!
                        </p>
                    </div>
                </div>
                <div className='findSearchWrapper'>

                </div>
            </div>
            <div className='browseOrCreateWrapper'>
            <h2 className='browseClubsTitle'>
                Browse current clubs {session && 'or'}
            </h2>
            {createYourOwn}
            </div>
            <div className='clubResultsWrapper'>
                {bookClubs?.map(club =>(
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
                        <NavLink to={`/findAClub/${club?.id}`} className='viewClubButton' onClick={() => window.scrollTo(0, 0)}>
                            View Club
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FindAClub
