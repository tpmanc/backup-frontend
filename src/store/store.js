import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducer'
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;