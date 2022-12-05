import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import {createABook} from '../../store/books'

function CreateABook(){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [page_number, setPage_Number] = useState('')
    const [cover_image, setCover_Image] = useState('')
    const [genre, setGenre] = useState('')

    const imageCheck = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(cover_image && !cover_image.split('?')[0].match(imageCheck)){

            setErrors(['Image must be valid: jpg, jpeg, png, webp, avif, gif, svg. Try again or a default image will be given'])

        } else {

            let newBook = {
                'name': name,
                'author': author,
                'description': description,
                'page_number': page_number,
                'cover_image': cover_image,
                'genre': genre
            }
            // console.log('newBook', newBook)
            const data = await dispatch(createABook(newBook))
            // console.log('data after submit', data)
            if(data.length){
                setErrors(data)
                return
            }
            return history.push(`/findABook/${data['Book']['id']}`)
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
                        Tell us about the book
                    </h2>
                    <div>
                        { errors.map((error, ind) => (
                            <div key={ind} id='red'>{error}</div>
                        ))}
                    </div>
                    <div>
                        <input
                        className='inputField'
                        placeholder='Book title '
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        minLength={2}
                        maxLength={25}
                        >
                        </input>
                    </div>
                    <div>
                        <textarea
                        className='inputField'
                        placeholder='Author name'
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        minLength={2}
                        maxLength={25}
                        >
                        </textarea>
                    </div>
                    <div>
                        <textarea
                        className='inputField'
                        placeholder='Book summary'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        minLength={5}
                        maxLength={1500}
                        id='textAreaSize'
                        >
                        </textarea>
                    </div>
                    <div>
                    <input
                        className='inputField'
                        placeholder='Number of pages'
                        value={page_number}
                        type='number'
                        onChange={(e) => setPage_Number(e.target.value)}
                        required
                        min={1}
                        max={10000}
                        >
                        </input>
                    </div>
                    <div>
                    <input
                        className='inputField'
                        placeholder='Book Cover Image(optional)'
                        value={cover_image}
                        onChange={(e) => setCover_Image(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className='inputField'
                        id='hover'
                        >
                            <option value=''>Please select a genre</option>
                            <option value='Fiction'>Fiction</option>
                            <option value='Nonfiction'>Nonfiction</option>
                            <option value='Drama'>Drama</option>
                            <option value='Poetry'>Poetry</option>
                            <option value='Folktale'>Folktale</option>
                        </select>
                    </div>
                    <div>
                        <button type='submit' className='submitButton'>
                            Add this book
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default CreateABook
