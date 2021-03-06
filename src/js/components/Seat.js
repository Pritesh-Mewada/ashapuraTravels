import React from 'react';
import * as firebase from 'firebase'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {handleOpenDialog, sleeperClicked} from '../actions/index'
const seatStyle={
    backgroundColor:"#33ff99",
    width:"45px",
    height:"45px",
    display:"inline-block",
    marginLeft:"2px",
    marginTop:"2px",
    transition: "all 0.3s",
    position:"Relative"
};

const seatStyleHold={
    backgroundColor:"#e6e6e6",
    width:"45px",
    height:"45px",
    display:"inline-block",
    marginLeft:"2px",
    marginTop:"2px",
    transition: "all 0.3s",

};

const seatStyleSelected={
    backgroundColor:"#3fa9f5",
    width:"45px",
    height:"45px",
    boxShadow:"0px 2px 5px #2d2d2d",
    display:"inline-block",
    marginLeft:"2px",
    position:"Relative",
    marginTop:"2px",
    transition: "all 1s",

};

const seatStyleBook={
    backgroundColor:"#ff6666",
    width:"45px",
    height:"45px",
    boxShadow:"2px 2px 5px #2d2d2d",
    display:"inline-block",
    marginLeft:"2px",
    marginTop:"2px",
    transition: "all 0.3s",

};
const seatHover={
    position:"absolute",
    bottom:50,
    width:130,
    left:-30,
    padding:2,
    height:75,
    borderRadius:4,
    backgroundColor:"#fff",
    boxShadow:"rgba(45, 45, 45,0.5) 0px 0px 15px 2px"
};
class Seat extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            hover: true,
            isBooked:false,
            select:false
        };
        // this.onHover = this.onHover.bind(this);

    }

    // componentWillMount(){
    //     if(this.props.seat.busLayout){
    //         var sleeper = firebase.database().ref('Bookings/'+this.props.seat.busLayout.Ref+"/"+this.props.id);
    //         sleeper.on('value',(data)=>{
    //             if(data.val() !=null){
    //                 var getdate = new Date(data.val().isHold);
    //                 var diff= Math.ceil(((new Date()).getTime()-getdate.getTime())/60000);
    //                 if(data.val().isBooked && data.val().isBooked===true){
    //                     this.setState({
    //                         isBooked:true
    //                     })
    //                 }
    //
    //                 if(diff<15){
    //                     this.setState({
    //                         isHold:true
    //                     })
    //                 }else{
    //                     this.setState({
    //                         isHold:false
    //                     })
    //                 }
    //             }else{
    //                 this.setState({
    //                     isHold:false,
    //                     isBooked:false
    //                 })
    //             }
    //         });
    //     }
    //
    // }

    BookSeat=(id,seat)=>{
        if(this.props.seat.userBucket.length>=4 && !(this.props.seat.Seats[this.props.id]  &&  this.props.seat.Seats[this.props.id].isHold===true)){
            this.props.Dialog("Can Book 4 seats at a time");
        }else{
            this.props.bookSeat(id,seat)
        }
    };

    render(){
        let style={};



        if(this.props.seat.Seats[this.props.id]  &&  this.props.seat.Seats[this.props.id].isHold===true){
            style=seatStyleSelected
        }else{
            style=seatStyle;
        }

        if(this.props.seat.Bookings && this.props.seat.Bookings[this.props.id]  &&  this.props.seat.Bookings[this.props.id].isBooked===true){
            return(
                <div style={seatStyleBook}   />
            )
        }

        if(this.props.seat.Holdings && this.props.seat.Holdings[this.props.id]  &&  this.props.seat.Holdings[this.props.id].isHold===true){
            return(
                <div style={seatStyleHold} />
            )
        }else {

            return (
                <div style={style} onClick={() => this.BookSeat(this.props.id,"ST")}>
                    {
                        this.props.seat.latest && this.props.seat.latest == this.props.id ?
                        <div style={seatHover}>
                            Seat no:{this.props.id}<br/>
                            Seat type:Chair <br/>
                            Price:{this.props.seat.busLayout.Price.ST}
                        </div>:null
                    }
                </div>
            );

        }



    }

}

function matchDispatchToProps(dispatch){
    const actions={
        bookSeat:sleeperClicked,
        Dialog:handleOpenDialog
    };
    return bindActionCreators(actions, dispatch);
}
const mapStateToProps = (state)=> {
    return {
        seat:state.sleeper
    };
};


export default connect(mapStateToProps, matchDispatchToProps)(Seat);
