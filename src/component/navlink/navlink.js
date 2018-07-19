import React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class NavLink extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        const navList = this.props.data.filter(v => !v.hide);
        const {pathname} = this.props.location;
        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        title={v.text}
                        key={v.path}
                        // icon
                        // selectedIcon
                        selected={pathname === v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    >

                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default NavLink;