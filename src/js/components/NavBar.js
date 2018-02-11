import React from 'react';
import { NavLink } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
const imageAlign={
    verticalAlign: "middle",
    marginLeft:20,
    width:225,
    height:35,
};
const linkText={
    fontFamily:"Roboto",
    fontSize:15,
    color:"#fff",
    fontWeight:600,
    height:65
};
class NavBar extends React.Component{
    render(){
        return(
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper" style={{background: "linear-gradient(-151deg, #1e80c5, #63e7b1)"}}>
                        <img src={require('../../images/logo.png')}  alt="logo" style={imageAlign}/>
                        <ul id="nav-mobile" className="right">
                            <li><NavLink to="/" style={linkText}>HOME</NavLink></li>
                            <li><NavLink to="/app/pnr" style={linkText}>PNR</NavLink></li>
                            <li><NavLink to="/app/gallery" style={linkText}>GALLERY</NavLink></li>
                            <li><NavLink to="/app/knowUs" style={linkText}>KNOW US</NavLink></li>
                            <li><NavLink to="/app/login" style={linkText}><FontIcon className="material-icons icon" >person</FontIcon></NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default NavBar