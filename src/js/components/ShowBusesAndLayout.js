import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Container ,Row,Col} from 'react-grid-system'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon';
import {showBusLayout,BookSelected} from '../actions/index'
import SelectLayout from './SelectLayout'
const iconArrow = {
    fontSize:28,
    position:'Relative',
    top:10
};
const textStyle={
  fontSize:16
};
const buttonStyle={
    background: "linear-gradient(135deg, rgba(255,248,48,1) 0%, rgba(241,90,36,1) 100%)",
};

class ShowBusesAndLayout extends React.Component{

    constructor(props){
        super(props);
        this.bookSelected =this.bookSelected.bind(this);
    }

    handleShow(bus) {
        var layout ={
            BusName:this.props.buses[bus].Name,
            BookingRef:this.props.buses[bus].BookingRef+this.props.route.date,
            DateStamp:this.props.route.date,
            Pricing:this.props.buses[bus].Prices,
            LayoutName:this.props.buses[bus].Layout
        };
        this.props.showLayout(layout);
    }

    bookSelected(){
        var parameters={
            BookingRef:this.props.busLayout.BookingRef,
            Seats:this.props.seats
        };


        this.props.bookAll(parameters);
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col md={8}>
                            {
                                this.props.showBus.map((bus,index)=>(
                                    <Paper zDepth={2} key={index} style={{marginTop:5 ,padding:10}}>
                                        <div className="bus">
                                            <div>{bus}</div>
                                            <div>
                                                <span style={textStyle}>{this.props.route.from +" @ " + this.props.buses[bus].From[this.props.route.from]}</span><FontIcon className="material-icons" style={iconArrow}>arrow_forward</FontIcon><span style={textStyle}>{this.props.route.to +" @ " + this.props.buses[bus].To[this.props.route.to]}</span>
                                            </div>
                                        </div>

                                        <div className="Services">
                                            {
                                                this.props.buses[bus].Services.map((link,index)=>(
                                                    <img src={link}  alt="Services" className="imageServices"/>

                                                ))
                                            }

                                        </div>
                                        <div className="wrapper">
                                            <div>

                                                <img src={require('../../images/single-bed-outline.png')}  alt="logo" /><span className="price">{this.props.buses[bus].Prices.DSSL}</span>
                                                <img src={require('../../images/single-bed-outline.png')}  alt="logo" /><span className="price">{this.props.buses[bus].Prices.USSL}</span>
                                                <img src={require('../../images/single-bed-outline.png')}  alt="logo" /><span className="price">{this.props.buses[bus].Prices.SST}</span>

                                            </div>
                                            <div>
                                                <RaisedButton label="View Seats" buttonStyle={buttonStyle}/>

                                            </div>
                                        </div>

                                    </Paper>

                                ))
                            }


                        </Col>
                        <Col md={4}>
                            <SelectLayout/>
                            <br/>
                            <RaisedButton  label="Book Selected" onClick={this.bookSelected} primary={true} style={buttonStyle} fullWidth={true}  labelStyle={{ fontSize: 18 }} />

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
        bookAll:BookSelected
    };
    return bindActionCreators(actions, dispatch);
}
const mapStateToProps = (state)=> {
    return {
        showBus:state.sleeper.searchedBus,
        buses:state.sleeper.Buses,
        route:state.sleeper.Route,
        seats:state.sleeper.userBucket,
        busLayout:state.sleeper.busLayout
    };
};


export default connect(mapStateToProps, matchDispatchToProps)(ShowBusesAndLayout);

