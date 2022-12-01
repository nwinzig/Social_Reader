import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { deleteAClub, editAClub, getAllClubs, getOneClub } from '../../store/bookclub'

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

    const imageCheck = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        if(clubImage && !clubImage.split('?')[0].match(imageCheck)){

            setErrors(['Image must be valid: jpg, jpeg, png, webp, avif, gif, svg. Try again or a default image will be given'])

        } else {

            let updatedClub = {
                'name': name,
                'description': description,
                'clubImage': clubImage,
                'private': restricted
            }

            await dispatch(editAClub(updatedClub, clubId)).then(() => dispatch(getOneClub(clubId)))

            history.push(`/findAClub/${clubId}`)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log('in handle delete', clubId)
        await dispatch(deleteAClub(clubId)).then(() => dispatch(getAllClubs()))
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
                        id='textAreaSize'
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
                        placeholder='Club image(optional)'
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
                    <div className='buttonHolder'>
                        <div>
                            <button type='submit' className='submitButton'>
                                Update this club
                            </button>
                        </div>
                        <div>
                            <button onClick={handleDelete} className='submitButton'>
                                Delete this club
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default UpdateAClub
