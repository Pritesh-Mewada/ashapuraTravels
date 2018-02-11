import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon';
import {showBusLayout} from '../actions/index'

const iconArrow = {
    fontSize:20,
    position:'Relative',
    top:6,
    marginLeft:30,
    marginRight:5
};

const buttonStyle={
    background: "linear-gradient(-45deg, #0000ff, #ff7bac)",
    borderRadius:25
};
const imageService={
    width:30,
    height:25,
    marginRight:15
};
const busStyle={
    height: 650,
    overflowY: "auto"
};
class ShowBusesAndLayout extends React.Component{
    handleShow(bus) {
        this.props.showLayout(this.props.showBus[bus]);
        this.props.step()
    }

    render(){
        return(
            <div>
                <br/>
                <br/>
                { this.props.showBus && this.props.showBus.length !=0  ?
                    this.props.showBus.map((bus,index)=>(
                        <Paper zDepth={2} key={index} style={{marginBottom:10,padding:10 ,borderRadius:10}}>
                            <div className="bus">
                                <div>{bus.Name}</div>
                                <div>
                                    <img className="imageServices" src={require('../../images/icons/doublesleeper.png')}  alt="logo" /><span className="price">{bus.Price.SL*2}</span>
                                    <img className="imageSleeper" src={require('../../images/icons/singlesleeper.png')}  alt="logo" /><span className="price">{bus.Price.SL}</span>
                                    <img className="imageServices" src={require('../../images/icons/seat.png')}  alt="logo" /><span className="price">{bus.Price.ST}</span>
                                </div>
                                <div>
                                    <span className="textStyle">{this.props.route.from}</span><FontIcon className="material-icons" style={iconArrow}>arrow_forward</FontIcon><span className="textStyle">{this.props.route.to}</span>
                                </div>
                                <div className="Services">
                                    {
                                        bus.Services.map((link,index)=>(
                                            <img src={link} key={index} alt="Services" style={imageService}/>

                                        ))
                                    }

                                </div>

                                <div>
                                    <RaisedButton label="View Seats"
                                                  labelPosition="after"
                                                  primary={true}
                                                  onClick={()=>this.handleShow(index)}
                                                  buttonStyle={buttonStyle}
                                                  style={{borderRadius:25}}

                                    />
                                </div>
                            </div>
                        </Paper>

                    )): <div style={{textAlign:"center"}}>
                            <img src={require('../../images/no_bus.png')}   alt="no bus" width="260" height="185" />
                        </div>
                }

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
        showBus:state.sleeper.Buses,
        route:state.sleeper.Route,
        seats:state.sleeper.userBucket,
        busLayout:state.sleeper.busLayout
    };
};


export default connect(mapStateToProps, matchDispatchToProps)(ShowBusesAndLayout);

