import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {handleCloseDialog} from "../actions/index";

class AlertDialogue extends  React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Dialog
                    actions={[
                        <FlatButton
                            label="OK"
                            primary={true}
                            onClick={this.props.handleClose}
                        />,
                    ]}
                    modal={false}
                    open={this.props.DialogParams.status}
                    onRequestClose={this.props.handleClose}
                >
                    {this.props.DialogParams.statement}
                </Dialog>
            </div>
        )
    }

}

const mapStateToProps = (state)=> {
    return {
        DialogParams:state.Dialog
    };
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    const actions={
        handleClose:handleCloseDialog
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(AlertDialogue);

