import axios from 'axios';
import { getRedirectPath } from '../util';

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    // isAuth: false,
    msg: '',
    user: '',
    type: ''
}
// reducer
export const user = (state = initState, action) => {
    switch(action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: '',
                redirectTo: getRedirectPath(action.payload),
                ...action.payload
            }
        case LOAD_DATA:
            return {...state, ...action.payload};
        case ERROR_MSG:
            return {
                ...state,
                isAuth: false,
                msg: action.msg
            }
        default:
            return state;
    }
}

const authSuccess = (obj) => {
    const {pwd, ...data} = obj
    return { type: AUTH_SUCCESS, payload: data}
}


export const loadData = (userinfo) => {
    return { type: LOAD_DATA, payload: userinfo}
}

const errorMsg = (msg) => {
    console.log('msg', msg);
    return {msg, type: ERROR_MSG};
}

export const register = ({user, pwd, repeatpwd, type}, callback = ()=>{}) => {
    if(!user || !pwd || !type) { 
        return errorMsg('用户名密码必须输入!');
    }
    if(pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同!');
    }

    return dispatch => {
        axios.post('/user/register', {user, pwd, type}).then(res =>{
            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess({user, pwd, type}))
                callback();
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
    
}

export const login = ({user, pwd}, callback = ()=>{}) => {
    if(!user || !pwd){
        return errorMsg('用户名密码必须输入!');
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd}).then(res => {
            console.log(res, '登陆回调')
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({user, pwd, ...res.data.data}));
                callback();
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        }).catch(res => {
            console.log(res, '**')
        });
    }
}

// 更新用户信息
export const update = (data, callback = ()=>{}) => {
    return dispatch => {
        axios.post('/user/update', data).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({...res.data.data}));
                callback();
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        });
    }
}