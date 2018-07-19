import React from 'react';
import './logo.css';
import logoImg from '../../images/job.png';


class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img src={logoImg} alt=""/>
            </div>
        )
    }
}

export default Logo;