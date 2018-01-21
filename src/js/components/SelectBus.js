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
import {Container ,Row,Col} from 'react-grid-system'
import * as firebase from 'firebase'
const backgroundStyle = {
    backgroundImage:'url(' + require('../../images/select_bg.png') + ')',
    height:380,
};
const selectStyle={
    color:"#fff",
    fontSize:20,
    marginBottom:10

};

const buttonStyle={
    borderRadius:12,
    background: "linear-gradient(-15deg, #0000ff, #ff7bac)"

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
            start:this.state.from,
            end:this.state.to,
            date:this.state.date,
            places:this.state.places,
            dateObject:this.state.dateObject
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
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="busSelect">
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
                    <div>
                        <DatePicker style={{marginBottom:5}} hintText="Select Date of Journey" container="inline" onChange={this.handleDate} textFieldStyle={selectStyle} inputStyle={{color: 'white'}}
                                    maxDate={new Date((new Date()).setDate((new Date().getDate()+15)))} minDate={new Date()}
                        />
                    </div>
                    <div>
                        <RaisedButton label="Search buses"
                                      labelPosition="after"
                                      primary={true}
                                      buttonStyle={buttonStyle}
                                      style={{marginBottom:25,borderRadius:12}}
                                      icon={<Search />}
                                      onClick={this.searchBuses}
                        />
                    </div>
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

    };
};


export default connect(mapStateToProps, matchDispatchToProps)(SelectBus);

