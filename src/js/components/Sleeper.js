import React from 'react';
import * as firebase from 'firebase'

const sleepStyle={
    backgroundColor:"#33ff99",
    width:"45px",
    height:"80px",
    marginTop:"4px",
    transition: "all 1s"
};


const sleepStyleHover={
    backgroundColor:"#CCC",
    width:"45px",
    height:"80px",
    boxShadow:"2px 2px 10px #2d2d2d",
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
            style=sleepStyle
        }else{
            style=sleepStyleHover
        }

        if(this.props.status && this.props.status[this.props.id]  &&  this.props.status[this.props.id].isHold===true){
            style=sleepStyleSelected
        }

        if(this.state.isBooked){
            style=sleepStyleBooked;
            return(

                <div style={style}  onMouseEnter={this.onHover} onMouseLeave={this.onHover} >
                    <div style={pillow}></div>
                </div>
            )
        }

        if(this.state.isHold){
            style=sleepStyleHold;
            return(

                <div style={style}  onMouseEnter={this.onHover} onMouseLeave={this.onHover} >
                    <div style={pillow}></div>
                </div>
            )
        }else{
            return(
                <div style={style} onClick={()=>this.props.book(this.props.id)} onMouseEnter={this.onHover} onMouseLeave={this.onHover} >
                    <div style={pillow}></div>
                </div>
            )

        }



    }
}

export default Sleeper

