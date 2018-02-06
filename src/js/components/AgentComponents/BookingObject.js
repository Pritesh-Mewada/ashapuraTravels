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
    display:"flex",
    justifyContent:"space-between",
    margin:"auto",
    alignItems:"flex-end",
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
        var ref = this.props.Ref.substring(0,2)+"/"+this.props.Ref.substring(2);
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
                        <Paper zDepth={2}>
                            <div>
                                <div style={tabsWidth}>
                                    <div>
                                        <h5>{this.state.data.Name}</h5>
                                        <h5>{"Rs: "+this.state.data.Amount}</h5>
                                        <h5>{"PNR"+this.props.Ref}</h5>
                                    </div>
                                    <div>
                                        <h5>{"Seat: "+this.props.No}</h5>
                                        <h5>{"Boarding Point: "+this.state.data.Point}</h5>
                                    </div>
                                    <div>
                                        <h5>{"Mob No."+this.state.data.Number}</h5>
                                        <h5>{"Seat Type:"+this.state.data.Type}</h5>
                                    </div>
                                </div>
                                <div style={{display:"flex",justifyContent:"flex-end"}}>
                                    <RaisedButton primary={true} label="Cancel" onClick={this.handleClick}  />
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

