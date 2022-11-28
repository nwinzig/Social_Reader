
const LOAD_BOOKCLUBS = 'bookclubs/LOAD_BOOKCLUBS'
const LOAD_ONE_CLUB = 'bookclubs/LOAD_ONE_CLUB'
const CREATE_CLUB = 'bookclubs/CREATE_CLUB'
const DELETE_CLUB = 'bookclubs/DELETE_CLUB'
const EDIT_CLUB = 'bookclubs/EDIT_CLUB'

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

const editClub = (data) => {
    return {
        'type': EDIT_CLUB,
        data
    }
}

export const getAllClubs = () => async dispatch => {
    const response = await fetch('/api/bookclub')
    // console.log('resonse in getAllClubs', response)
    if(response.ok){
        const bookClub = await response.json()
        // console.log('bookclub in good response', bookClub)
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

export const createNewClub = (newClub) => async dispatch => {
    // console.log('in thunk before response', newClub)
    const response = await fetch('/api/bookclub/newClub', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newClub)
    })

    if(response.ok){
        // console.log('respons ok', response)
        const bookClub = await response.json()
        dispatch(createClub(bookClub))
        return bookClub
    } else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            // console.log(data.errors)
            return data.errors
        }
    }
}

export const deleteAClub = (id) => async dispatch => {
    const response = await fetch(`/api/bookclub/${id}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(deleteClub(id))
        return
    }
    return
}

export const editAClub = (club, clubId) => async dispatch => {
    const response = await fetch(`/api/bookclub/${clubId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(club)
    })
    if(response.ok){
        const newClub = await response.json()
        // console.log('new club in reponse ok', newClub)
        dispatch(editClub(newClub))
    }
}

let initialState = {}
const bookClubReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case LOAD_BOOKCLUBS: {
            newState = {...state, ...action.data}
            return newState
        }
        case LOAD_ONE_CLUB: {
            newState = {...action.data}
            return newState
        }
        case CREATE_CLUB: {
            newState = {...action.data}
            return newState
        }
        case EDIT_CLUB: {
            newState = {...state, ...action.data}
            return newState
        }
        default:
            return state
    }
}

export default bookClubReducer
