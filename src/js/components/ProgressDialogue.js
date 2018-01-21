import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Dialog from 'material-ui/Dialog';


class ProgressDialogue extends  React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Dialog
                    modal={false}
                    open={this.props.DialogParams.status}
                    onRequestClose={this.props.handleClose}
                >
                    <CircularProgress size={60} thickness={5}/>
                    <span style={{marginLeft:10,position:'Relative',top:-15,fontSize:22}}>{this.props.DialogParams.statement}</span>
                </Dialog>
            </div>
        )
    }

}

const mapStateToProps = (state)=> {
    return {
        DialogParams:state.ProgressDialogue
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
export default connect(mapStateToProps, matchDispatchToProps)(ProgressDialogue);


