import React from 'react'
import Sleeper from "./Sleeper";
import DoubleSleeper from "./DoubleSleeper"
import DoubleSeats from "./DoubleSeats";
const containerWidth={
    width:"250px"

};
const TopBus={
    float :"left",
    marginLeft:"5px",
    marginTop:'12px'
};
const TopBusMid={
    float :"left",
    marginLeft:"100px",
    marginTop:'5px'
};
const BathRoomStyle={
    backgroundColor:"#558B2F",
    padding:"5px"
};

const backSeats ={
    height:"50px",
    width:"200px",
    float:"left",
    marginTop:"5px"
};
const seatStyle={
    backgroundColor:"#ffff00",
    width:"45px",
    height:"45px",
    borderRadius:"8px",
    boxShadow:"2px 2px 5px #2d2d2d",
    float:"left",
    marginLeft:"5px",
};

class BottomLayoutRangeela extends React.Component{
    render(){
        return(
            <div style={containerWidth}>
                <div style={TopBus}>
                    <Sleeper/>
                    <Sleeper/>
                    <Sleeper/>
                    <Sleeper/>
                    <Sleeper/>
                    <Sleeper/>
                </div>
                <div style={TopBusMid}>
                    <div style={BathRoomStyle}>BathRoom</div>
                    <DoubleSleeper/>
                    <DoubleSleeper/>
                    <DoubleSleeper/>
                    <DoubleSleeper/>
                    <DoubleSeats/>
                    <DoubleSeats/>
                </div>
                <div style={backSeats}>
                    <div style={seatStyle}></div>
                    <div style={seatStyle}></div>
                    <div style={seatStyle}></div>
                    <div style={seatStyle}></div>
                </div>
            </div>



        )
    }
}

export default BottomLayoutRangeela