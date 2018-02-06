import React from 'react';
import SelectSourceDestination from './SelectSourceDestination'

const backgroundStyle = {
    backgroundImage:'url(' + require('../../images/select_bg.png') + '), linear-gradient(45deg, #63e7b1, #1e80c5)' ,
    height:500,
    backgroundSize:"100%",
    backgroundRepeat:"no-repeat",

};

const imageAlign={
    position:"absolute",
    bottom:0,
    left:0,
    backgroundSize:"100%",
    width:"100%",

};

const mystyle={
    display: "flex",
    maxWidth: 1080,
    width: "98%",
    height: 70,
    padding: "4px 25px",
    margin: "auto",
    background: "#75dbd6",
    borderRadius: 18,
    boxShadow:"0px 15px 50px rgba(0,0,0,0.4)",
    justifyContent: "space-around",
    alignItems: "flex-end",
    zIndex:1,
    position: "relative",
};
class SelectBus extends React.Component{

    render(){
        return(
            <div className="search_bus_section" style={backgroundStyle}>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <SelectSourceDestination mystyle={mystyle}/>
                <img src={require('../../images/select_bottom.png')}  alt="logo" style={imageAlign}/>

                <div className="box_bus">
                    <img src={require('../../images/bus.png')} alt="Shiv Ashapura Travels"/>
                </div>
                <div className="hill-content">
                    <div className="hill1"></div><div className="hill2"></div>
                </div>
                <span className="tree1"></span><span className="tree2"></span>

            </div>
        )
    }


}



export default SelectBus;

