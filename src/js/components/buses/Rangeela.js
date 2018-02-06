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
                                <Sleeper  id="A"/>
                                <Sleeper  id="C"/>
                                <Sleeper  id="E"/>
                                <Sleeper  id="G"/>
                                <Sleeper  id="I"/>
                                <Sleeper  id="K"/>
                            </div>
                            <div style={TopBusMidTop}>
                                <DoubleSleeper  id={["1","2"]}/>
                                <DoubleSleeper  id={["3","4"]}/>
                                <DoubleSleeper  id={["5","6"]}/>
                                <DoubleSleeper  id={["7","8"]}/>
                                <DoubleSleeper  id={["9","10"]}/>
                                <div style={rotate}>
                                    <Sleeper   id={"11"}/>
                                </div>
                                <div style={rotateLast}>
                                    <Sleeper  id={"12"} />
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab label="Bottom View" value="bottom" buttonStyle={tabsStyle}>
                        <div style={containerWidth}>
                            <div style={TopBus}>
                                <Sleeper  id="B"/>
                                <Sleeper  id="D"/>
                                <Sleeper  id="F"/>
                                <Sleeper  id="H"/>
                                <Sleeper  id="J"/>
                                <Sleeper  id="L"/>
                            </div>
                            <div style={TopBusMid}>
                                <div style={BathRoomStyle}>BathRoom</div>
                                <DoubleSleeper  id={["13","14"]}/>
                                <DoubleSleeper  id={["15","16"]}/>
                                <DoubleSleeper  id={["17","18"]}/>
                                <DoubleSleeper  id={["19","20"]}/>
                                <DoubleSeats   id={["S1","S2"]} />
                                <DoubleSeats   id={["S3","S4"]} />

                            </div>
                            <div style={backSeatsAlignment}>
                                <div style={backSeats}>
                                    <DoubleSeats id={["S5","S6"]} />
                                </div>
                                <div style={backSeats}>
                                    <DoubleSeats id={["S8","S7"]} />
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

