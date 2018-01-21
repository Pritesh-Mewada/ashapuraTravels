import React from 'react'
import Sleeper from "./Sleeper";

const containerWidthDoubleSleeper={
    width:"100px",
    height:"80px",
    marginTop:"4px"
};

const sleeper={
    float:"left",
    marginLeft:"2px",
};

class DoubleSleeper extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={containerWidthDoubleSleeper}>
                <div style={sleeper}>
                    <Sleeper book={this.props.book} BookingRef={this.props.BookingRef} status={this.props.status} id={this.props.id[0]}  />
                </div>
                <div style={sleeper}>
                    <Sleeper book={this.props.book} BookingRef={this.props.BookingRef} status={this.props.status} id={this.props.id[1]} />
                </div>
            </div>


        )
    }
}

export default DoubleSleeper;

