import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Sleeper from "../Sleeper"
import DoubleSleeper from "../DoubleSleeper"
import DoubleSeats from "../DoubleSeats"
import {Tabs,Tab} from 'material-ui/Tabs'
import {fetchHoldings, fetchSeats} from "../../actions/index";

const containerWidth={
    width:250,
    margin:"auto",
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
};
const tabsStyle={
    //DEFINE YOUR TAB BUTTON STYLE HERE
    backgroundColor:"#2e3192",
};
class Raksha extends React.Component{
    componentDidMount(){
        console.log(this.props.BusLayout.Ref)
        this.props.fetchSeats(this.props.BusLayout.Ref);
        this.props.fetchHoldings(this.props.BusLayout.Ref);
    }

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
                            </div>
                            <div style={TopBusMidTop}>
                                <DoubleSleeper  id={["1","2"]}/>
                                <DoubleSleeper  id={["3","4"]}/>
                                <DoubleSleeper  id={["5","6"]}/>
                                <DoubleSleeper  id={["7","8"]}/>
                                <DoubleSleeper  id={["9","10"]}/>
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
                            </div>
                            <div style={TopBusMid}>
                                <DoubleSleeper  id={["11","12"]}/>
                                <DoubleSleeper  id={["13","14"]}/>
                                <DoubleSleeper  id={["15","16"]}/>
                                <DoubleSeats   id={["S1","S2"]} />
                                <DoubleSeats   id={["S3","S4"]} />
                                <DoubleSeats   id={["S5","S6"]} />
                                <DoubleSeats   id={["S7","S8"]} />
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
        BusLayout:state.sleeper.busLayout
    };
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    const actions={
        fetchSeats:fetchSeats,
        fetchHoldings:fetchHoldings
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(Raksha);

