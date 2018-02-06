import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

const ticket={
    backgroundImage:'url(' + require('../../images/ticket.png') + ')' ,
    width:400,
    height:460,
    justifyContent:"center",
    backgroundRepeat:'no-repeat'
};
const ticketHead={
    display:"flex",
    flexDirection:"Row",
    marginLeft:30,
    paddingTop:50,
    alignItems:"flex-start"
};
const textHeadings={
    fontWeight:600,
    fontSize:16,
    color:"#2d2d2d",
};
const imageService={
    width:25,
    height:25,
    marginRight:10,
    marginTop:0

};
class Ticket extends React.Component{

    render(){
        return(
            <div style={ticket}>
                <div style={ticketHead}>
                    <div>
                        <img src={require("../../images/bus_ticket.png")} alt="busLogo" width="50" height="50"/>
                    </div>
                    <div style={{marginLeft:5}}>
                        <div style={{fontFamily:"monospace",fontWeight:500,fontSize:18}}>{this.props.Layout.Name+" Travels"}</div>
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
                                <img src={require("../../images/arrival.png")} alt="busLogo" width="16" height="16"/>
                                <span style={textHeadings}>{this.props.Route.from}</span>
                            </div>
                            <br/>
                            <div>
                                <div style={textHeadings}>Departure Time</div>
                                <div>
                                    <span style={textHeadings}>{this.props.Layout.Departure}</span>
                                </div>
                            </div>

                        </div>
                        <div style={{marginLeft:10,width:180}}>
                            <div style={textHeadings}>To</div>
                            <div>
                                <img src={require("../../images/departure.png")} alt="busLogo" width="16" height="16"/>
                                <span style={textHeadings}> {this.props.Route.to}</span>
                            </div>
                            <br/>
                            <div>
                                <div style={textHeadings}>Arrival Time</div>
                                <div>
                                    <span style={textHeadings}>{this.props.Layout.Arrival}</span>
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
                                <span style={textHeadings}>{this.props.bucket.busLayout.Point}</span>
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
                            <div style={textHeadings}>{this.props.bucket.userBucket.toString()}</div>
                            <br/>
                            <div style={textHeadings}>{this.props.bucket.total}</div>
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

