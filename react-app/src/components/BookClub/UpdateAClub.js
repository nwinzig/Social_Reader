import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { deleteAClub, editAClub, getOneClub } from '../../store/bookclub'

function UpdateAClub(){
    const bookClub = useSelector((state) => state.bookclubs.BookClub)
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState(bookClub?.name)
    const [description, setDescription] = useState(bookClub?.description)
    const [clubImage, setClubImage] = useState(bookClub?.clubImage)
    const [restricted, setRestricted] = useState(bookClub?.private)

    const {clubId} = useParams()

    useEffect(() => {
        dispatch(getOneClub(clubId))
    }, [dispatch, clubId])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        let updatedClub = {
            'name': name,
            'description': description,
            'clubImage': clubImage,
            'private': restricted
        }
        console.log(updatedClub)
        // console.log('what im sending through dispatch', updatedClub, clubId)
        dispatch(editAClub(updatedClub, clubId))
        // console.log('do we get here', clubId)
        history.push(`/findAClub/${clubId}`)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        console.log('in handle delete', clubId)
        dispatch(deleteAClub(clubId))
        history.push('/findAClub')
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
                        Update your club
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
                        >
                        </textarea>
                    </div>
                    <div>
                        <input
                        className='inputField'
                        placeholder='Club image(optional)'
                        value={clubImage}
                        onChange={(e) => setClubImage(e.target.value)}
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
                    </div>
                    <div>
                        <button type='submit'>
                            Update this club
                        </button>
                    </div>
                    <div>
                        <button onClick={handleDelete}>
                            Delete your club
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default UpdateAClub
