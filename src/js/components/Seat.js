import React from 'react';
import * as firebase from 'firebase'

const seatStyle={
    backgroundColor:"#33ff99",
    width:"45px",
    height:"45px",
    display:"inline-block",
    marginLeft:"2px",
    marginTop:"2px",
    transition: "all 1s"
};

const seatStyleHover={
    backgroundColor:"#CCC",
    width:"45px",
    height:"45px",
    boxShadow:"2px 2px 5px #2d2d2d",
    display:"inline-block",
    marginLeft:"2px",
    marginTop:"2px",
    transition: "all 1s"
};

const seatStyleHold={
    backgroundColor:"#e6e6e6",
    width:"45px",
    height:"45px",
    display:"inline-block",
    marginLeft:"2px",
    marginTop:"2px",
    transition: "all 1s"
};

const seatStyleSelected={
    backgroundColor:"#3fa9f5",
    width:"45px",
    height:"45px",
    boxShadow:"2px 2px 5px #2d2d2d",
    display:"inline-block",
    marginLeft:"2px",
    marginTop:"2px",
    transition: "all 1s"
};

const seatStyleBook={
    backgroundColor:"#ff6666",
    width:"45px",
    height:"45px",
    boxShadow:"2px 2px 5px #2d2d2d",
    display:"inline-block",
    marginLeft:"2px",
    marginTop:"2px",
    transition: "all 1s"
};
class Seat extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            hover: true,
            isBooked:false
        };
        this.onHover = this.onHover.bind(this);

    }

    componentWillMount(){
        if(this.props.BookingRef){
            var sleeper = firebase.database().ref('Bookings/'+this.props.BookingRef+"/"+this.props.id);
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

    onHover(){
        this.setState({
            hover : !this.state.hover
        });
    }

    render(){
        let style={};
        if(this.state.hover===true){
            style=seatStyle
        }else{
            style=seatStyleHover
        }


        if(this.props.status && this.props.status[this.props.id]  &&  this.props.status[this.props.id].isHold===true){
            style=seatStyleSelected
        }

        if(this.state.isBooked){
            style=seatStyleBook;
            return(
                <div style={style}  onMouseEnter={this.onHover} onMouseLeave={this.onHover} />
            )
        }

        if(this.state.isHold){
            style=seatStyleHold;
            return(
                <div style={style}  onMouseEnter={this.onHover} onMouseLeave={this.onHover} />
            )
        }else{
            return(
                <div style={style} onClick={()=>this.props.book(this.props.id)} onMouseEnter={this.onHover} onMouseLeave={this.onHover} />
            )
        }



    }

}

export default Seat