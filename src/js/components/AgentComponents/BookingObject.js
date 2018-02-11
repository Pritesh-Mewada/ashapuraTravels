import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {StoreSeat} from "../../actions/index";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import * as firebase from 'firebase';


const tabsWidth={
    width:"80%",
    display:"inline-flex"
};


const textStyle={
    fontSize:18
};

const divStyle3={
    marginLeft:90,
    marginTop:35
};
const divStyle2={
    marginLeft:90,
    marginTop:35
};
const divStyle1={
    marginLeft:20,
    marginTop:10
};
class BookingObject extends  React.Component {

    constructor(){
        super();
        this.state={
            data:null,
            open: false,

        }
    }
    componentWillMount(){
        var ref = this.props.date+"/"+this.props.Ref.substring(0,2)+"/"+this.props.Ref.substring(2);
        var Bookings = firebase.database().ref("PNRS/"+ref);
        Bookings.once('value').then((snap)=>{
            this.setState({
                data:snap.val()
            });
        });
    }

    handleClick=()=>{
        this.props.store(this.state.data);
        this.props.open();
    };
    render(){


        return(
            <div>
                {
                    this.state.data !=null ?
                        <Paper zDepth={2} style={{marginBottom:5}}>
                            <div>
                                <div style={tabsWidth}>
                                    <div style={divStyle1}>
                                        <span style={textStyle}><b>{this.state.data.Name}</b></span><br/>
                                        <span style={textStyle}>Rs: <b>{this.state.data.Amount}</b></span><br/>
                                        <span style={textStyle}>PNR: <b>{this.props.Ref}</b></span><br/><br/>
                                    </div>
                                    <div style={divStyle2}>
                                        <span style={textStyle}>Seat: <b>{this.props.No}</b></span><br/>
                                        <span style={textStyle}>Boarding Point: <b>{this.state.data.Point}</b></span><br/>
                                    </div>
                                    <div style={divStyle3}>
                                        <span style={textStyle}>Mob No: <b>{this.state.data.Number}</b></span><br/>
                                        <span style={textStyle}>Booked by: <b></b></span><br/>
                                    </div>
                                </div>
                                <div style={{float:"right",position: "relative",top: 40,right: 25}}>
                                    <RaisedButton primary={true} label="Cancel" onClick={this.handleClick} />
                                </div>
                            </div>
                        </Paper> :null
                }

            </div>


        )
    }
}
const mapStateToProps = (state)=> {
    return {
    };
};
function matchDispatchToProps(dispatch){
    const actions={
        store:StoreSeat
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(BookingObject);

