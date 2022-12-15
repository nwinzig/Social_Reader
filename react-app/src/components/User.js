import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getUserClubs } from '../store/bookclub';
import { getAllUserBooks } from '../store/books';
import { removeFromList } from '../store/readingList';
import './user.css'
function User() {
  const dispatch = useDispatch()
  const bookClubs = useSelector((state) => state.bookclubs.bookClubs)
  const books = useSelector((state) => state.books.Books)
  const user = useSelector((state) => state.session.user)
  const userId = user?.id

  useEffect(() => {
    dispatch(getAllUserBooks(userId))
    dispatch(getUserClubs(userId))
  }, [dispatch])

  // click to resolve button used to remove a book from user reading list
  const handleRemove = async (bookId) => {
    // e.preventDefault()
    console.log('in remove', bookId)
    const data = await dispatch(removeFromList(bookId))
    window.location.reload()
    return
  }


  // seperate books based on status
  let completedBooks = []
  let readingBooks = []
  let planningBooks = []
  let favoriteBooks = []
  for(let i=0; i<books?.length; i++){
      if(books[i].favorite === true){
        favoriteBooks.push(books[i])
      }
      if(books[i].status === 'completed'){
          completedBooks.push(books[i])
      }
      else if(books[i].status === 'reading'){
          readingBooks.push(books[i])
      } else if(books[i].status === 'planning'){
          planningBooks.push(books[i])
      }
  }

//create components for each status list
let favoriteDisplay;
if(favoriteBooks.length >= 1){
  favoriteDisplay = (
    <div className='pastBooksWrapper' id='addBottomBorder'>
          {favoriteBooks?.map((book) => (
              <div key={book?.id} className='pastBookCard'>
                  <h3>{book?.name}</h3>
                  <h4>By: {book?.author}</h4>
                  <img className='readingCoverImage' src={book?.cover_image} alt='book cover'
                  onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                  ></img>
              </div>
          ))}
      </div>
  )
} else {
  favoriteDisplay = (
    <div>
      Showcase your favorite books
    </div>
  )
}
let pastDisplay;
if(completedBooks.length>=1){
  pastDisplay = (
      <div className='pastBooksWrapper' id='addBottomBorder'>
          {completedBooks?.map((book) => (
              <div key={book?.id} className='pastBookCard'>
                  <h3>{book?.name}</h3>
                  <h4>By: {book?.author}</h4>
                  <img className='readingCoverImage' src={book?.cover_image} alt='book cover'
                  onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                  ></img>
                  <button onClick={() => handleRemove(book?.id)}>Remove from Bookshelf</button>
              </div>
          ))}
      </div>
  )
} else {
  pastDisplay = (
    <div>
      Let us know when you finish your first book, so we can add it to your shelf.
    </div>
  )
}

let planningDisplay;
if(planningBooks.length>=1){
  planningDisplay = (
      <div className='pastBooksWrapper' >
          {planningBooks?.map((book) => (
              <div key={book?.id} className='pastBookCard'>
                  <h3>{book?.name}</h3>
                  <h4>By: {book?.author}</h4>
                  <img src={book?.cover_image} className='readingCoverImage' alt='book cover'
                  onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
                  ></img>
                  <button onClick={() => handleRemove(book?.id)}>Remove from Bookshelf</button>
              </div>
          ))}
      </div>
  )
} else{
  planningDisplay = (
    <div>
      Set the status of a book to 'planning', to keep track of it on your shelf.
    </div>
  )
}

let readingDisplay;
if(readingBooks.length>= 1){
  readingDisplay = (
    <div className='pastBooksWrapper' >
    {readingBooks?.map((book) => (
        <div key={book?.id} className='pastBookCard'>
            <h3>{book?.name}</h3>
            <h4>By: {book?.author}</h4>
            <img src={book?.cover_image} className='readingCoverImage' alt='book cover'
            onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
            ></img>
            <button onClick={() => {handleRemove(book?.id)}}>Remove from Bookshelf</button>
        </div>
    ))}
</div>
  )
} else {
  readingDisplay = (
    <div>
      It's time to start reading!
    </div>
  )
}


//seperate clubs by member status
let ownedClubs = []
let memberClubs = []
for(let i = 0; i<bookClubs?.length; i++){
  if(bookClubs[i].member_status === 'owner'){
    ownedClubs.push(bookClubs[i])
  } else if (bookClubs[i].member_status === 'member') {
    memberClubs.push(bookClubs[i])
  }
}

//create component for owned clubs
let myClubDisplay;
  if (ownedClubs.length >= 1) {
    myClubDisplay = (
      <div className='clubResultsWrapper'>
        {ownedClubs?.map(club => (
          <div className='clubCardWrapper' key={club?.id}>
            <div>
              <img className='clubImage' alt='bookclub' src={club?.clubImage}
                onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
              ></img>
            </div>
            <h3 id='wordBreak' className='maxWidth'>
              {club?.name}
            </h3>
            <NavLink to={`/findAClub/${club?.id}`} className='viewClubButton' onClick={() => window.scrollTo(0, 0)}>
              View Club
            </NavLink>
          </div>
        ))}
      </div>
    )
  } else {
    myClubDisplay = (
      <div>
        Start hosting your first bookclub to find likeminded readers.
      </div>
    )
  }

//create component for clubs the user is a member of
let memberDisplay;
if (memberClubs.length >= 1) {
  memberDisplay = (
    <div className='clubResultsWrapper'>
      {memberClubs?.map(club => (
        <div className='clubCardWrapper' key={club?.id}>
          <div>
            <img className='clubImage' alt='bookclub' src={club?.clubImage}
              onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}
            ></img>
          </div>
          <h3 id='wordBreak' className='maxWidth'>
            {club?.name}
          </h3>
          <NavLink to={`/findAClub/${club?.id}`} className='viewClubButton' onClick={() => window.scrollTo(0, 0)}>
            View Club
          </NavLink>
        </div>
      ))}
    </div>
  )
} else {
  memberDisplay = (
    <div>
      Find new books and get on a reading schedule by joining a bookclub
    </div>
  )
}



  const [view, setView] = useState('bookshelf')

  let contentView;
  if(view === 'bookshelf'){
    contentView = (
      <div>
        <h2>Your Bookshelf</h2>
        <div>
          <h3>
            Favorites
          </h3>
          <div>
            {favoriteDisplay}
          </div>
          <h3>
            Currently Reading
          </h3>
          <div>
            {readingDisplay}
          </div>
          <h3>
            Completed
          </h3>
          <div>
            {pastDisplay}
          </div>
          <h3>
            Planning to Read
          </h3>
          <div>
            {planningDisplay}
          </div>
        </div>
      </div>
    )
  } else if (view === 'bookclubs'){
    contentView = (
      <div>
        <h2>
          Your Bookclubs
        </h2>
        <h3>
          Clubs your Hosting
        </h3>
        <div>
          {myClubDisplay}
        </div>
        <h3>
          Clubs you've joined
        </h3>
        <div>
          {memberDisplay}
        </div>
      </div>
    )
  }



  return (
    <div className='userDetailsBody'>
      <div className='userPageLeft'>
        <div className='userInfo'>
          <img src={user?.profile_image}
          onError={e => { e.currentTarget.src = "https://res.cloudinary.com/dydhvazpw/image/upload/v1669760728/capstone/No_image_available.svg_qsoxac.png"; }}>
          </img>
          <h1>
            {user?.first_name} {user?.last_name}
          </h1>
        </div>
        <div className='changeView'>
          <button onClick={() => {setView('bookshelf')}}>
            My Bookshelf
          </button>
          <button onClick={() => {setView('bookclubs')}}>
            My Bookclubs
          </button>
        </div>
      </div>
      <div className='userPageRight'>
        <div className='userPageRightContent'>
          {contentView}
        </div>
      </div>
    </div>
  );
}
export default User;
