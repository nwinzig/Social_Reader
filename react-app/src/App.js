import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage';
import FindAClub from './components/BookClub/FindBookClub';
import ClubDetails from './components/BookClub/ClubDetails';
import CreateABookClub from './components/BookClub/CreateClub';
import UpdateAClub from './components/BookClub/UpdateAClub';
import FindABook from './components/Book/FindABook';
import BookDetails from './components/Book/BookDetails';
import CreateABook from './components/Book/CreateABook';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route exact path='/findAClub'>
          <FindAClub />
        </Route>
        <Route exact path='/findAclub/newClub'>
          <CreateABookClub />
        </Route>
        <Route exact path='/findAClub/:clubId'>
          <ClubDetails />
        </Route>
        <ProtectedRoute path='/findAClub/:clubId/update'>
          <UpdateAClub />
        </ProtectedRoute>
        <Route exact path='/findABook'>
            <FindABook />
        </Route>
        <ProtectedRoute exact path='/findABook/newBook'>
            <CreateABook />
        </ProtectedRoute>
        <Route path='/findABook/:bookId'>
            <BookDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
