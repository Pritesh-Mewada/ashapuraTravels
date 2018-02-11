import React from 'react'
import * as firebase from 'firebase'
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import ShowBusesAndLayout from "./ShowBusesAndLayout";
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import  NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {GetHash , handleOpenDialog,GetUser,StoreBoarding,OpenProgessDialog,CloseProgressDialog,BookSelected } from '../actions/index'
import TextField from 'material-ui/TextField'
import OtpVerification from './OtpVerification'
import RaisedButton from 'material-ui/RaisedButton';
import SelectLayout from './SelectLayout';
import {Container ,Row,Col} from 'react-grid-system'
import SelectSourceDestination from './SelectSourceDestination'
import Ticket from './Ticket'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Footer from "./footer";

const formStyle={
    width:'80%',
    margin:'auto'
};
const buttonStyleRight={
    background: "linear-gradient(-151deg, #1e80c5, #63e7b1)",
    clipPath:"polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)",
};

const buttonStyleLeft={
    background: "linear-gradient(-151deg, #1e80c5, #63e7b1)",
    clipPath:"polygon(100% 0%, 10% 0%, 0% 50%, 10% 100%,100% 100%)",
};
const selectStyle={
    color:"rgba(0,0,0,0.3)",
    fontSize:18,
    marginBottom:5
};
class BookingStepper extends React.Component {
    constructor(){
        super();
        this.state = {
            finished: false,
            stepIndex: 0,
            Name:"",
            Address:"",
            Number:"",
            Email:"",
            ShowOtp:false,
            OtpVerified:false,
            form:null

        };
    }
    handleBoardingSelect=(event,index,value)=>{
        this.setState({
            from:value
        });
        this.props.StoreBoarding(this.props.Layout.busLayout.Boarding[value]);
    };

