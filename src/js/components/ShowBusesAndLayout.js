import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Container ,Row,Col} from 'react-grid-system'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon';
import {showBusLayout} from '../actions/index'
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
class ShowBusesAndLayout extends React.Component{
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

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col md={8} style={busStyle}>
                            {
                                this.props.showBus.map((bus,index)=>(
                                    <Paper zDepth={2} key={index} style={{marginBottom:10,padding:10 }}>
                                        <div className="bus">
                                            <div>{bus}</div>
                                            <div>
                                                <span style={textStyle}>{this.props.route.from +" @ " + this.props.buses[bus].From[this.props.route.from]}</span><FontIcon className="material-icons" style={iconArrow}>arrow_forward</FontIcon><span style={textStyle}>{this.props.route.to +" @ " + this.props.buses[bus].To[this.props.route.to]}</span>
                                            </div>
                                        </div>

                                        <div className="Services">
                                            {
                                                this.props.buses[bus].Services.map((link,index)=>(
                                                    <img src={link} key={index} alt="Services" style={imageService}/>

                                                ))
                                            }

                                        </div>
                                        <div className="wrapper">
                                            <div>

                                                <img className="imageServices" src={require('../../images/double sleeprxxxhdpi.png')}  alt="logo" /><span className="price">{this.props.buses[bus].Prices.DSSL}</span>
                                                <img className="imageServices" src={require('../../images/single slprxxxhdpi.png')}  alt="logo" /><span className="price">{this.props.buses[bus].Prices.USSL}</span>
                                                <img className="imageServices" src={require('../../images/seatxxxhdpi.png')}  alt="logo" /><span className="price">{this.props.buses[bus].Prices.SST}</span>

                                            </div>
                                            <div>
                                                <RaisedButton label="View Seats"
                                                              labelPosition="after"
                                                              primary={true}
                                                              onClick={()=>this.handleShow(bus)}
                                                              buttonStyle={buttonStyle}

                                                />
                                            </div>
                                        </div>

                                    </Paper>

                                ))
                            }


                        </Col>
                        <Col md={4}>
                            <SelectLayout/>

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

