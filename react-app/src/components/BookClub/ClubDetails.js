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
    console.log('testing bookclub state', bookClub)
    const {clubId} = useParams()
    console.log('should be id in url', clubId)

    useEffect(() => {
        dispatch(getOneClub(clubId))
    }, [dispatch])


    const [numMembers, setNumMembers] = useState(1)
    useEffect(() => {

        async function fetchNumMembers(){
            // console.log('are we in the function')
            const request = await fetch(`/api/bookclub/numMembers/${clubId}`)
            const newRequest = await request.json()
            // console.log('what do I get from the new fetch', newRequest.Members)
            setNumMembers(newRequest.Members)
        }
        fetchNumMembers()
    }, [])

    // bookClub.numMembers = numMembers
    console.log('this should be the number of members', bookClub)
    return (
        <div className='ClubDetailsBody'>
            <div className='ClubDetailsHeader'>
                <div className='clubDetailImageWrapper'>
                    <img src={bookClub?.clubImage}>
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
                    <button>
                        Join Club
                    </button>
                </div>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}

export default ClubDetails
