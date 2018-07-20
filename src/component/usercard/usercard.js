import React from 'react';
import {Card, WingBlank} from 'antd-mobile';
import './usercard.css';

class UserCard extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <WingBlank>
                {this.props.userList.map( item => (
                    item.avatar ? <Card className="user-item" key={item._id}>
                        <Card.Header 
                            title={item.user} 
                            thumb={require(`../../images/avatar/${item.avatar}.jpg`)}
                            thumbStyle={{width: '20px'}}
                            extra={<span>{item.title}</span>}
                        />
                        <Card.Body>
                            {item.type === 'boss' ? <div>公司：{item.company}</div> : null}
                            {item.desc.split('\n').map(item => (
                                <div key={item}>{item}</div>
                            ))}
                            {item.type === 'boss' ? <div>薪资：{item.money}</div> : null}
                        </Card.Body>
                    </Card> : null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard;