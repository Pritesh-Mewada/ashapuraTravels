import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import SelectBusBooking from '../SelectBusBooking'
import ShowBusesAndLayout from '../ShowBusesAndLayout'
import DynamicPricing from './DynamicPricing'


const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

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
    };
    select = (index) => this.setState({selectedIndex: index});

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return(
                    <div>
                        <DynamicPricing/>

                    </div>

                );

            case 1:
                return(
                    <div>
                        <SelectBusBooking/>
                        <ShowBusesAndLayout/>

                    </div>
                );
            case 2:
                return (
                    <span></span>
                );

            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
    render() {
        return (
            <div>
                <div>{this.getStepContent(this.state.selectedIndex)}</div>
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
export default AgentTabs