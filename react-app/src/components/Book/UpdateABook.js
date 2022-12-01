import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { deleteABook, getOneBook, updateABook, getAllBooks } from '../../store/books'
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
    // console.log('id', bookId)
    // console.log('should be the book', book)
    useEffect(() => {
        dispatch(getOneBook(bookId))
    }, [dispatch, bookId])

    const imageCheck = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

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

            const data = await dispatch(updateABook(newBook, bookId)).then(() => dispatch(getOneBook(bookId)))
            if(data.length){
                setErrors(data)
                return
            }
            return history.push(`/findABook/${bookId}`)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        // console.log(bookId)
        dispatch(deleteABook(bookId)).then(() => dispatch(getAllBooks()))
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
                        minLength={2}
                        maxLength={25}
                        >
                        </input>
                    </div>
                    <div>
                        <input
                        className='inputField'
                        placeholder='Author name'
                        required
                        value={author}
                        minLength={2}
                        maxLength={25}
                        onChange={(e) => setAuthor(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <textarea
                        className='inputField'
                        placeholder='Book summary'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        minLength={5}
                        maxLength={500}
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
                        min={1}
                        max={1000}
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
                    <div id='extraMarginTop'>
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
                    <div className='buttonHolder' id='extraMarginTop'>
                        <div>
                            <button type='submit' className='submitButton'>
                                Update this book
                            </button>
                        </div>
                        <div onClick={handleDelete}>
                            <button className='submitButton'>
                                Delete this book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default UpdateABook
