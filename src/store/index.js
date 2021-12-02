import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from './reducer/AuthReducer';
import {PostReducer, FetchPosts} from './reducer/postReducer';

const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    FetchPosts
});
const middlewares = [thunkMiddleware]
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;