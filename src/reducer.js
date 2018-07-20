//   合并所有 reducer 

import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { chatuser } from './redux/charuser.redux';


// console.log(user, 'user')

export default combineReducers({
    user,
    chatuser
});