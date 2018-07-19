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
class BossInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            money: '',
            company: '',
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
                <NavBar mode="dark">Boss完善信息页面</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}/>
                <InputItem onChange={v => this.handleChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={v => this.handleChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={v => this.handleChange('money', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem 
                    onChange={v => this.handleChange('desc', v)}
                    rows={3}
                    title="职位要求"
                    autoHeight
                />
                <Button onClick={this.handleUpdate} type="primary">保存</Button>
            </div>
        )
    }
}

export default BossInfo;