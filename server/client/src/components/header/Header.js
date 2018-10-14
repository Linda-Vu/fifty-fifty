import React, {Component} from "react";
import '../App.css';
import Logo from './Logo.png';

const Img = <img className="logo" src={Logo}/>

// Header component is imported into App and renders on every page of App
// Currently Header component just contains logo
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