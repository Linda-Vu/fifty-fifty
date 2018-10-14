import React, {Component} from "react";
import './App.css';
import Logo from './Logo.png';

const Img = <img className="logo" src={Logo}/>

class Header extends Component {
    render() {
        return (
            <div className = "header">
                {Img}
            </div>
        )
    }
};

export default Header;