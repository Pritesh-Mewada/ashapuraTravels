import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';


class OtpVerification extends React.Component{
    constructor(props){
        super(props);
        this.handleOtp =this.handleOtp.bind(this);
    }
    handleOtp(e,number){
        if(isNaN(number)){
            this.props.Dialog("Please enter a number");

        }
        this.setState({
            Number:number
        });
    }


    render(){
        if(this.props.show){
            return(
                <div>
                    <TextField
                        hintText="Otp"
                        floatingLabelText="Otp Code"
                        type="text"
                        floatingLabelStyle={{fontSize:18}}
                        onChange={this.handleOtp}
                    />
                    <RaisedButton label="Verify" primary={true} onClick={()=>this.props.verifyOtp(this.state.Number)} style={{marginLeft:10}}/>
                </div>
            )
        }else{
            return(
                <div ></div>
            )
        }


    }
}

export default OtpVerification


