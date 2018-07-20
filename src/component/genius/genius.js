import React from 'react';
import Usercard from '../usercard/usercard'

import {connect} from 'react-redux';
import {getUserList} from '../../redux/charuser.redux';

@connect(
    state => state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentDidMount() {
        this.props.getUserList('boss');
    }
    render(){
        return (
            <Usercard userList={this.props.userList}/>
        )
    }
}

export default Boss;