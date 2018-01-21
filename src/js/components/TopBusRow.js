import React from 'react'
import Sleeper from "./Sleeper";
import DoubleSleeper from './DoubleSleeper'
const containerWidth={
    width:"200px"

};
const TopBus={
    float :"left",
    marginLeft:"5px",
    marginTop:'5px'
};
const TopBusMid={
    float :"left",
    marginLeft:"50px",
    marginTop:'5px'
};

class TopBusRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={containerWidth}>
                <div style={TopBus}>
                    <Sleeper book={this.props.book} />
                </div>
                <div style={TopBusMid}>
                    <DoubleSleeper/>
                </div>
            </div>


        )
    }
}

export default TopBusRow