import React from 'react';
import { NavLink } from 'react-router-dom'
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';



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
    fontWeight:600
};
const avatarAlign={
    marginTop:12,
    marginLeft:5
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
                            <li><NavLink to="/" style={linkText}>PNR</NavLink></li>
                            <li><NavLink to="/" style={linkText}>CANCELLATION</NavLink></li>
                            <li><NavLink to="/gallery" style={linkText}>GALLERY</NavLink></li>
                            <li><NavLink to="" style={linkText}>KNOW US</NavLink></li>
                            <li><NavLink to="/login" style={linkText}><FontIcon className="material-icons icon" >person</FontIcon></NavLink></li>





                            {/*<IconMenu*/}
                                {/*iconButtonElement={<IconButton><NavigationExpandMoreIcon /></IconButton>}*/}
                                {/*anchorOrigin={{horizontal: 'left', vertical: 'top'}}*/}
                                {/*targetOrigin={{horizontal: 'left', vertical: 'top'}}*/}
                            {/*>*/}
                                {/*<MenuItem primaryText="Refresh" />*/}
                                {/*<MenuItem primaryText="Send feedback" />*/}
                                {/*<MenuItem primaryText="Settings" />*/}
                                {/*<MenuItem primaryText="Help" />*/}
                                {/*<MenuItem primaryText="Sign out" />*/}
                            {/*</IconMenu>*/}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar