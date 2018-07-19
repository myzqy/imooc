import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar } from '../../../node_modules/antd-mobile';
import NavLink from '../../component/navlink/navlink';
import Boss from '../../component/boss/boss';

const Genius = () => {
    return <h2>牛人首页</h2>
}

const Msg = () => {
    return <h2>消息列表</h2>
}

const User = () => {
    return <h2>个人中心页面</h2>
}

@connect(
    state => state
)
class DashBorad extends React.Component{
    render() {
        const user = this.props.user;
        const { pathname } = this.props.location;
        const navList = [{
            path: '/boss',
            text: '牛人',
            icon: 'boss',
            title: '牛人列表',
            component: Boss,
            hide: user.type === 'genius'
        },{
            path: '/genius',
            text: 'boss',
            icon: 'genius',
            title: 'Boss列表',
            component: Genius,
            hide: user.type === 'boss'
        },{
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: '消息列表', 
            component: Msg
        },{
            path: '/me',
            text: '我',
            icon: 'user',
            title: '个人中心',
            component: User
        }]

        console.log(pathname, 'pathname**')
        
        return (
            <div>
                <NavBar className="am-navbar" mode="dard">
                    {navList.find(v => v.path === pathname ).title}
                </NavBar>
                <div>
                    <Switch>
                        <Route  />
                    </Switch>
                </div>
                DashBorad
                <NavLink data={navList}/>
                {/* <Route path='/boos' /> */}
                {/* <Route path= '/genius' /> */}
                <footer></footer>
            </div>
        )
    }
}

export default DashBorad;