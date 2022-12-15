
const ADD_BOOK_TO_LIST = '/readingList/add'
const REMOVE_BOOK_FROM_LIST = '/readingList/remove'
const GET_BOOKS_LIST = '/readingList/get'
const UPDATE_BOOK_STATUS = '/readingList/update'

const getBooks = (data) => {
    return {
        'type': GET_BOOKS_LIST,
        data
    }
}

const addBook = (data) => {
    return {
        'type': ADD_BOOK_TO_LIST,
        data
    }
}

const updateBook = (data) => {
    return {
        'type': UPDATE_BOOK_STATUS,
        data
    }
}

const removeBook = (data) => {
    return {
        'type': REMOVE_BOOK_FROM_LIST,
        data
    }
}

export const getUserBooksList = () => async dispatch => {
    const response = await fetch('/api/readingList/get')

    if(response.ok){
        const books = await response.json()
        dispatch(getBooks(books))
        return books
    } return
}

export const addBookToList = (bookToAdd) => async dispatch => {
    const response = await fetch('/api/readingList/add', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(bookToAdd)
    })

    if(response.ok){
        const book = await response.json()
        dispatch(addBook(book))
        return book
    } else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            // console.log(data.errors)
            return data.errors
        }
    }
}

export const updateBookInList = (bookId,bookToUpdate) => async dispatch => {
    const response = await fetch(`/api/readingList/update/status/${bookId}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(bookToUpdate)
    })
    if(response.ok){
        const updatedBook = await response.json()
        dispatch(updateBook(updatedBook))
        return updatedBook
    }
}

export const removeFromList = (bookId) => async dispatch => {
    const response = await fetch(`/api/readingList/remove/${bookId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(removeBook(bookId))
        return
    }
    return
}


let initialState = {}
const readingListReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case ADD_BOOK_TO_LIST:{
            newState = {...action.data}
        }
        case GET_BOOKS_LIST: {
            newState = {...state,...action.data}
            return newState
        }
        case UPDATE_BOOK_STATUS: {
            newState = {...state, ...action.data}
            return newState
        }
        default:
            return state
    }
}
export default readingListReducer
