import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Container ,Row,Col} from 'react-grid-system'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon';
import {showBusLayout, AgentBookSelected, handleOpenDialog} from '../../actions/index'
import SelectLayout from '../SelectLayout'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const iconArrow = {
    fontSize:28,
    position:'Relative',
    top:10
};
const textStyle={
    fontSize:16
};
const buttonStyle={
    background: "linear-gradient(-45deg, #0000ff, #ff7bac)",
};
const imageService={
    width:25,
    height:25,
    marginRight:10

};

const busStyle={
    height: 650,
    overflowY: "auto"
};
class SelectBusLayout extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            Name:null,
            Number:null,
            from:""
        };
    }

    handleShow(bus) {
        this.props.showLayout(this.props.showBus[bus]);
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleName=(e,name)=>{
        this.setState({Name:name});
    };
    handleNumber=(e,name)=>{
        this.setState({Number:name});
    };
    handleBoardingSelect=(event,index,value)=>{
        this.setState({
            from:value
        });
    };

    handleBook =()=>{
        if(!this.state.Name || !this.state.Number){
            this.handleClose();
            this.props.Dialog("Please fill the details");
            return;
        }

        this.props.Book({
            Seats:this.props.storage.userBucket,
            SeatPrice:this.props.storage.Seats,
            Ref:this.props.storage.busLayout.Ref,
            BusName:this.props.storage.busLayout.Name,
            Point:this.props.storage.busLayout.Boarding[this.state.from],
            CName:this.state.Name,
            Number:this.state.Number,
            PNR:this.props.storage.busLayout.PNR,
            Date:this.props.storage.Route.date,
            Journey:this.props.storage.Route.from+" To "+this.props.storage.Route.to,
            Departure:this.props.storage.busLayout.Departure,
            Amount:this.props.storage.total,
            JourneyTime:this.props.storage.busLayout.Time
        });
        this.handleClose()
    };


    render(){
        const actions = [
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleBook}
            />
        ];
        return(
            <div>
                <Container>
                    <Row>
                        <Col md={8} style={busStyle}>
                            { this.props.showBus && this.props.showBus.length!=0 ?
                                this.props.showBus.map((bus,index)=>(
                                    <Paper zDepth={2} key={index} style={{marginBottom:10,padding:10 }}>
                                        <div className="bus">
                                            <div>{bus.Name}</div>
                                            <div>
                                                <span style={textStyle}>{this.props.route.from +" @ " + bus.Departure}</span><FontIcon className="material-icons" style={iconArrow}>arrow_forward</FontIcon><span style={textStyle}>{this.props.route.to +" @ " + bus.Arrival}</span>
                                            </div>
                                        </div>

                                        <div className="Services">
                                            {
                                                bus.Services.map((link,index)=>(
                                                    <img src={link}  alt="Services" style={imageService} key={index}/>

                                                ))
                                            }

                                        </div>
                                        <div className="wrapper">
                                            <div>

                                                <img className="imageServices" src={require('../../../images/icons/doublesleeper.png')}  alt="logo" /><span className="price">{bus.Price.SL*2}</span>
                                                <img className="imageSleeper" src={require('../../../images/icons/singlesleeper.png')}  alt="logo" /><span className="price">{bus.Price.SL}</span>
                                                <img className="imageServices" src={require('../../../images/icons/seat.png')}  alt="logo" /><span className="price">{bus.Price.ST}</span>

                                            </div>
                                            <div>
                                                <RaisedButton label="View Seats"
                                                              labelPosition="after"
                                                              primary={true}
                                                              onClick={()=>this.handleShow(index)}
                                                              buttonStyle={buttonStyle}

                                                />
                                            </div>
                                        </div>

                                    </Paper>

                                )):(this.props.showBus ? <div style={{textAlign:"right",paddingRight:70}}>
                                    <br/><br/><br/>
                                    <img src={require('../../../images/no_bus.png')}   alt="no bus" width="256" height="193" />
                                </div>:<div style={{textAlign:"right",paddingRight:70}}>
                                    <br/><br/><br/>
                                    <img src={require('../../../images/select_bus.png')}   alt="no bus" width="193" height="193" />
                                </div>)
                            }


                        </Col>
                        <Col md={4}>
                            {
                                this.props.busLayout ? <div>
                                    <SelectLayout/>
                                    <br/>
                                    <RaisedButton onClick={this.handleOpen} label="Book all tickets" primary={true} fullWidth={true}/>
                                    <Dialog
                                        title="Please Fill the details"
                                        actions={actions}
                                        modal={false}
                                        open={this.state.open}
                                        onRequestClose={this.handleClose}
                                    >
                                        <TextField
                                            hintText="Name"
                                            floatingLabelText="Passenger Name"
                                            type="text"
                                            fullWidth={true}
                                            floatingLabelStyle={{fontSize:18}}
                                            onChange={this.handleName}

                                        />
                                        <br/>
                                        <TextField
                                            hintText="Mobile number"
                                            floatingLabelText="Passenger mobile number"
                                            type="text"
                                            fullWidth={true}
                                            floatingLabelStyle={{fontSize:18}}
                                            onChange={this.handleNumber}

                                        />
                                        <br/>
                                        <SelectField  floatingLabelText="Boarding Point"
                                                      value={this.state.from}
                                                      onChange={this.handleBoardingSelect}
                                        >
                                            { this.props.storage.busLayout && this.props.storage.busLayout.Boarding ?
                                                this.props.storage.busLayout.Boarding.map((place, index) => (
                                                    <MenuItem value={index} key={index} primaryText={place}/>
                                                )):null
                                            }

                                        </SelectField>
                                        <h3>{"Amount to be taken"+this.props.storage.total}</h3>
                                    </Dialog>
                                    <br/><br/><br/><br/><br/>
                                </div> :null
                            }


                        </Col>
                    </Row>

                </Container>

            </div>
        )
    }

}


function matchDispatchToProps(dispatch){
    const actions={
        showLayout:showBusLayout,
        Book:AgentBookSelected,
        Dialog:handleOpenDialog

    };
    return bindActionCreators(actions, dispatch);
}
const mapStateToProps = (state)=> {
    return {
        showBus:state.sleeper.Buses,
        route:state.sleeper.Route,
        storage:state.sleeper,
        busLayout:state.sleeper.busLayout


    };
};


export default connect(mapStateToProps, matchDispatchToProps)(SelectBusLayout);
