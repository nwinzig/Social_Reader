
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
const NavBar = () => {

  const session = useSelector((state) => state.session.user)

  let rightNav;

  if(session){
    rightNav = (
      <div className='rightNavWrapper'>
        <div>
          <LogoutButton />
        </div>
      </div>
    )
  } else{
    rightNav = (
      <div className='rightNavWrapper'>
          <NavLink className='signInButton' to='/sign-up' exact={true} activeClassName='active'>
            SIGN IN
          </NavLink>
          <NavLink className='signUpButton' to='/login' exact={true} activeClassName='active'>
            SIGN UP
          </NavLink>
      </div>
    )
  }

  return (
    <nav className='navWrapper'>
      <div className='leftNavWrapper'>
        <div>
          <NavLink className='logo' to='/' exact={true} activeClassName='active'>
            Social Reader
          </NavLink>
        </div>
        <div>
          <NavLink className='joinAClub' to='/' exact={true} activeClassName='active'>
            Join A book Club
          </NavLink>
        </div>
        <div>
          <NavLink className='findABook' to='/' exact={true} activeClassName='active'>
            Find A Book
          </NavLink>
        </div>
      </div>
    {rightNav}


    </nav>
  );
}

export default NavBar;
