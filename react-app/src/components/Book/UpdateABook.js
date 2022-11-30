import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { deleteABook, getOneBook, updateABook } from '../../store/books'
import './updateBookForm.css'

function UpdateABook(){
    const book = useSelector((state) => state.books.Book)
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState([])

    const [name, setName] = useState(book?.name)
    const [author, setAuthor] = useState(book?.author)
    const [description, setDescription] = useState(book?.description)
    const [page_number, setPage_Number] = useState(book?.page_number)
    const [cover_image, setCover_Image] = useState(book?.cover_image)
    const [genre, setGenre] = useState(book?.genre)

    const {bookId} = useParams()
    console.log('id', bookId)
    console.log('should be the book', book)
    useEffect(() => {
        dispatch(getOneBook(bookId))
    }, [dispatch, bookId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        let newBook = {
            'name': name,
            'author': author,
            'description': description,
            'page_number': page_number,
            'cover_image': cover_image,
            'genre': genre
        }

        const data = await dispatch(updateABook(newBook, bookId))
        if(data.length){
            setErrors(data)
            return
        }
        return history.push(`/findABook/${bookId}`)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        // console.log(bookId)
        dispatch(deleteABook(bookId))
        history.push('/findABook')
    }

    return (
        <form className='updateBookForm' onSubmit={handleSubmit}>
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
                        <input
                        className='inputField'
                        placeholder='Author name'
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <textarea
                        className='textareaField'
                        placeholder='Book summary'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                            Update this book
                        </button>
                    </div>
                    <div onClick={handleDelete}>
                        <button>
                            Delete book
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default UpdateABook
