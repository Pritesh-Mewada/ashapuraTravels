import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import {handleOpenDialog,AgentLogin} from "../../actions/index";

const container ={
    width:"80%",
    margin:"auto"
};

class LoginAgent extends  React.Component{
    constructor(props){
        super(props);
        this.handleLogin=this.handleLogin.bind(this);
        this.proceedLogin=this.proceedLogin.bind(this);
        this.handlePassword=this.handlePassword.bind(this);
        this.state={
            login:"",
            password:""
        }
    }
    handleLogin(e,id){
        this.setState({
            login:id
        })
    }
    handlePassword(e,pass){
        this.setState({
            password:pass
        })
    }
    proceedLogin(){
        if(this.state.login==="" || this.state.password===""){
            this.props.Dialog("Fill all the fields")
        }
        this.props.Login(this.state.login,this.state.password);
        console.log(this.state);
    }

    render(){
        return (
            <div style={container}>
                <TextField
                    hintText="Login Id"
                    floatingLabelText="Agent"
                    type="text"
                    fullWidth={true}
                    floatingLabelStyle={{fontSize:18}}
                    onChange={this.handleLogin}
                />
                <br/>
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    fullWidth={true}
                    floatingLabelStyle={{fontSize:18}}
                    onChange={this.handlePassword}
                />
                <br/>
                <RaisedButton primary={true} fullWidth={true} onClick={this.proceedLogin} label="Login"/>
            </div>
        )
    }

}

const mapStateToProps = (state)=> {
    return {

    };
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    const actions={
        Dialog:handleOpenDialog,
        Login:AgentLogin
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(LoginAgent);

