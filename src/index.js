import React from 'react';
import ReactDOM from 'react-dom';
import './config.js';
import './index.css';

import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';

// 组件
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authRoute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashborad from './component/dashborad/dashborad';

// redux
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducer';
import reduxThunk from 'redux-thunk';

const store = createStore(reducers, compose(
    applyMiddleware(reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

const Genius = () => <div>牛人页面</div>;
const Boss = () => <div>boss页面</div>;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="page-content">
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    {/* <Route path="/genius" component={Genius}></Route> */}
                    {/* <Route path="/boss" component={Boss}></Route> */}
                    <Route component={Dashborad}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , 
    document.getElementById('root')
);