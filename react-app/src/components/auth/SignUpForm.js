import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
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

  const onSignUp = async (e) => {
    e.preventDefault();
    // console.log(firstName, lastName)
    if(!profileImage){
      setProfileImage('https://res.cloudinary.com/dydhvazpw/image/upload/v1669156973/capstone/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714_ts2m47.jpg')
    }
    if (password === repeatPassword) {
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
          <h2>
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
          ></input>
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            name='profileImage'
            onChange={(e) => setProfileImage(e.target.value)}
            value={profileImage}
            placeholder='Profile Image(optional)'
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
          ></input>
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='Email'
            required
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
      </div>
    </form>
  );
};

export default SignUpForm;
