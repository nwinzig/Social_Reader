import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(["Invalid credentials"]);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemo = async (e) => {
    e.preventDefault()
    // email = 'demo@aa.io'
    // password = 'password'
    dispatch(login('demo@aa.io', 'password'))
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} className='loginForm'>
        <div className='loginImageWrapper'>
          <img alt='login' src='https://res.cloudinary.com/dydhvazpw/image/upload/v1669497841/capstone/reading-statistics_yhivsd.jpg'>
          </img>
        </div>
        <div className='loginInfoWrapper'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} id='red'>{error}</div>
            ))}
          </div>
          <div>
            <h2>
              What are you reading today?
            </h2>
          </div>
          <div>
            <input
              className='inputField'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              className='inputField'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type='submit' className='loginButton'>Login</button>
          <div className='dontHaveAccountWrapper'>
            <div>
              Don't have an account?
            </div>
            <NavLink to='/sign-up' className='signUpHereNavL'>
              Sign up here
            </NavLink>
          </div>
          <div className='alreadyHaveAccountWrapper'>
          <div id='addRightMargin'>
            Test the site here
          </div>
          <NavLink to='/' onClick={handleDemo} className='loginHere'>
            Login as Demo
          </NavLink>
        </div>
        </div>
    </form>
  );
};

export default LoginForm;
