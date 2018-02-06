import React from 'react';
import * as firebase from 'firebase'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {sleeperClicked} from '../actions/index'

const sleepStyle={
    backgroundColor:"#33ff99",
    width:"45px",
    height:"80px",
    marginTop:"4px",
    transition: "all 1s"
};

const sleepStyleSelected={
    backgroundColor:"#3fa9f5",
    width:"45px",
    height:"80px",
    boxShadow:"2px 2px 10px #2d2d2d",
    marginTop:"4px",
    transition: "all 1s"
};

const sleepStyleHold={
    backgroundColor:"#e6e6e6",
    width:"45px",
    height:"80px",
    marginTop:"4px",
    transition: "all 1s"
};

const sleepStyleBooked={
    backgroundColor:"#FF6666",
    width:"45px",
    height:"80px",
    marginTop:"4px",
    transition: "all 1s"
};
const pillow={
    width:"25px",
    height:"10px",
    borderRadius:"8px",
    boxShadow:"0px 2px 5px #2d2d2d",
    margin:"auto"
};
class Sleeper extends  React.Component{

    constructor(props){
        super(props);
        this.state = {
            hover: false,
            isBooked:false
        };

    }

    componentWillMount(){
        if(this.props.seat.busLayout){
            var sleeper = firebase.database().ref('Bookings/'+this.props.seat.busLayout.Ref+"/"+this.props.id);
            sleeper.on('value',(data)=>{
                if(data.val() !=null){
                    var getdate = new Date(data.val().isHold);
                    var diff= Math.ceil(((new Date()).getTime()-getdate.getTime())/60000);

                    if(data.val().isBooked && data.val().isBooked===true){
                        this.setState({
                            isBooked:true
                        })
                    }

                    if(diff<15){
                        this.setState({
                            isHold:true
                        })
                    }else{
                        this.setState({
                            isHold:false
                        })
                    }

                }else{
                    this.setState({
                        isHold:false,
                        isBooked:false
                    })
                }
            });
        }

    }

    render(){
        let style={};

        if(this.props.seat.Seats[this.props.id]  &&  this.props.seat.Seats[this.props.id].isHold===true){
            style=sleepStyleSelected
        }else{
            style=sleepStyle;
        }

        if(this.state.isBooked){
            return(
                <div style={sleepStyleBooked}  >
                    <div style={pillow}></div>
                </div>
            )
        }

        if(this.state.isHold){
            return(
                <div style={sleepStyleHold}  >
                    <div style={pillow}></div>
                </div>
            )
        }else {
            return (
                <div style={style} onClick={() => this.props.bookSeat(this.props.id,"SL")}>
                    <div style={pillow}></div>
                </div>
            );

        }



    }
}
function matchDispatchToProps(dispatch){
    const actions={
        bookSeat:sleeperClicked
    };
    return bindActionCreators(actions, dispatch);
}
const mapStateToProps = (state)=> {
    return {
        seat:state.sleeper,
    };
};


export default connect(mapStateToProps, matchDispatchToProps)(Sleeper);

