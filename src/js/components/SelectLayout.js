import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Rangeela from './buses/Rangeela'
import Raksha from './buses/Raksha'
import Hemani from './buses/Hemani'
import Paper from 'material-ui/Paper';
class SelectLayout extends React.Component{

    render(){
        switch (this.props.busLayout.LayoutName){
            case "rangeelatype1" :
                return(
                    <Paper zDepth={2}>
                        <Rangeela/>
                    </Paper>

                );
            case "hemanitype1" :
                return(
                    <Paper zDepth={2}>
                        <Hemani/>
                    </Paper>

                );
            case "rakshatype1" :
                return(
                    <Paper zDepth={2}>
                        <Raksha/>
                    </Paper>
                );
            default:
                <h1>Please Select a bus</h1>
        }



    }
}

function matchDispatchToProps(dispatch){
    const actions={
    };
    return bindActionCreators(actions, dispatch);
}
const mapStateToProps = (state)=> {
    return {
        busLayout:state.sleeper.busLayout

    };
};


export default connect(mapStateToProps, matchDispatchToProps)(SelectLayout);






