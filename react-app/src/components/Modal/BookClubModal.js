import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
// import User from '../User';
import './shelfModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { addBookToClubList, getClubBooksList, updateBookInClubList } from '../../store/clubReadingList';

function ClubBookshelfModal({book,user}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [isModal, setIsModal] = useState(false)
    const [status, setStatus] = useState('')
    const [isOnShelf, setIsOnShelf] = useState(false)
    const [bookclub, setBookclub] = useState()
    const [userClubs, setUserClubs] = useState([])

    //need to get all user owned bookclubs
    useEffect(() => {
        async function fetchOwnedClubs(){
            const request = await fetch(`/api/bookclub/userClubs/${user.id}/owned`)
            const newRequest = await request.json()
            if(newRequest){
                setUserClubs(newRequest.bookClubs)
            }
        }
        fetchOwnedClubs()
    }, [dispatch, user.id])

    // console.log('should be owned clubs', userClubs)

    // const currentClubBookList = useSelector((state) => state.clubReadingList.books)

    // useEffect(() => {
    //     dispatch(getClubBooksList(Number(bookclub)))
    // }, [dispatch, bookclub])

    // console.log('do i get a list of books', currentClubBookList)

    //creating a function to handle change in bookclub choice and get a reading list to try and check if the book is already in the list
    const [testList, setTestList] = useState([])
    const checkClubList = async function(clubId){
        // console.log('this is running', clubId)
        setBookclub(Number(clubId))
        const newList = await dispatch(getClubBooksList(Number(clubId)))
        // console.log('what is newlist', newList)
        // console.log('do i get a list', testList)
        return setTestList(newList.books)
    }
    console.log('this is a test', testList)

    //create component depending on if user owns any clubs
    let ownedClubs
    if(userClubs?.length){
        ownedClubs = (
            <>
                <label>Choose a Bookclub</label>
                <select
                className='statusSelect'
                value={bookclub}
                onChange={(e) => checkClubList(e.target.value)}
                required
                >
                    <option value=''> Please select an option</option>
                    {userClubs.map(club => (
                        <option
                        key={club?.id}
                        value={club?.id}
                        >{club?.name}</option>
                    ))}
                </select>
                <label>Add or adjust a status </label>
                        <select className='statusSelect'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        >
                            <option value=''>Please select an option</option>
                            <option value='reading'>reading</option>
                            <option value='completed'>completed</option>
                            <option value='planning'>planning</option>
                        </select>
                        <button className='submitStatus' type='submit'>Add to Bookshelf</button>
            </>
        )
    } else {
        ownedClubs = (
            <div className='noneOwnedContainer'>
                {/* <div id='centerAndflex'>First host a club to add to it's bookshelf.</div> */}
                <NavLink to={'/findAClub/newClub'} className='createFirstClub'>
                    Create your first club
                </NavLink>
            </div>
        )
    }

    useEffect(() => {
        if(testList.length){
            console.log('am i here')
            for(let i = 0; i<testList.length; i++){
                console.log('inside for loop', 'book id', book.id, 'test id', testList[i].id)
                if(book.id == testList[i].id){
                    console.log('inside conditional sadas')
                    setIsOnShelf(true)
                    console.log('is on shelf inside loop', isOnShelf)
                }
            }
        }
        console.log('if its on shelf im happy', isOnShelf)
    })


    //handle a submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        // needs to collect and send book id, bookclub id, status
        let bookclubId = Number(bookclub)

        let bookToAdd = {
            'book_id': book.id,
            'bookclub_id': bookclubId,
            'status': status
        }

        if(!isOnShelf){
            console.log('should be data to add', bookToAdd)
            const data = await dispatch(addBookToClubList(bookclubId, bookToAdd))
            setIsModal(false)
            return history.push(`/findAClub/${bookclubId}`)
        } else {
            const updateData = await dispatch(updateBookInClubList(bookclubId, book.id, bookToAdd))
            setIsModal(false)
            return history.push(`/findAClub/${bookclubId}`)
        }
    }

    return (
        <div>
            <div
                className='openBookshelfButton'
                onClick={() => {
                setIsModal(true)
                }}>Your Bookclubs</div>
            {isModal && (
                <Modal onClose={() => setIsModal(false)}>
                    <form className='bookClubModalContent' onSubmit={handleSubmit}>
                        <h3 className='bookshelfModal'>
                            {book?.name}
                        </h3>
                        {ownedClubs}
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default ClubBookshelfModal