    bookSelected=()=>{
        var parameters={
            Ref:this.props.Layout.busLayout.Ref,
            Seats:this.props.Layout.userBucket,
            Name:this.state.Name,
            Number:this.state.Number,
        };
        this.props.bookAll(parameters);
    };
    submitForm=()=>{
        this.refs.formToSubmit.submit();
    };
    verifyOtp=(code)=>{
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
    };
    handleNumber=(e,number)=>{
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

    sendOTP=(number)=>{
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
    };
    handleEmail=(e,email)=>{
        this.setState({
            Email:email
        });
    };

    handleName=(e,name)=>{
        this.setState({
            Name:name
        });
    };


    handleNextBus=()=>{
        const {stepIndex} = this.state;

        this.setState({
            stepIndex: stepIndex+1,
            finished: stepIndex >= 2,
        });

    }

     handleNext=()=>{
        const {stepIndex} = this.state;

        if(stepIndex===0){
            if(firebase.auth().currentUser){
                firebase.auth().signOut().then(()=>{
                    console.log("user successfully signed out");
                })
            }

            if(!this.props.Layout.busLayout){
                this.props.Dialog("Please Select a bus to Proceed");
                return
            }

        }

         if(stepIndex===2) {
             if (this.state.Email === "" || this.state.Name === "" || this.state.Number === "" || this.state.from == null) {
                 this.props.Dialog("Fill all the details");
                 return
             }

             var email = this.state.Email;
             var start = email.length - email.lastIndexOf("@");
             var end = email.length - email.lastIndexOf(".");
             if (start < 5 || end < 3 || email.lastIndexOf("@") < 0 || email.lastIndexOf(".") < 0) {
                 this.props.Dialog("Enter a valid email");
                 return
             }

             if (!this.state.OtpVerified) {
                 this.sendOTP("+91" + this.state.Number);
                 return
             }

             this.bookSelected();
             this.props.GetHash(this.props.Payment.payment);
         }




        this.setState({
            stepIndex: stepIndex+1,
            finished: stepIndex >= 2,
        });

         if(stepIndex==3){
             this.submitForm();
         }
     };

    handlePrev=()=>{
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent=(stepIndex)=> {
        switch (stepIndex) {
            case 0:
                return(
                    <div >
                        <SelectSourceDestination />
                        <ShowBusesAndLayout step={this.handleNextBus} />
                    </div>

                );

            case 1:
                return(
                    <div style={{display:"flex",justifyContent:"space-around"}}>
                        <div style={{width:350}}>
                            <SelectLayout/>
                        </div>
                        <div>
                            <Ticket/>
                        </div>
                    </div>
                );
            case 2:
                return (

                    <div style={{display:"flex",justifyContent:"space-around"}}>
                        <div style={{width:500}}>
                            <span>
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
                                    <SelectField  floatingLabelText="Boarding Point"
                                                  value={this.state.from}
                                                  onChange={this.handleBoardingSelect}
                                                  floatingLabelStyle={selectStyle}
                                                  labelStyle={selectStyle}
                                                  fullWidth={true}

                                    >
                                    {
                                        this.props.Layout.busLayout.Boarding.map((place, index) => (
                                            <MenuItem value={index} key={index} primaryText={place}/>
                                        ))
                                    }

                                    </SelectField>
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
                                        { this.state.ShowOtp ? null : <div id="recaptcha-container"></div> }
                                        <br/><br/><br/>
                                </div>
                                </span>
                        </div>
                        <div>
                            <Ticket/>
                        </div>
                    </div>
                );
            case 3: return(
                <div>
                    <div>
                        <Ticket/>
                    </div>
                    <form ref="formToSubmit" id="paymentForm" action='https://test.payu.in/_payment' method='post'>
                        <input type="hidden" name="key" value={this.props.Payment.payment.key} />
                        <input type="hidden" name="txnid" value={this.props.Payment.payment.txnid} />
                        <input type="hidden" name="amount" value={this.props.Payment.payment.amount} />
                        <input type="hidden" name="productinfo" value={this.props.Payment.payment.productinfo} />
                        <input type="hidden" name="firstname" value={this.props.Payment.payment.firstname} />
                        <input type="hidden" name="udf1" value={this.props.Payment.payment.udf1} />
                        <input type="hidden" name="udf2" value={this.props.Payment.payment.udf2} />
                        <input type="hidden" name="udf3" value={this.props.Payment.payment.udf3} />

                        <input type="hidden" name="email" value={this.props.Payment.payment.email} />
                        <input type="hidden" name="phone" value={this.props.Payment.payment.phone} />
                        <input type="hidden" name="lastname" value={this.props.Payment.payment.firstname} />
                        <input type="hidden" name="surl" value="https://ashapura-travels-8bfb5.firebaseapp.com/success" />
                        <input type="hidden" name="furl" value="https://ashapura-travels-8bfb5.firebaseapp.com/failure" />
                        <input type="hidden" name="hash" id="hash" value={this.props.Payment.payment.hash}/>
                    </form>
                </div>
            );
            default:
                return 'You are going to have a nice journey with us';
        }
    }

    render(){
        if(this.props.hashvalue){
            this.submitForm();
        }
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        return (
            <div>
                <div style={{width: '100%', maxWidth: 1200, margin: 'auto'}}>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Select Bus & Seats</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Insert Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Payment</StepLabel>
                        </Step>
                    </Stepper>
                    <div style={contentStyle}>
                        <div>
                            <div>{this.getStepContent(stepIndex)}</div>
                            <br/><br/><br/>
                            <div style={{display:'flex',justifyContent:"center"}}>
                                <RaisedButton label="Go Backward"
                                              labelPosition="after"
                                              primary={true}
                                              icon={<NavigationArrowBack/>}
                                              style={{marginRight:12}}
                                              buttonStyle={buttonStyleLeft}
                                              onClick={this.handlePrev}
                                              disabled={stepIndex===0}

                                />
                                <RaisedButton label="Proceed forward"
                                              labelPosition="before"
                                              primary={true}
                                              icon={<NavigationArrowForward/>}
                                              style={{marginLeft:12}}
                                              buttonStyle={buttonStyleRight}
                                              onClick={this.handleNext}
                                />
                            </div>
                            <br/><br/><br/><br/><br/>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>

        );
    }
}

const mapStateToProps = (state)=> {
    return {
        user:state.sleeper.user,
        Layout:state.sleeper,
        Payment:state.sleeper
    };
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    const actions={
        Dialog:handleOpenDialog,
        ProgressOpen:OpenProgessDialog,
        ProgressClose:CloseProgressDialog,
        StoreData:GetUser,
        bookAll:BookSelected,
        GetHash:GetHash,
        StoreBoarding:StoreBoarding
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(BookingStepper);

