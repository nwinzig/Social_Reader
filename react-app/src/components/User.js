import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllUserBooks } from '../store/books';
import './user.css'
function User() {
  const dispatch = useDispatch()
  // const bookClubs = useSelector((state) => state.bookClubs.bookClubs)
  const books = useSelector((state) => state.books.Books)
  const user = useSelector((state) => state.session.user)
  const userId = user?.id
  // console.log('this is session', user)
  // console.log('books', books)
  useEffect(() => {
    dispatch(getAllUserBooks(userId))
  }, [dispatch])

  return (
    <div className='userDetailsBody'>
      <div className='userPageLeft'>
        <div className='userInfo'>
          <img src={user?.profile_image}
          onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}>
          </img>
          <h2>
            {user?.first_name} {user?.last_name}
          </h2>
        </div>
        <div className='changeView'>
          <button>
            My Bookshelf
          </button>
          <button>
            My Bookclubs
          </button>
        </div>
      </div>
      <div className='userPageRight'>

      </div>
    </div>
  );
}
export default User;
