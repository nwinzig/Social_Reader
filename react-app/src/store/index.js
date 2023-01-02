import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import bookClubReducer from './bookclub';
import bookReducer from './books'
import readingListReducer from './readingList';
import clubReadingListReducer from './clubReadingList';

const rootReducer = combineReducers({
  session,
  'bookclubs':bookClubReducer,
  'books': bookReducer,
  'readingList': readingListReducer,
  'clubReadingList': clubReadingListReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
