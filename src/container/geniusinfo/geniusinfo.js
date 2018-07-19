import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar_selector/avatar_selector'

// redux
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            avatar: ''
        }
    }
    handleChange = (key, val) => {
        this.setState({
            [key]: val
        });
    }
    selectAvatar = (text) => {
        console.log(text, 'text');
        this.setState({
            avatar: text
        });
    }
    handleUpdate = () => {
        this.props.update(this.state, () => {
            this.props.history.replace(this.props.redirectTo);
        });
    }
    render() {
        return (
            <div id="bossInfo">
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}/>
                <InputItem onChange={v => this.handleChange('title', v)}>
                    求职岗位
                </InputItem>
                <TextareaItem 
                    onChange={v => this.handleChange('desc', v)}
                    rows={3}
                    title="个人简介"
                    autoHeight
                />
                <Button onClick={this.handleUpdate} type="primary">保存</Button>
            </div>
        )
    }
}

export default GeniusInfo;