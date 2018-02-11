import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {OpenProgessDialog, CloseProgressDialog, handleOpenDialog, GetSeats} from "../../actions/index";
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField';
import * as firebase from 'firebase';
import BookingObject from "./BookingObject";

const tabsWidth={
    width:"80%",
    display:"flex",
    justifyContent:"space-between",
    margin:"auto",
    alignItems:"flex-end",
};

class SeatView extends React.Component {
    constructor(){
        super();
        this.state={
            Bus:null,
            open:false,
            Date:null,
            Status:"Please Select a Bus",
        }
    }


    handleOpen = (PNR) => {
        this.setState({
            open: true,
            PNR:PNR
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleDate= (def,date)=>{
        this.setState({
            Date :date,
            FormatDate:date.toDateString()
        });
    };
    formatDate=(date)=>{
        return date.toDateString();
    };
    handleFromSelect=(event,index,value)=>{
        this.setState({
            Bus:value
        });
    };


    GetSeats=()=>{
        var ref = this.props.buses[this.props.BusName[this.state.Bus]].BookingRef+this.state.FormatDate;
        this.props.getSeats(ref);
    };

    removeSeat=()=>{
        var ref = this.state.FormatDate+"/"+this.state.PNR.substring(0,2)+"/"+this.state.PNR.substring(2);
        var seat = this.props.seat.Ref+"/"+this.props.seat.Seats;
        var Bookings = firebase.database().ref("PNRS/"+ref);

        this.handleClose();
        this.props.openProgressDialog("Cancelling the ticket please wait");
        return Bookings.set({
            isCancel:true,
            Reason:"Your Ticket is cancelled",
            Date:(new Date().toDateString())
        }).then(()=>{
            var cancel = firebase.database().ref("Bookings/"+seat);
            this.props.openProgressDialog("Removing the booking ");

            return cancel.set(null)
        }).then(()=>{
            this.props.closeProgressDialog();
            this.props.handleOpenDialog("Ticket cancelled Successfully please refresh");
        }).catch((error)=>{
            this.props.handleOpenDialog("Error occured \n Please refresh or Report with screenshot"+JSON.stringify(error));
        })

    };

    render(){

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onClick={this.removeSeat}
            />,
        ];
            return(
                <div>
                    <div style={tabsWidth}>

                        <SelectField  floatingLabelText="Please Select a Bus"
                                      value={this.state.Bus}
                                      onChange={this.handleFromSelect}

                        >
                            {
                                this.props.BusName.map((place, index) => (
                                    <MenuItem value={index} key={index} primaryText={place}/>
                                ))
                            }
                        </SelectField>
                        <DatePicker hintText="Select Date" onChange={this.handleDate} formatDate={this.formatDate} />

                        <RaisedButton primary={true} label="View Seats" onClick={this.GetSeats} />
                    </div>
                    <br/>
                    {
                        this.props.Seats != null ?
                            this.props.Seats.map((seat, index) => {
                                return (
                                    <BookingObject No={seat.No}  Ref={seat.PNR} date={this.state.FormatDate} book={seat.BookedBy} key={index} open={()=>this.handleOpen(seat.PNR)}/>
                                )

                            }) :  <h5>{this.state.Status}</h5>
                    }
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Sure You want to cancel this ticket ?
                    </Dialog>

                </div>
            )
    }
}


const mapStateToProps = (state)=> {
    return {
        buses:state.Agent.Buses,
        BusName:state.Agent.BusName,
        seat:state.Agent.seat,
        Seats:state.Agent.Seats
    };
};
function matchDispatchToProps(dispatch){
    const actions={
        openProgressDialog:OpenProgessDialog,
        closeProgressDialog:CloseProgressDialog,
        handleOpenDialog:handleOpenDialog,
        getSeats:GetSeats
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(SeatView);

