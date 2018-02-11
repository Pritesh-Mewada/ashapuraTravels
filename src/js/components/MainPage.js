import React from 'react'
import Paper from "material-ui/Paper"
import SelectBus from './SelectBus'

const mainPageMiddle={
    backgroundImage:'url(' + require('../../images/main_page_middle.png') + ')' ,
    height:925,
    backgroundRepeat:"no-repeat",
    marginTop:90,
    backgroundSize:"100%"
};
const paperStyleService={
    margin:60,
    background: "linear-gradient(135deg, rgba(184,31,230,1) 0%, rgba(36,181,252,1) 100%)",
    padding:10,
    borderRadius:10,
    boxShadow: "0px 35px 50px -13px rgba(0,0,0,0.4)"
};

const paperStyleSupport={
    margin:60,
    background: "linear-gradient(135deg, rgba(212,252,121,1) 0%, rgba(150,230,161,1) 100%)",
    padding:10,
    borderRadius:10,
    boxShadow: "0px 35px 50px -13px rgba(0,0,0,0.4)"
};
const paperStyleGuarantee={
    margin:60,
    background: "linear-gradient(135deg, rgba(245,87,108,1) 0%, rgba(240,147,251,1) 100%)",
    padding:10,
    borderRadius:10,
    boxShadow: "0px 35px 50px -13px rgba(0,0,0,0.4)"
};
const rowMain={
    display:"flex",
    justifyContent:"space-around"
};

const leftAdjust={
    marginLeft:140,
    marginTop:40
};
const underline={
    width:100,
    height:3,
    marginLeft:50,
    backgroundColor:"#fe5d17"
};
const undertwoline={
    width:100,
    height:3,
    marginLeft:50,
    backgroundColor:"#9a3dea"
};
const iconAlign={
};
const rightAjust={
    marginRight:180
};
const pStyle={
    fontSize:18,
    color:"#fff"
};
const leftAdjustthree={
    marginLeft:70,
    marginTop:40
}
const spanStyle={
    fontWeight:600,
    fontFamily:"Roboto",
    color:"#fff",
    fontSize:20,
    position:"Relative",
    top:-6

};
const listStyle={
    listStyleImage:'url(' + require('../../images/list_icon.png') + ')',
    marginLeft:60
};
class MainPage extends React.Component{
    render(){
        return(
            <div>
                <SelectBus/>
                <div style={mainPageMiddle}>
                    <div style={rowMain}>
                        <div style={leftAdjustthree}>
                            <img src={require('../../images/left_row_one.png')}  alt="footer"/>
                        </div>
                        <div style={rightAjust}>
                            <i><h5>Top Destination</h5></i>
                            <div style={underline}></div>
                            <ul style={listStyle}>
                                <li>Mumbai To Sagwara</li>
                                <li>Mumbai To Simalwara</li>
                                <li>Mumbai To Dungarpur</li>
                                <li>Mumbai To Banswara</li>
                                <li>Mumbai To Aaspur</li>
                            </ul>
                        </div>
                    </div>
                    <br/><br/><br/><br/>
                    <div style={rowMain}>
                        <div style={{marginLeft:140}} >
                            <i><h5>Latest News</h5></i>
                            <div style={undertwoline}></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, id.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, fugiat?</p>
                        </div>
                        <div style={{marginRight:105}} >
                            <img src={require('../../images/left_row_two.png')}  alt="footer"/>

                        </div>
                    </div>
                    <br/><br/><br/><br/>
                    <div style={rowMain}>
                        <div style={leftAdjust}>
                            <img src={require('../../images/left_row_three.png')}  alt="footer"/>
                        </div>
                        <div style={rightAjust}>
                            <br/><br/>
                            <i><h5>Live Bus Tracking</h5></i>
                            <div style={underline}></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, fuga.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, fuga.</p>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <h5 style={{margin:"auto",textAlign:"center"}}>Why Shree Shiv Ashapura travels?</h5>

                </div>
                <div className="container-fluid" style={{position:"Relative",top:-75}}>
                    <div className="row">
                        <div className="col s12 m12 l4 12">
                            <Paper style={paperStyleService} >
                                <img src={require('../../images/thumb.png')}  alt="logo" style={iconAlign}/> <span style={spanStyle}>Highly Qualified Service</span>
                                <p style={pStyle}>Our high level of service is officially recognised by thousands of clients.</p>
                            </Paper>
                        </div>
                        <div className="col s12 m12 l4 12">
                            <Paper style={paperStyleSupport} >
                                <img src={require('../../images/price.png')}  alt="logo" style={iconAlign}/> <span style={spanStyle}>Highly Qualified Service</span>
                                <p style={pStyle}>Our high level of service is officially recognised by thousands of clients.</p>
                            </Paper>
                        </div>
                        <div className="col s12 m12 l4 12">
                            <Paper style={paperStyleGuarantee} >
                                <img src={require('../../images/care.png')}  alt="logo" style={iconAlign}/> <span style={spanStyle}>Highly Qualified Service</span>
                                <p style={pStyle}>Our high level of service is officially recognised by thousands of clients.</p>
                            </Paper>
                        </div>
                    </div>
                </div>


                <div style={{display:"flex",alignItems:"center",justifyContent:"space-around",backgroundColor:"#2d2d2d"}}>
                    <div style={{width:300,marginBottom:60}}>
                        <p style={{fontFamily:"Roboto",fontWeight:600,fontSize:20,color:"#fff"}}>Contact Us</p>
                        <a className="callIcon sprite"  href="tel:+919172977934">+919172977934</a><br/>
                        <a className="emailIcon sprite" href="mailto:ashapuratravels@gmail.com">ashapuratravels@gmail.com</a><br/>
                        <a className="facebookIcon sprite" href="https://www.facebook.com/shivtravels">www.facebook.com/shivtravels</a>

                    </div>
                    <div style={{backgroundColor:"#fff",width:2,height:70,marginLeft:-270}}></div>
                    <div style={{marginLeft:-170,color:"#fff"}}>
                        @shivashapura Travels Pvt Ltd <br/>
                        All Rights Reserved
                    </div>
                    <div>
                        <span style={{color:"#fff",position:"relative",top: -8, left: -5}}>Project by:</span> <img src={require('../../images/footer/graphysis_logo.png')}  alt="logo" style={{marginTop:5}} />

                    </div>
                </div>
                <div style={{height:10,background: "linear-gradient(-151deg,#63e7b1, #1e80c5 )"}}></div>
            </div>
        )
    }
}

export default MainPage