import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import User from '../User';
import './shelfModal.css'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addBookToList } from '../../store/readingList';


function UserBookshelfModal({book, user}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [isModal, setIsModal] = useState(false)
    const [status, setStatus] = useState('')
    console.log('book in modal', book)
    console.log('user in modal', user)

    const handleSubmit = async (e) => {
        e.preventDefault()

        let bookToAdd = {
            'user_id': user.id,
            'book_id': book.id,
            'status': status
        }
        console.log('what Im sending', bookToAdd)
        const data = await dispatch(addBookToList(bookToAdd))

        return setIsModal(false)
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
                        <label>Add a status </label>
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
