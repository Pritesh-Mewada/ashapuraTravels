import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Rangeela from './Rangeela'
import Raksha from './Raksha'
import Hemani from './Hemani'
import Paper from 'material-ui/Paper';
class SelectLayout extends React.Component{
    constructor(props){
        super(props)
    }

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
                    <Hemani/>
                );
            case "rakshatype1" :
                return(
                    <Raksha/>
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






