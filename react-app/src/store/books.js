
const LOAD_BOOKS = '/book/LOAD_BOOKS'
const LOAD_ONE_BOOK = '/book/LOAD_ONE_BOOK'
const CREATE_BOOK = '/book/CREATE_BOOK'
const DELETE_BOOK = '/book/DELETE_BOOK'
const EDIT_BOOK = '/book/EDIT_BOOK'

const loadAll = (data) => {
    return {
        'type': LOAD_BOOKS,
        data
    }
}

const loadOne = (data) => {
    return {
        'type': LOAD_ONE_BOOK,
        data
    }
}

const createBook = (data) => {
    return {
        'type': CREATE_BOOK,
        data
    }
}

const deleteBook = (data) => {
    return {
        'type': DELETE_BOOK,
        data
    }
}

const editBook = (data) => {
    return {
        'type': EDIT_BOOK,
        data
    }
}


export const getAllBooks = () => async dispatch => {
    const response = await fetch('/api/book')

    if(response.ok){
        const book = await response.json()
        dispatch(loadAll(book))
        return book
    }
}

export const getOneBook = (id) => async dispatch => {
    const response = await fetch(`/api/book/${id}`)

    if(response.ok){
        const book = await response.json()
        dispatch(loadOne(book))
        return book
    }
}


let initialState = {}
const bookReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case LOAD_BOOKS:{
            newState = {...state, ...action.data}
            return newState
        }
        case LOAD_ONE_BOOK:{
            newState = {...action.data}
            return newState
        }
        default:
            return state
    }
}

export default bookReducer
