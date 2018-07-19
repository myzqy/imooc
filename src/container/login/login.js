import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';


@connect(
    state => state.user,
    { login }
)
class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            pwd: ''
        }
    }
    handleChange = (key, val) => {
        this.setState({
            [key]: val
        });
    }
    handleLogin = () => {
        this.props.login(this.state, () => {
            this.props.history.push(this.props.redirectTo);
        });
    }
    register = () => {
        this.props.history.replace('/register');
    }
    render(){
        return (
            <div id="login">
                <Logo/>
                <WingBlank>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            onChange={(val) => this.handleChange('user', val)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            onChange={(val) => this.handleChange('pwd', val)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleLogin} type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;