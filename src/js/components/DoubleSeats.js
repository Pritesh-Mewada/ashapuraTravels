import React from 'react'
import Seat from './Seat'
const containerWidth={
    width:"100px",
    height:"45px",
    marginTop:"4px",
};
class DoubleSeats extends React.Component{
    render(){
        return(
            <div style={containerWidth}>
                <Seat id={this.props.id[0]}/>
                <Seat id={this.props.id[1]}/>
            </div>


        )
    }
}

export default DoubleSeats