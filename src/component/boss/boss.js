import React from 'react';

import {connect} from 'react-redux';
import {getUserList} from '../../redux/charuser.redux';
import Usercard from '../usercard/usercard'

@connect(
    state => state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentDidMount() {
        this.props.getUserList('genius');
    }
    render(){
        return (
            <Usercard userList={this.props.userList}/>
        )
    }
}

export default Boss;