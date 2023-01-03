import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
// import User from '../User';
import './shelfModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getClubBooksList } from '../../store/clubReadingList';

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

    console.log('should be owned clubs', userClubs)



    //create component depending on if user owns any clubs
    let ownedClubs
    if(userClubs?.length){
        ownedClubs = (
            <>
                <label>Choose a Bookclub</label>
                <select
                className='statusSelect'
                value={bookclub}
                onChange={(e) => setBookclub(e.target.value)}
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


    const checkShelf = function(){
        setIsOnShelf(false)
        if(currentClubBookList?.length){
            for(let i = 0; i<currentClubBookList?.length; i++){
                console.log('book id', book.id, 'in list id', currentClubBookList[i].id)
                if(book.id === currentClubBookList[i].id){

                    return setIsOnShelf(true)
                }
            }
        }
    }
    //get list of books for club if selected in dropdown
    const currentClubBookList = useSelector((state) => state.clubReadingList.books)
    useEffect(() => {
        dispatch(getClubBooksList(Number(bookclub))).then(checkShelf())
    }, [dispatch, bookclub])
    console.log('do i get a list of books', currentClubBookList)

    console.log('is it on the shelf after function call', isOnShelf)
    //need to see if book is already on club reading list

    // useEffect(() => {
    //     if(currentClubBookList?.length){
    //         for(let i = 0; i<currentClubBookList?.length; i++){
    //             console.log('book id', book.id, 'in list id', currentClubBookList[i].id)
    //             if(book.id === currentClubBookList[i].id){
    //                 console.log('test')
    //                 setIsOnShelf(true)
    //             }
    //         }
    //     }
    // }, [bookclub])

    //handle a submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('this is bookclub', bookclub)

        // needs to collect and send book id, bookclub id, status
        let bookToAdd = {
            'book_id': book.id,
            'bookclub_id': Number(bookclub),
            'status': status
        }
        console.log('am i recieving the correct information',bookToAdd)
        console.log('will submit see that the book is on shelf', isOnShelf)
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
