import React from 'react';
import { Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';

const propTypes = {
    selectAvatar: PropTypes.func
}

class AvatarSelector extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            icon: ''
        };
    }
    render() {
        const avatarList = 'girl,boy,candy_girl,chicken,dog,fat_girl,old_girl,xianyu,young_boy,tiger,strong_man,rabbit'.split(',').map(v => ({
            icon: require(`../../images/avatar/${v}.jpg`),
            text: v
        }));
        const gridHeader = this.state.icon ? <div>
            <span>已选择头像</span>
            <img style={{width: '20px'}} src={this.state.icon}/>
        </div> : '请选择头像';
        return (
            <div id="avatarSelector">
                <List renderHeader={() => gridHeader}>
                    <Grid 
                        data={avatarList}
                        onClick={ele => {
                            this.setState(ele)
                            this.props.selectAvatar(ele.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector;