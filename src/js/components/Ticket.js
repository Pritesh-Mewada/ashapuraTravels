import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

const ticket={
    backgroundImage:'url(' + require('../../images/ticket.png') + ')' ,
    width:400,
    height:500,
    margin:"auto",
    backgroundSize:"100%",
    justifyContent:"center",
    backgroundRepeat:'no-repeat'
};
const ticketHead={
    display:"flex",
    flexDirection:"Row",
    marginLeft:30,
    paddingTop:60,
    alignItems:"flex-start"
};
const textHeadings={
    fontWeight:400,
    fontSize:16,
    color:"#2d2d2d",
};
const textInput={
    fontWeight:600,
    fontSize:16,
    color:"#2d2d2d",
};
const imageService={
    width:20,
    height:18,
    marginRight:10,
    position:"Relative",
    top:-11,
    left:8

};
class Ticket extends React.Component{

    render(){
        return(
            <div style={ticket}>
                <div style={ticketHead}>
                    <div>
                        <img src={require("../../images/icons/bus.png")} alt="busLogo" width="40" height="40"/>

                    </div>
                    <div style={{marginLeft:5}}>
                        <div style={{fontFamily:"Roboto",fontWeight:500,fontSize:18,marginLeft:8,position:"relative",top:-5}}>{this.props.Layout.Name+" Travels"}</div>
                        <div className="Services">
                            {
                                this.props.Layout.Services.map((link,index)=>(
                                    <img src={link} key={index} alt="Services" style={imageService}/>

                                ))
                            }
                        </div>
                    </div>
                </div>

                <div style={{marginTop:10,marginLeft:40}}>
                    <div style={{display:"flex",flexDirection:"Row"}}>
                        <div style={{width:180}}>
                            <div style={textHeadings}>From</div>
                            <div>
                                <img src={require("../../images/icons/departure.png")} alt="busLogo" width="16" height="16"/>
                                <span style={textInput}>{" "+this.props.Route.from.toString()}</span>
                            </div>
                            <br/>
                            <div>
                                <div style={textHeadings}>Departure Time</div>
                                <div>
                                    <img src={require("../../images/icons/Time.png")} alt="busLogo" width="16" height="16"/>
                                    <span style={textInput}>{" "+this.props.Layout.Departure.toString()}</span>
                                </div>
                            </div>

                        </div>
                        <div style={{marginLeft:10,width:180}}>
                            <div style={textHeadings}>To</div>
                            <div>
                                <img src={require("../../images/icons/arrival.png")} alt="busLogo" width="16" height="16"/>
                                <span style={textInput}> {" "+this.props.Route.to.toString()}</span>
                            </div>
                            <br/>
                            <div>
                                <div style={textHeadings}>Arrival Time</div>
                                <div>
                                    <img src={require("../../images/icons/Time.png")} alt="busLogo" width="16" height="16"/>
                                    <span style={textInput}>{" "+this.props.Layout.Arrival.toString()}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <div style={{marginLeft:40}}>
                        <div style={{marginTop:10}}>
                            <div style={textHeadings}>Boarding Point</div>
                            <div>
                                <img src={require("../../images/icons/location.png")} alt="busLogo" width="16" height="16"/>
                                <span style={textInput}>{this.props.bucket.busLayout.Point && " "+this.props.bucket.busLayout.Point.toString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:10,marginLeft:40}}>
                    <div style={{display:"flex",flexDirection:"Row"}}>
                        <div style={{width:180}}>
                            <div style={textHeadings}>Seat No:</div>
                            <br/>
                            <div style={textHeadings}>Total Amount:</div>
                        </div>
                        <div style={{marginLeft:10,width:180}}>
                            <div style={textInput}>{this.props.bucket.userBucket.join()}</div>
                            <br/>
                            <div style={textInput}>{this.props.bucket.total.toString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        Route:state.sleeper.Route,
        bucket:state.sleeper,
        Layout:state.sleeper.busLayout
    };
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    const actions={
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(Ticket);

