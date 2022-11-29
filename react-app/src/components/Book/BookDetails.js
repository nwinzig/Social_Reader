import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams, NavLink } from 'react-router-dom'
import { getOneBook } from '../../store/books'

function BookDetails(){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const book = useSelector((state) => state.books.Book)
    const {bookId} = useParams()

    console.log(book)

    useEffect(() => {
        dispatch(getOneBook(bookId))
    }, [dispatch,bookId])


    return (
        <div>
            Test
        </div>
    )
}
export default BookDetails
