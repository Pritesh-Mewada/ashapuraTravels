import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Rangeela from './buses/Rangeela'
import Raksha from './buses/Raksha'
import Hemani from './buses/Hemani'
import Paper from 'material-ui/Paper';
class SelectLayout extends React.Component{
    render(){
        if(this.props.busLayout){
            switch (this.props.busLayout.Layout){
                case "rangeelatype1" :
                    return(
                        <div>
                            <img src={require("../../images/busSeat.png")} alt="busLogo" width="350" height="18"/>
                            <Paper zDepth={2}>
                                <Rangeela/>
                            </Paper>
                        </div>


                    );
                case "hemanitype1" :
                    return(
                        <div>
                            <img src={require("../../images/busSeat.png")} alt="busLogo" width="350" height="18"/>
                            <Paper zDepth={2}>
                                <Hemani/>
                            </Paper>
                        </div>


                    );
                case "rakshatype1" :
                    return(
                        <div>
                            <img src={require("../../images/busSeat.png")} alt="busLogo" width="350" height="18"/>
                            <Paper zDepth={2}>
                                <Raksha/>
                            </Paper>
                        </div>

                    );
                default:
                    <h1>Please Select a bus</h1>
            }
        }else{
            return(
                <h1>Please Select a bus</h1>
            )

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






