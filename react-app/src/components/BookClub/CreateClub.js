import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './createAclub.css'

function CreateABookClub(){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState([])


    return (
        <form className='createClubForm'>
            <div className='createClubImageWrapper'>
                <img alt='create a club' src='https://res.cloudinary.com/dydhvazpw/image/upload/v1669650776/capstone/CTA_JBC2x_hx3z2c.webp'>
                </img>
            </div>
            <div className='formInfoWrapper'>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind} id='red'>{error}</div>
                    ))}
                </div>
                <div>
                    <h2>
                        Tell us about the club you'll be hosting
                    </h2>
                    <div>
                        <input
                        className='inputField'
                        placeholder='Club name'
                        >
                        </input>
                    </div>
                    <div>
                        <textarea
                        className='inputField'
                        placeholder='A short description'
                        >
                        </textarea>
                    </div>
                    <div>
                        <input
                        className='inputField'
                        placeholder='Club image(optional)'
                        >
                        </input>
                    </div>
                    <div>
                        <label>
                            Public
                        </label>
                        <input
                        type='radio'
                        name='private'
                        value={false}
                        >
                        </input>
                    </div>
                    <div>
                        <label>
                            Private
                        </label>
                        <input
                        type='radio'
                        name='private'
                        value={true}
                        >
                        </input>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateABookClub
