import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import DynamicPricing from './DynamicPricing'
import SelectSourceAndDestination from './SelectSourceAndDestination'
import  SelectBusLayout from './SelectBusLayout'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {
    handleOpenDialog, fetchBuses, BookSlot, BlockBus, CancelBlock, CancelBlockDate,
    NavigateTo
} from "../../actions/index";
import SeatView from './SeatView'
import * as firebase from 'firebase'
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;


const mystyle={
    display: "flex",
    maxWidth: 1080,
    width: "98%",
    height: 70,
    padding: "4px 25px",
    margin: "auto",
    background: "#75dbd6",
    borderRadius: 18,
    boxShadow:"0px 15px 50px rgba(0,0,0,0.4)",
    justifyContent: "space-around",
    alignItems: "flex-end",
    zIndex:1,
    position: "relative",
};

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
const bottomStick={
    position: "fixed",
    bottom: 0,
    width:"100%"
};
class AgentTabs extends Component {
    state = {
        selectedIndex: 0,
        open: false
    };

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user)=>{
           if(user){
               console.log(user.email);
           }else{
               this.props.Navigate("/");
           }

        });
        this.props.fetchBus();
    }



    select = (index) => this.setState({selectedIndex: index});

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return(
                    <div>
                        <br/>
                        <SelectSourceAndDestination mystyle={mystyle}/>
                        <br/>
                        <br/>
                        <SelectBusLayout/>
                    </div>

                );

            case 1:
                return(
                    <div>
                        <DynamicPricing/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <SeatView/>
                    </div>
                );

            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
    render() {
        return (
            <div >
                <div  style={{width:"80%",margin:"auto"}}>{this.getStepContent(this.state.selectedIndex)}</div>
                <Paper zDepth={3} style={bottomStick}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Recents"
                            icon={recentsIcon}
                            onClick={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="Favorites"
                            icon={favoritesIcon}
                            onClick={() => this.select(1)}
                        />
                        <BottomNavigationItem
                            label="Nearby"
                            icon={nearbyIcon}
                            onClick={() => this.select(2)}
                        />
                    </BottomNavigation>
                </Paper>
            </div>

        );
    }
}
const mapStateToProps = (state)=> {
    return {
        buses:state.Agent.Buses,
        BusName:state.Agent.BusName
    };
};
function matchDispatchToProps(dispatch){
    const actions={
        Dialog:handleOpenDialog,
        fetchBus:fetchBuses,
        book:BookSlot,
        block:BlockBus,
        cancel:CancelBlock,
        cancelBlock:CancelBlockDate,
        Navigate:NavigateTo
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(AgentTabs);

