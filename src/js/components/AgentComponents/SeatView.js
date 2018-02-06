import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {OpenProgessDialog,CloseProgressDialog,handleOpenDialog} from "../../actions/index";
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

        this.setState({
            Status:""
        });
        var ref = this.props.buses[this.props.BusName[this.state.Bus]].BookingRef+this.state.FormatDate;
        var Bookings = firebase.database().ref("Bookings/"+ref);

        Bookings.on('value',(snap)=>{
            var Seats =[];
            if(snap.val()!=null){
                var seatData ={};
                var seats = snap.val();

                for(var seat in seats){
                    seatData = seats[seat];
                    seatData["No"] = seat
                    Seats.push(seatData);
                }

                this.setState({
                    Seats:Seats
                })
            }else{
                this.setState({
                    Status :"No Bookings are available"
                })
            }

        });
    };

    removeSeat=()=>{
        var ref = this.state.PNR.substring(0,2)+"/"+this.state.PNR.substring(2);
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
                    {
                        this.state.Seats != null ?
                            this.state.Seats.map((seat, index) => {
                                return (
                                    <BookingObject No={seat.No} Ref={seat.PNR} key={index} open={()=>this.handleOpen(seat.PNR)}/>
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
        seat:state.Agent.seat
    };
};
function matchDispatchToProps(dispatch){
    const actions={
        openProgressDialog:OpenProgessDialog,
        closeProgressDialog:CloseProgressDialog,
        handleOpenDialog:handleOpenDialog
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(SeatView);

