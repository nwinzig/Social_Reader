import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
// import User from '../User';
import './shelfModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addBookToList, updateBookInList } from '../../store/readingList';


function UserBookshelfModal({book, user}){
    const dispatch = useDispatch()
    const history = useHistory()
    const userBookList = useSelector((state) => state.readingList.books)
    const [isModal, setIsModal] = useState(false)
    const [status, setStatus] = useState('')
    const [isOnShelf, setIsOnShelf] = useState(false)
    console.log('book in modal', book)
    console.log('user in modal', user)
    console.log('user list in modal',userBookList)

    //is book on shelf
    useEffect(() => {
        if(userBookList.length){
            for(let i = 0; i<userBookList?.length; i++){
                if(book.id === userBookList[i].book_id){
                    setIsOnShelf(true)
                }
            }
        }
    },[])

    console.log('on shelf?', isOnShelf)

    const handleSubmit = async (e) => {
        e.preventDefault()

        let bookToAdd = {
            'user_id': user.id,
            'book_id': book.id,
            'status': status
        }
        // console.log('what Im sending', bookToAdd)

        //for adding a new book
        if(!isOnShelf){
            const data = await dispatch(addBookToList(bookToAdd))
            setIsModal(false)
            return history.push(`/user/${user?.id}`)
        } else{
        //for updating an existing book
            const updatedData = await dispatch(updateBookInList(book.id, bookToAdd))
            setIsModal(false)
            return history.push(`/user/${user?.id}`)
        }
        return
    }
    return (
        <div>
            <div
                className='openBookshelfButton'
                onClick={() => {
                setIsModal(true)
                }}>Your Bookshelf</div>
            {isModal && (
                <Modal onClose={() => setIsModal(false)}>
                    <form className='bookshelfModalContent' onSubmit={handleSubmit}>
                        <h3 className='bookshelfModal'>
                            {book?.name}
                        </h3>
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
                        <button type='submit'>Add to Bookshelf</button>
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default UserBookshelfModal
