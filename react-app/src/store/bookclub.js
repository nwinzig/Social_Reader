
const LOAD_BOOKCLUBS = 'bookclubs/LOAD_BOOKCLUBS'
const LOAD_ONE_CLUB = 'bookclubs/LOAD_ONE_CLUB'
const CREATE_CLUB = 'bookclubs/CREATE_CLUB'
const DELETE_CLUB = 'bookclubs/DELETE_CLUB'

const loadAll = (data) => {
    return {
        'type': LOAD_BOOKCLUBS,
        data
    }
}

const loadONE = (data) => {
    return {
        'type': LOAD_ONE_CLUB,
        data
    }
}

const createClub = (data) => {
    return {
        'type': CREATE_CLUB,
        data
    }
}

const deleteClub = (data) => {
    return {
        'type': DELETE_CLUB,
        data
    }
}


export const getAllClubs = () => async dispatch => {
    const response = await fetch('/api/bookclub')
    console.log('resonse in getAllClubs', response)
    if(response.ok){
        const bookClub = await response.json()
        console.log('bookclub in good response', bookClub)
        dispatch(loadAll(bookClub))
        return bookClub
    }
}

export const getOneClub = (clubId) => async dispatch => {
    const response = await fetch(`/api/bookclub/${clubId}`)

    if(response.ok){
        const bookClub = await response.json()
        dispatch(loadONE(bookClub))
        return bookClub
    }
}


let initialState = {}
const bookClubReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case LOAD_BOOKCLUBS: {
            newState = {...action.data}
            return newState
        }
        case LOAD_ONE_CLUB: {
            newState = {...action.data}
            return newState
        }
        default:
            return state
    }
}

export default bookClubReducer
