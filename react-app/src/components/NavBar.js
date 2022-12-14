
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
const NavBar = () => {

  const session = useSelector((state) => state.session.user)
  console.log('this is the user', session)
  //setting user image with check incase there is a null url
  let userImage;
  if(session?.profile_image){
    userImage = session.profile_image
  } else{
    userImage = 'https://res.cloudinary.com/dydhvazpw/image/upload/v1669156973/capstone/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714_ts2m47.jpg'
  }

  let rightNav;

  if(session){
    rightNav = (
      <div className='rightNavWrapper'>
        <div className='navImageWrapper'>
          <NavLink to={`/user/${session.id}`}><img src={userImage} className='navUserImage'></img></NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    )
  } else{
    rightNav = (
      <div className='rightNavWrapper'>
          <NavLink className='signInButton' to='/login' exact={true} activeClassName='active' onClick={() => window.scrollTo(0, 0)}>
            SIGN IN
          </NavLink>
          <NavLink className='signUpButton' to='/sign-up' exact={true} activeClassName='active' onClick={() => window.scrollTo(0, 0)}>
            SIGN UP
          </NavLink>
      </div>
    )
  }

  return (
    <nav className='navWrapper'>
      <div className='leftNavWrapper'>
        <div>
          <NavLink className='logo' to='/' exact={true} activeClassName='active' onClick={() => window.scrollTo(0, 0)}>
            Social Reader
          </NavLink>
        </div>
        <div>
          <NavLink className='joinAClub' to='/findAClub' exact={true} activeClassName='active' onClick={() => window.scrollTo(0, 0)}>
            Join A book Club
          </NavLink>
        </div>
        <div>
          <NavLink className='findABook' to='/findABook' exact={true} activeClassName='active' onClick={() => window.scrollTo(0, 0)}>
            Find A Book
          </NavLink>
        </div>
      </div>
    {rightNav}


    </nav>
  );
}

export default NavBar;
