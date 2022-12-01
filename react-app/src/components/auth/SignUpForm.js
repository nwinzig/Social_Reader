import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './signUp.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const imageCheck = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/
  const onSignUp = async (e) => {
    e.preventDefault();

    if(profileImage && !profileImage.split('?')[0].match(imageCheck)){
      setErrors(['Image must be valid: jpg, jpeg, png, webp, avif, gif, svg. Try again or a default image will be given'])
    }
    else if (password === repeatPassword) {
      const obj = {
        'first_name':firstName,
        'last_name':lastName,
        'profile_image':profileImage,
        username,
        email,
        password
      }
      // console.log('the object im dispatching', obj)
      const data = await dispatch(signUp(obj));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Password and Repeat Password must match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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
    <form onSubmit={onSignUp} className='signUpForm'>
      <div className='signUpImageWrapper'>
        <img alt='signup' src='https://res.cloudinary.com/dydhvazpw/image/upload/v1669496353/capstone/book-and-reading-statistics-min_prldl6.jpg'>
        </img>
      </div>
      <div className='formInfoWrapper'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind} id='red'>{error}</div>
          ))}
        </div>
        {/* adding to signup form */}
        <div>
          <h2 id='removeMargin'>
            Join the community!
          </h2>
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            name='firstName'
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder='First Name'
            required
            minLength={2}
            maxLength={25}

          ></input>
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            name='lastName'
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder='Last Name'
            required
            minLength={2}
            maxLength={25}
          ></input>
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            name='profileImage'
            onChange={(e) => setProfileImage(e.target.value)}
            value={profileImage}
            placeholder='Profile Image url(optional)'
          ></input>
        </div>
        {/* end addition */}
        <div>
          <input
            className='inputField'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder='Username'
            required
            minLength={3}
            maxLength={25}
          ></input>
        </div>
        <div>
          <input
            className='inputField'
            type='email'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='Email'
            required
            minLength={3}
            maxLength={30}
          ></input>
        </div>
        <div>
          <input
            className='inputField'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='Password'
            required
            minLength={3}
            maxLength={25}
          ></input>
        </div>
        <div>
          <input
            className='inputField'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Re-enter Password'
            minLength={3}
            maxLength={25}
          ></input>
        </div>
        <button type='submit' className='SignUpButton'>Sign Up</button>
        <div className='alreadyHaveAccountWrapper'>
          <div id='addRightMargin'>
            Already have an account?
          </div>
          <NavLink to='/login' exact className='loginHere'>
            Login here
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

export default SignUpForm;
