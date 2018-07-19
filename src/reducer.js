//   合并所有 reducer 

import { combineReducers } from 'redux';
import { user } from './redux/user.redux';

// console.log(user, 'user')

export default combineReducers({
    user
});