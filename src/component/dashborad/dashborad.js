import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar } from '../../../node_modules/antd-mobile';
import NavLink from '../../component/navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';

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

        return (
            <div>
                <NavBar className="am-navbar" mode="dard">
                    {navList.find(v => v.path === pathname ).title}
                </NavBar>
                <div>
                    <Switch>
                        {navList.map((item, key) => (
                            <Route key={item.path + key} component={item.component} path={item.path} />    
                        ))}
                        
                    </Switch>
                </div>
                <NavLink data={navList}/>
                <footer></footer>
            </div>
        )
    }
}

export default DashBorad;