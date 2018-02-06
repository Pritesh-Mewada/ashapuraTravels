import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Search from 'material-ui/svg-icons/action/search';
import DatePicker from 'material-ui/DatePicker'
import {searchBuses} from '../actions/index'
import {handleOpenDialog,fetchBuses,NavigateTo} from "../actions/index";
import * as firebase from 'firebase'
const selectStyle={
    color:"#fff",
    fontSize:20,
    marginBottom:5
};
const buttonStyle={
    borderRadius:12,
    background: "linear-gradient(-15deg, #0000ff, #ff7bac)",
    minWidth:160
};
const calenderStyle={
    marginLeft:40,
    marginBottom:8,
    marginRight:20,
    position: "relative",
    top: -7,
    fontSize: 21,
    color:"#eee",
    fontFamily:"Roboto",
    fontWeight:500
};
class SelectSourceDestination extends React.Component {

    constructor(props) {
        super(props);
        if(this.props.Route){
            this.state = {
                places: this.props.Route.places,
                from: this.props.Route.start,
                to: this.props.Route.end,
                date: this.props.Route.date,
                dateObject:this.props.Route.dateObject,
            };
        }else{
            this.state = {
                places: [],
                from: null,
                to: null,
                date: "Select Date",
                dateObject:null,

            }
        }

        this.handleFromSelect = this.handleFromSelect.bind(this);
        this.handleToSelect = this.handleToSelect.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.searchBuses = this.searchBuses.bind(this)
    }

    componentWillMount(){
        if(!this.props.Route){
            var places = firebase.database().ref('Places');
            places.once('value')
                .then((data) => {
                    this.setState({
                        places: data.val()
                    });
                });

        }



    }



    handleFromSelect(event,index,value){
        this.setState({
            from:value
        })
    }

    handleDate(event,date){
        var formattedDate = date.toDateString();
        this.setState({
            date:formattedDate,
            dateObject:date
        })
    }

    searchBuses(){
        var search ={
            from:this.state.places[this.state.from],
            to:this.state.places[this.state.to],
            start:this.state.from,
            end:this.state.to,
            date:this.state.date,
            dateObject:this.state.dateObject,
            places:this.state.places
        };

        if(search.from==null){
            this.props.dialog("Please Select Source")
            return;
        }
        if(search.to==null){
            this.props.dialog("Please Select Destination")
            return;
        }
        if(search.dateObject==null){
            this.props.dialog("Please Select Date")
            return;
        }
        if(search.from===search.to){
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

    openDatePicker=()=>{
        this.refs.dp.openDialog()
    };

    render(){

        return(
            <div style={this.props.mystyle}>
                <div>
                    <SelectField  floatingLabelText="From"
                                  value={this.state.from}
                                  onChange={this.handleFromSelect}
                                  floatingLabelStyle={selectStyle}
                                  labelStyle={selectStyle}


                    >
                        {
                            this.state.places.map((place, index) => (
                                <MenuItem value={index} key={index} primaryText={place}/>
                            ))
                        }

                    </SelectField>
                </div>
                <div>
                    <SelectField  floatingLabelText="To" value={this.state.to}
                                  onChange={this.handleToSelect}
                                  floatingLabelStyle={selectStyle}
                                  labelStyle={selectStyle}

                    >
                        {
                            this.state.places.map((place,index) => (
                                <MenuItem value={index} key={index} primaryText={place} />
                            ))
                        }
                    </SelectField>
                </div>
                <div style={{textAlign:"left",marginBottom:8}}>
                    <DatePicker  style={{visibility:"hidden"}} hintText="Select Date of Journey" container="inline" onChange={this.handleDate} textFieldStyle={selectStyle} inputStyle={{color: 'white'}}
                                 maxDate={new Date((new Date()).setDate((new Date().getDate()+15)))} minDate={new Date()}
                                 ref='dp'
                    />
                    <span style={calenderStyle}>{this.state.date}</span>
                    <img src={require('../../images/calander.png')}  alt="calendar_logo" onClick={this.openDatePicker} />

                </div>
                <div>
                    <RaisedButton label="Search buses"
                                  labelPosition="after"
                                  primary={true}
                                  buttonStyle={buttonStyle}
                                  style={{marginBottom:13,borderRadius:21}}
                                  icon={<Search />}
                                  onClick={this.searchBuses}
                    />
                </div>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch){
    const actions={
        search:searchBuses,
        get:fetchBuses,
        dialog:handleOpenDialog,
        action:NavigateTo

    };
    return bindActionCreators(actions, dispatch);
}
const mapStateToProps = (state)=> {
    return {
        Route:state.sleeper.Route
    };
};


export default connect(mapStateToProps, matchDispatchToProps)(SelectSourceDestination);

