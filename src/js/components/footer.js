import React from 'react'

class Footer extends React.Component{
    render(){
        return(
            <div style={{width:"100%"}}>
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

export default Footer