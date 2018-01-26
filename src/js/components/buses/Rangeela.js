import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Sleeper from "../Sleeper"
import DoubleSleeper from "../DoubleSleeper"
import DoubleSeats from "../DoubleSeats"
import {Tabs,Tab} from 'material-ui/Tabs'
import {sleeperClicked} from "../../actions/index";
const containerWidth={
    width:250,
    margin:"auto",
    height:540

};
const TopBus={
    float :"left",
    marginLeft:"5px",
    marginTop:'5px'
};
const TopBusMid={
    float :"left",
    marginLeft:"100px",
    marginTop:'5px',

};
const TopBusMidTop={
    float :"left",
    marginLeft:"100px",
    marginTop:'5px',
    height:530
};
const BathRoomStyle={
    backgroundColor:"#558B2F",
    padding:"5px"
};

const backSeats ={
    marginTop:"5px",
    display:'inline-block',
};
const backSeatsAlignment={

};
const tabsStyle={
    //DEFINE YOUR TAB BUTTON STYLE HERE
    backgroundColor:"#2e3192",
};
const rotate={
    transform:"rotate(90deg)",
    height:80,
    width:45,
    position:'Relative',
    top:-15,
    left:20
};

const rotateLast={
    transform:"rotate(90deg)",
    height:80,
    width:45,
    position:'Relative',
    top:-50,
    left:20
};

class Rangeela extends React.Component{
    render(){
        return(
            <div>
                <Tabs
                    inkBarStyle={{backgroundColor:"#fff800"}}
                >
                    <Tab label="Top View" value="top" style={tabsStyle}>
                        <div style={containerWidth}>
                            <div style={TopBus}>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="UASSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="UCSSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="UESSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="UGSSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="UISSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="UKSSL"/>
                            </div>
                            <div style={TopBusMidTop}>
                                <DoubleSleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={["U1DSL","U2DSL"]}/>
                                <DoubleSleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={["U3DSL","U4DSL"]}/>
                                <DoubleSleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={["U5DSL","U6DSL"]}/>
                                <DoubleSleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={["U7DSL","U8DSL"]}/>
                                <DoubleSleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={["U9DSL","U10DSL"]}/>
                                <div style={rotate}>
                                    <Sleeper  book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={"U11DSL"}/>
                                </div>
                                <div style={rotateLast}>
                                    <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={"U12DSL"} />
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab label="Bottom View" value="bottom" buttonStyle={tabsStyle}>
                        <div style={containerWidth}>
                            <div style={TopBus}>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="DBSSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="DDSSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="DFSSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="DHSSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="DJSSL"/>
                                <Sleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id="DLSSL"/>
                            </div>
                            <div style={TopBusMid}>
                                <div style={BathRoomStyle}>BathRoom</div>
                                <DoubleSleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={["D13DSL","D14DSL"]}/>
                                <DoubleSleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={["D15DSL","D16DSL"]}/>
                                <DoubleSleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={["D17DSL","D18DSL"]}/>
                                <DoubleSleeper book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} status={this.props.Seats} id={["D19DSL","D20DSL"]}/>
                                <DoubleSeats   book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} Seats={this.props.Seats} id={["D1SST","D2SST"]} />
                                <DoubleSeats   book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} Seats={this.props.Seats} id={["D3SST","D4SST"]} />

                            </div>
                            <div style={backSeatsAlignment}>
                                <div style={backSeats}>
                                    <DoubleSeats book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} Seats={this.props.Seats} id={["D8SST","D7SST"]} />
                                </div>
                                <div style={backSeats}>
                                    <DoubleSeats book={this.props.book} BookingRef={this.props.BusLayout.BookingRef} Seats={this.props.Seats} id={["D5SST","D6SST"]} />
                                </div>
                            </div>

                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}



const mapStateToProps = (state)=> {
    return {
        Seats:state.sleeper.Seats,
        BusLayout:state.sleeper.busLayout
    };
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    const actions={
        book: sleeperClicked
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(Rangeela);

