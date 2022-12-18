import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
// import User from '../User';
import './shelfModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ClubBookshelfModal({book,user}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [isModal, setIsModal] = useState(false)
    const [status, setStatus] = useState('')
    const [isOnShelf, setIsOnShelf] = useState(false)
    const [bookclub, setBookclub] = ('')
    //need to see if book is already on club reading list

    //need to get all user owned bookclubs

    //handle a submit
    const handleSubmit = async (e) => {
        e.preventDefault()
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
                        <label>Choose a Bookclub</label>
                        <select
                        value={bookclub}
                        onChange={(e) => setBookclub(e.target.value)}
                        required
                        >
                            {/* need to loop through all user bookclubs as options */}
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
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default ClubBookshelfModal
