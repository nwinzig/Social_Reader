
const ADD_BOOK_TO_LIST = '/readingList/add'
const REMOVE_BOOK_FROM_LIST = '/readingList/add'

const addBook = (data) => {
    return {
        'type': ADD_BOOK_TO_LIST,
        data
    }
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

let initialState = {}
const readingListReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case ADD_BOOK_TO_LIST:{
            newState = {...action.data}
        }
        default:
            return state
    }
}
export default readingListReducer
