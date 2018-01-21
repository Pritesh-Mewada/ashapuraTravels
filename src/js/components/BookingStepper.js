import React from 'react'
import * as firebase from 'firebase'
import {Step, Stepper, StepLabel,StepContent} from 'material-ui/Stepper';
import IconButton from 'material-ui/IconButton'
import SelectBusBooking from "./SelectBusBooking";
import ShowBusesAndLayout from "./ShowBusesAndLayout";
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import  NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { handleOpenDialog,GetUser,OpenProgessDialog,CloseProgressDialog } from '../actions/index'
import TextField from 'material-ui/TextField'
import OtpVerification from './OtpVerification'
import ShowPricesTable from './ShowPricesTable'

const formStyle={
    width:'80%',
    margin:'auto'
};

const backButton={
    position:'fixed',
    top:'50%',
    left:50
};
const forwardButton={
    position:'fixed',
    top:'50%',
    right:50
};
class BookingStepper extends React.Component {

    constructor(){
        super();
        this.state = {
            finished: false,
            stepIndex: 2,
            Name:"",
            Address:"",
            Number:"",
            Email:"",
            ShowOtp:false,
            OtpVerified:false
        };

        this.handleNumber=this.handleNumber.bind(this);
        this.handleEmail=this.handleEmail.bind(this);
        this.handleName=this.handleName.bind(this);
        this.handleAddress=this.handleAddress.bind(this);
        this.getStepContent= this.getStepContent.bind(this);
        this.handleNext=this.handleNext.bind(this);
        this.handlePrev=this.handlePrev.bind(this);
        this.sendOTP=this.sendOTP.bind(this);
        this.verifyOtp=this.verifyOtp.bind(this)


    }

    verifyOtp(code){
        this.props.ProgressOpen("Verifying otp please wait");
        window.confirmationResult.confirm(code).then((result)=> {
            // User signed in successfully.
            this.setState({
                OtpVerified:true
            });
            this.props.ProgressClose();
            var user={
                Name:this.state.Name,
                Email:this.state.Email,
                Number:this.state.Number,
                Address:this.state.Address
            };
            this.props.StoreData(user);
        }).catch((error)=>{
            // User couldn't sign in (bad verification code?)
            // ...
            this.props.ProgressClose();
            this.props.Dialog("Unfortunately some error occured please try again");
        });
    }
    handleNumber(e,number){
        if(isNaN(number)){
            this.props.Dialog("Please enter a number");

        }
        if(number.length>10){
            this.props.Dialog("Maximum Limit reached");
        }
        this.setState({
            Number:number
        });


    };

    sendOTP(number){
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(number,appVerifier)
            .then((confirmationResult)=> {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("message send");
                this.props.ProgressClose();
                this.setState({
                    ShowOtp:true
                });
                this.props.Dialog("Please check your phone for otp")
            }).catch((error)=>{
            // Error; SMS not sent
            // ...
            console.log(error);
            this.props.ProgressClose();
        });
    }
    handleEmail(e,email){
        this.setState({
            Email:email
        });
    }

    handleAddress(e,address){
        this.setState({
            Address:address
        });
    }

    handleName(e,name){
        this.setState({
            Name:name
        });
    }



     handleNext(){


        const {stepIndex} = this.state;
        if(stepIndex==0){
            if(this.state.Email=="" || this.state.Name=="" || this.state.Number=="" || this.state.Address==""){
                this.props.Dialog("Fill all the details");
                return
            }

            var email =this.state.Email;
            var start = email.length-email.lastIndexOf("@");
            var end=email.length-email.lastIndexOf(".");

            if(start<5 || end<3 || email.lastIndexOf("@")<0 || email.lastIndexOf(".")<0){
                this.props.Dialog("Enter a valid email");
                return
            }

            if(!this.state.OtpVerified){
                this.sendOTP("+91"+this.state.Number)
                return
            }

        }

        this.setState({
            stepIndex: stepIndex+1,
            finished: stepIndex >= 2,
        });

    };

    handlePrev (){
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return(
                    <div style={formStyle}>
                        <TextField
                            hintText="Passenger name"
                            floatingLabelText="Name"
                            type="text"
                            fullWidth={true}
                            floatingLabelStyle={{fontSize:18}}
                            onChange={this.handleName}
                        />
                        <br/>
                        <TextField
                            hintText="Address"
                            multiLine={true}
                            rows={2}
                            rowsMax={4}
                            fullWidth={true}
                            onChange={this.handleAddress}
                        />
                        <br/>
                        <TextField
                            hintText="Mobile Number"
                            floatingLabelText="Number"
                            type="text"
                            fullWidth={true}
                            floatingLabelStyle={{fontSize:18}}
                            onChange={this.handleNumber}
                        />
                        <br/>
                        <TextField
                            hintText="Email Id"
                            floatingLabelText="Mail"
                            type="emailId"
                            fullWidth={true}
                            floatingLabelStyle={{fontSize:18}}
                            onChange={this.handleEmail}
                        />
                        <br/>
                        <OtpVerification show={this.state.ShowOtp} verifyOtp={this.verifyOtp}/>
                        <div id="recaptcha-container"></div>
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
                    <span>
                        <ShowPricesTable/>
                    </span>
                );

            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        return (
            <div style={{width: '100%', maxWidth: 1200, margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Select campaign settings</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad group</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad</StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    {finished ? (
                        <p>
                            <a
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({stepIndex: 0, finished: false});
                                }}
                            >
                                Click here
                            </a> to reset the example.
                        </p>
                    ) : (
                        <div>
                            <div>{this.getStepContent(stepIndex)}</div>
                            <div style={{marginTop: 12}}>
                                <IconButton
                                    disabled={stepIndex === 0}
                                    onClick={this.handlePrev}
                                    style={backButton}
                                    iconStyle={{width:48,height:48}}
                                >
                                    <NavigationArrowBack/>
                                </IconButton>
                                <IconButton
                                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                                    onClick={this.handleNext}
                                    style={forwardButton}
                                    iconStyle={{width:48,height:48}}
                                >
                                    <NavigationArrowForward/>
                                </IconButton>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        user:state.sleeper.user,
        bucket:state.sleeper.userBucket,
        price:state.sleeper.busLayout.Pricing
    };
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    const actions={
        Dialog:handleOpenDialog,
        ProgressOpen:OpenProgessDialog,
        ProgressClose:CloseProgressDialog,
        StoreData:GetUser
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(BookingStepper);

