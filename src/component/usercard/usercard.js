import React from 'react';
import {Card, WingBlank} from 'antd-mobile';

class UserCard extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <WingBlank>
                {this.props.userList.map( item => (
                    item.avatar ? <Card key={item._id}>
                        <Card.Header 
                            title={item.user} 
                            thumb={require(`../../images/avatar/${item.avatar}.jpg`)}
                            thumbStyle={{width: '20px'}}
                            extra={<span>{item.title}</span>}
                        />
                        <Card.Body>
                            {item.desc.split('\n').map(item => (
                                <div key={item}>{item}</div>
                            ))}
                        </Card.Body>
                    </Card> : null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard;