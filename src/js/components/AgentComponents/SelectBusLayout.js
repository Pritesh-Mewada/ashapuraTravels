import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Container ,Row,Col} from 'react-grid-system'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon';
import {showBusLayout,AgentBookSelected} from '../../actions/index'
import SelectLayout from '../SelectLayout'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'

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
            Name:"",
            Number:"s"
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

    handleBook =()=>{
        this.props.Book({
            Seats:this.props.storage.userBucket,
            Ref:this.props.storage.busLayout.Ref,
            Name:this.state.Name,
            Number:this.state.Number
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
                            { this.props.showBus ?
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

                                                <img className="imageServices" src={require('../../../images/double sleeprxxxhdpi.png')}  alt="logo" /><span className="price">{bus.Price.SL*2}</span>
                                                <img className="imageServices" src={require('../../../images/single slprxxxhdpi.png')}  alt="logo" /><span className="price">{bus.Price.SL}</span>
                                                <img className="imageServices" src={require('../../../images/seatxxxhdpi.png')}  alt="logo" /><span className="price">{bus.Price.ST}</span>

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

                                )):<h2>No Buses Available</h2>
                            }


                        </Col>
                        <Col md={4}>
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
                                <h3>Amount to be taken 5000</h3>
                            </Dialog>
                            <br/><br/><br/><br/><br/>
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
        Book:AgentBookSelected

    };
    return bindActionCreators(actions, dispatch);
}
const mapStateToProps = (state)=> {
    return {
        showBus:state.sleeper.Buses,
        route:state.sleeper.Route,
        storage:state.sleeper,

    };
};


export default connect(mapStateToProps, matchDispatchToProps)(SelectBusLayout);
