import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './createAclub.css'
import {createNewClub} from '../../store/bookclub'

function CreateABookClub(){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [clubImage, setClubImage] = useState('')
    const [restricted, setRestricted] = useState(false)
    //restricted is used to replace private

    const imageCheck = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(clubImage && !clubImage.split('?')[0].match(imageCheck)){
            setErrors(['Image must be valid: jpg, jpeg, png, webp, avif, gif, svg. Try again or a default image will be given'])
        } else {

            let newClub = {
                'name': name,
                'description': description,
                'clubImage': clubImage,
                'private': restricted
            }

            const data = await dispatch(createNewClub(newClub))

            if(data.length){
                setErrors(data)
                return
            }
            return history.push(`/findAClub/${data['BookClub']['id']}`)
        }
    }


    return (
        <form className='createClubForm' onSubmit={handleSubmit}>
            <div className='createClubImageWrapper'>
                <img alt='create a club' src='https://res.cloudinary.com/dydhvazpw/image/upload/v1669650776/capstone/CTA_JBC2x_hx3z2c.webp'>
                </img>
            </div>
            <div className='formInfoWrapper'>
                <div>
                    <h2>
                        Tell us about the club you'll be hosting
                    </h2>
                    <div>
                        { errors.map((error, ind) => (
                            <div key={ind} id='red'>{error}</div>
                        ))}
                    </div>
                    <div>
                        <input
                        className='inputField'
                        placeholder='Club name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        minLength={3}
                        maxLength={25}
                        >
                        </input>
                    </div>
                    <div>
                        <textarea
                        className='inputField'
                        placeholder='A short description'
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        minLength={5}
                        maxLength={200}
                        >
                        </textarea>
                    </div>
                    <div>
                        <input
                        className='inputField'
                        placeholder='Club Image url(optional)'
                        value={clubImage}
                        onChange={(e) => setClubImage(e.target.value)}
                        >
                        </input>
                    </div>
                    {/* <div>
                        <label>
                            Public
                        </label>
                        <input
                        type='radio'
                        name='private'
                        value={false}
                        onChange={(e) => setRestricted(false)}
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
                        onChange={(e) => setRestricted(true)}
                        >
                        </input>
                    </div> */}
                    <div>
                        <button type='submit'>
                            Host your club
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateABookClub
