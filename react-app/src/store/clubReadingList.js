const ADD_BOOK_TO_CLUB_LIST = '/readingList/bookclub/add'
const REMOVE_BOOK_FROM_CLUB_LIST = '/readingList/bookclub/remove'
const GET_CLUB_BOOKS_LIST = 'readingList/bookclub/get'
const UPDATE_CLUB_BOOK_STATUS = 'readingList/bookclub/update'

const getBooks = (data) => {
    return {
        'type': GET_CLUB_BOOKS_LIST,
        data
    }
}

const addBook = (data) => {
    return {
        'type': ADD_BOOK_TO_CLUB_LIST,
        data
    }
}

const updateBook = (data) => {
    return {
        'type': UPDATE_CLUB_BOOK_STATUS,
        data
    }
}

const removeBook = (data) => {
    return {
        'type': REMOVE_BOOK_FROM_CLUB_LIST,
        data
    }
}

export const getClubBooksList = (id) => async dispatch => {
    const response = await fetch(`/api/bookclub/${id}/books`)

    if(response.ok){
        const books = await response.json()
        dispatch(getBooks(books))
        return books
    } return
}

export const addBookToClubList = (clubId, bookToAdd) => async dispatch => {
    const response = await fetch(`/api/readingList/bookclub/${clubId}/add`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(bookToAdd)
    })

    if(response.ok){
        const book = await response.json()
            dispatch(addBookToClubList(book))
            return book
    } else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            return data.errors
        }
    }
}

export const updateBookInClubList = (clubId,bookId, bookToUpdate) => async dispatch => {
    const response = await fetch(`/api/readingList/bookclub/${clubId}/update/${bookId}`, {
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

export const removeFromClubList = (clubId, bookId) => async dispatch => {
    const response = await fetch(`/api/readingList/bookclub/${clubId}/remove/${bookId}`, {
        method:'DELETE'
    })
    if(response.ok){
        dispatch(removeBook(bookId))
        return
    }
}

let initialState = {}
const clubReadingListReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case ADD_BOOK_TO_CLUB_LIST:{
            newState = {...action.data}
            return newState
        }
        case GET_CLUB_BOOKS_LIST: {
            newState = {...state, ...action.data}
            return newState
        }
        case UPDATE_CLUB_BOOK_STATUS: {
            newState = {...state, ...action.data}
        }
        default:
            return state
    }
}
export default clubReadingListReducer
