import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import User from '../User';
import './shelfModal.css'

function UserBookshelfModal({book, user}){
    const [isModal, setIsModal] = useState(false)
    const [status, setStatus] = useState('')
    console.log('book in modal', book)
    console.log('user in modal', user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('button working', status)
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
