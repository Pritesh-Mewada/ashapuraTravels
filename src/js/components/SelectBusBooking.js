import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Search from 'material-ui/svg-icons/action/search';
import DatePicker from 'material-ui/DatePicker'
import {searchBuses} from '../actions/index'
import {handleOpenDialog,fetchBuses} from "../actions/index";
import {Container ,Row,Col} from 'react-grid-system'
import Paper from 'material-ui/Paper'
import * as firebase from 'firebase'

const backgroundStyle = {
    backgroundColor:"#fff",
    height:175

};

const buttonStyle={
    background: "linear-gradient(135deg, rgba(255,248,48,1) 0%, rgba(241,90,36,1) 100%)",

};
const paperStyle={
    paddingBottom:2,
    paddingLeft:30,

};
const selectStyle={
    color:"#2d2d2d",
    fontSize:20,
    fontWeight:500,
};
class SelectBus extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            places:[],
            from:null,
            to:null,
            date:null

        };


        this.handleFromSelect = this.handleFromSelect.bind(this);
        this.handleToSelect = this.handleToSelect.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.searchBuses =this.searchBuses.bind(this)
    }

    componentWillMount(){
        var places = firebase.database().ref('Places');
        places.once('value')
            .then((data) => {

                this.setState({
                    places: data.val()
                });
            });

        this.props.get();
    }

    handleFromSelect(event,index,value){
        this.setState({
            from:value
        })
    }

    handleDate(event,date){
        var formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        this.setState({
            date:formattedDate,
            dateObject:date
        })
    }

    searchBuses(){
        var search ={
            from:this.state.places[this.state.from],
            to:this.state.places[this.state.to],
            date:this.state.date
        };
        if(search.from==null){
            this.props.dialog("Please Select Source")
            return;
        }
        if(search.to==null){
            this.props.dialog("Please Select Destination")
            return;
        }
        if(search.date==null){
            this.props.dialog("Please Select Date")
            return;
        }
        if(search.from==search.to){
            this.props.dialog("Source and Destination Cannot be same");
            return;
        }

        this.props.search(search);
        this.props.action("/bookingStep");

    }

    handleToSelect(event,index,value){
        this.setState({
            to:value
        })
    }

    render(){
        return(
            <div style={backgroundStyle}>
                <Container >
                    <Paper zDepth={3} style={paperStyle}>
                        <Row align="end">
                            <Col sm={12} md={3} xs={12}>
                                <SelectField  floatingLabelText="From"
                                              value={this.state.from}
                                              onChange={this.handleFromSelect}
                                              floatingLabelStyle={selectStyle}
                                              labelStyle={selectStyle}
                                              iconStyle={{fill:"#2d2d2d"}}
                                              underlineStyle={{fill:"#2d2d2d",borderColor:"#fff830",borderBottomWidth:"2px"}}

                                >
                                    {
                                        this.state.places.map((place, index) => (
                                            <MenuItem value={index} key={index} primaryText={place}/>
                                        ))
                                    }

                                </SelectField>
                            </Col>
                            <Col sm={12} md={3} xs={12}>
                                <SelectField  floatingLabelText="To" value={this.state.to}
                                              onChange={this.handleToSelect}
                                              floatingLabelStyle={selectStyle}
                                              labelStyle={selectStyle}
                                              iconStyle={{fill:"#2d2d2d"}}
                                              underlineStyle={{fill:"#2d2d2d",borderColor:"#fff830",borderBottomWidth:"2px"}}

                                >
                                    {
                                        this.state.places.map((place,index) => (
                                            <MenuItem value={index} key={index} primaryText={place} />
                                        ))
                                    }
                                </SelectField>
                            </Col>
                            <Col sm={12} md={3} xs={12} >
                                <DatePicker hintText="Select Date of Journey" container="inline" onChange={this.handleDate} textFieldStyle={selectStyle} inputStyle={{color: "#2d2d2d",hintColor:"#2d2d2d"}}
                                            maxDate={new Date((new Date()).setDate((new Date().getDate()+15)))} minDate={new Date()}
                                            style={{marginBottom:5}}
                                />


                            </Col>
                            <Col sm={12} md={3} xs={12}>
                                <RaisedButton label="Search buses"
                                              labelPosition="after"
                                              primary={true}
                                              icon={<Search />}
                                              onClick={this.searchBuses}
                                              buttonStyle={buttonStyle}
                                              style={{marginBottom:12}}
                                />

                            </Col>
                        </Row>
                    </Paper>

                </Container>
            </div>
        )
    }


}

function matchDispatchToProps(dispatch){
    const actions={
        search:searchBuses,
        get:fetchBuses,
        dialog:handleOpenDialog,

    };
    return bindActionCreators(actions, dispatch);
}
const mapStateToProps = (state)=> {
    return {
        route:state.sleeper
    };
};


export default connect(mapStateToProps, matchDispatchToProps)(SelectBus);

