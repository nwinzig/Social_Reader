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

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newBook = {
            'name': name,
            'author': author,
            'description': description,
            'page_number': page_number,
            'cover_image': cover_image,
            'genre': genre
        }
        if(!newBook['cover_image']){
            newBook['cover_image'] = 'https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png'
        }
        console.log('newBook', newBook)
        const data = await dispatch(createABook(newBook))
        console.log('data after submit', data)
        if(data.length){
            setErrors(data)
            return
        }
        return history.push(`/findABook/${data['Book']['id']}`)
    }

    return (
        <form className='createBookForm' onSubmit={handleSubmit}>
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
                        >
                        </textarea>
                    </div>
                    <div>
                        <input
                        className='inputField'
                        placeholder='Book summary'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                    <input
                        className='inputField'
                        placeholder='Number of pages'
                        value={page_number}
                        type='number'
                        onChange={(e) => setPage_Number(e.target.value)}
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
                        <label>
                            Genre:
                        </label>
                        <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        >
                            <option value=''>Please select one</option>
                            <option value='Fiction'>Fiction</option>
                            <option value='Nonfiction'>Nonfiction</option>
                            <option value='Drama'>Drama</option>
                            <option value='Poetry'>Poetry</option>
                            <option value='Folktale'>Folktale</option>
                        </select>
                    </div>
                    <div>
                        <button type='submit'>
                            Add this book
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default CreateABook
