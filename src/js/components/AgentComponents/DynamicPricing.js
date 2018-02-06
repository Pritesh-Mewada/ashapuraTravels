import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {handleOpenDialog,fetchBuses,BookSlot,BlockBus,CancelBlock,CancelBlockDate} from "../../actions/index";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import {Tabs, Tab} from 'material-ui/Tabs';

const rowStyle={
    display:"flex",
    justifyContent:"space-between",
    alignItems:"flex-end",
    marginLeft:50,
    marginRight:50
};
const tabsWidth={
    width:"80%",
    margin:"auto",
    marginTop:20
};
class DynamicPricing extends React.Component{

    constructor(props){
        super(props);
        this.state={
            from:"",
            to:"",
            temp:null,
            dates:[],
            Bus:null,
            Slots:[]
        }
    }
    handleDate = (def,date)=>{
        this.setState({
            from:date,
            temp:date
        });

    };
    handleToDate= (def,date)=>{
        this.setState({
            to:date
        });
    };
    handleBlockDate= (def,date)=>{
        this.dates = this.state.dates;
        this.dates.push(this.formatDate(date));
        this.setState({
            dates :this.dates
        });
    };

    handleRequestDelete=(index)=>{
        console.log("delete button clicked"+index);

        this.chipData = this.state.dates;
        this.chipData.splice(index, 1);
        this.setState({dates: this.chipData});
    };

    handleFromSelect=(event,index,value)=>{
        var bus =this.props.buses[this.props.BusName[value]];
        this.setState({
            Bus:value
        });

        if(bus.Prices.Slots){
            var data=[];
            for (var slot in bus.Prices.Slots){
                var dataObject = bus.Prices.Slots[slot]
                data.push(dataObject)
            }

            this.setState({
                Slots:data
            })
        }else{
            this.setState({
                Slots:[]
            })
        }
    };

    formatDate=(date)=>{
        return date.toDateString();
    };

    handleTextSST=(evt,string)=>{
        this.setState({
            sst:string
        });
    };
    handleTextSSL=(evt,string)=>{
        this.setState({
            ssl:string
        });
    };

    BookSlot=()=>{
        if(!this.state.Bus){
            this.props.Dialog("Please Select a Bus");
            return
        }

        if(this.state.from > this.state.to){
            this.props.Dialog("Please Select proper dates");
            return;

        }
        this.props.book({
            bus :this.props.BusName[this.state.Bus],
            from :this.formatDate(this.state.from),
            to:this.formatDate(this.state.to),
            ssl:this.state.ssl,
            sst:this.state.sst
        })
    };

    CancelSlot=(id)=>{
        if(!this.state.Bus){
            this.props.Dialog("Please Select a Bus");
            return
        }

        this.props.cancel({
            id:id,
            bus:this.props.BusName[this.state.Bus]
        })
    };

    BlockBus=()=>{
        if(this.state.Bus ==null){
            this.props.Dialog("Please Select a Bus");
            return
        }
        this.props.block({
            bus:this.props.BusName[this.state.Bus],
            dates:this.state.dates
        });
        this.setState({
            dates:[]
        })
    };

    GetSlots=()=>{
        if(this.state.Bus==null){
            return []
        }

        var bus =this.props.buses[this.props.BusName[this.state.Bus]];
        var data=[];
        console.log(bus);
        if(bus.Prices.Slots){
            for (var slot in bus.Prices.Slots){
                var dataObject = bus.Prices.Slots[slot];
                dataObject['id']=slot;
                data.push(dataObject)
            }

        }
        console.log(data)
        return data
    };

    handleDelete=(index)=>{

        var date =   this.props.buses[this.props.BusName[this.state.Bus]].Availability;
        date.splice(index,1);

        this.props.cancelBlock({
            bus:this.props.BusName[this.state.Bus],
            dates:date
        })
    };

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };



    render(){
        return(
            <div>
                <div style={tabsWidth}>
                    <SelectField  floatingLabelText="Please Select a Bus"
                                  value={this.state.Bus}
                                  onChange={this.handleFromSelect}
                                  fullWidth={true}
                    >
                        {
                            this.props.BusName.map((place, index) => (
                                <MenuItem value={index} key={index} primaryText={place}/>
                            ))
                        }
                    </SelectField>
                </div>

                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={tabsWidth}
                >
                    <Tab label="Book Slots" value="a" >
                        <div style={{overflowY:"auto"}}>
                            <div style={rowStyle}>
                                <DatePicker hintText="From Date" onChange={this.handleDate} minDate={new Date(new Date().getTime()+24*60*60*1000*10)} formatDate={this.formatDate}/>
                                <DatePicker hintText="To Date"  onChange={this.handleToDate} formatDate={this.formatDate} minDate={this.state.temp ==null ? new Date() : this.state.temp}  />
                            </div>
                            <div style={rowStyle}>
                                <div><TextField floatingLabelText="Sleeper Price" hintText="Enter Sleeper Price" onChange={this.handleTextSSL}/></div>
                                <div><TextField floatingLabelText="Seat Price" hintText="Enter Seat Price" onChange={this.handleTextSST} /></div>
                            </div>
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                                    <TableRow>
                                        <TableHeaderColumn >From Date</TableHeaderColumn>
                                        <TableHeaderColumn >From To</TableHeaderColumn>
                                        <TableHeaderColumn >Sleeper Price</TableHeaderColumn>
                                        <TableHeaderColumn >Seat Price</TableHeaderColumn>
                                        <TableHeaderColumn >Booked By</TableHeaderColumn>
                                        <TableHeaderColumn >Actions</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {
                                        this.GetSlots().map((seat,index)=>(
                                            <TableRow key={index}>
                                                <TableRowColumn>{seat.from}</TableRowColumn>
                                                <TableRowColumn>{seat.to}</TableRowColumn>
                                                <TableRowColumn>{seat.SSL}</TableRowColumn>
                                                <TableRowColumn>{seat.SST}</TableRowColumn>
                                                <TableRowColumn>Pritesh Mewada</TableRowColumn>
                                                <TableRowColumn>
                                                    <IconButton
                                                        iconStyle={{
                                                            width: 36,
                                                            height: 36,
                                                        }}
                                                        style={{
                                                            width: 72,
                                                            height: 72,
                                                            padding: 16,

                                                        }}
                                                        onClick={()=>this.CancelSlot(seat.id)}
                                                    >
                                                        <NavigationCancel/>
                                                    </IconButton></TableRowColumn>
                                            </TableRow>

                                        ))
                                    }
                                </TableBody>
                            </Table>
                            <RaisedButton primary={true} fullWidth={true} label="bookSlot" onClick={this.BookSlot}/>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        </div>
                    </Tab>
                    <Tab label="Block Bus" value="b">
                        <div>
                            <h5>Block the bus</h5>
                            <DatePicker hintText="Select Date" onChange={this.handleBlockDate} minDate={new Date((new Date().getTime()+10*24*60*60*1000))} formatDate={this.formatDate} />

                            <div style={{display:"flex"}}>
                                {
                                    this.state.dates.map((date,index)=>(
                                        <Chip
                                            onRequestDelete={()=>this.handleRequestDelete(index)}
                                            // onClick={handleClick}
                                            key={index}
                                        >
                                            <Avatar color="#444" icon={<SvgIconFace />} />
                                            {date}
                                        </Chip>

                                    ))
                                }
                            </div>
                            <p>Already Blocked On</p>
                            <div >
                                { this.state.Bus!=null && this.props.buses[this.props.BusName[this.state.Bus]].Availability ? <span style={{display:"flex", flexWrap:"wrap",margin:2}} >{

                                    this.props.buses[this.props.BusName[this.state.Bus]].Availability.map((date,index)=>(
                                        <Chip
                                            onRequestDelete={()=>this.handleDelete(index)}
                                            // onClick={handleClick}
                                            key={index}
                                        >
                                            <Avatar color="#444" icon={<SvgIconFace />} />
                                            {date}
                                        </Chip>

                                    ))



                                }</span>:<p>No Dates are available</p>

                                }
                            </div>
                            <br/><br/>
                            <RaisedButton primary={true} label="Block bus" onClick={this.BlockBus} fullWidth={true}/>

                        </div>
                    </Tab>
                </Tabs>
            </div>

        )
    }
}

const mapStateToProps = (state)=> {
    return {
        buses:state.Agent.Buses,
        BusName:state.Agent.BusName
    };
};
function matchDispatchToProps(dispatch){
    const actions={
        Dialog:handleOpenDialog,
        fetchBus:fetchBuses,
        book:BookSlot,
        block:BlockBus,
        cancel:CancelBlock,
        cancelBlock:CancelBlockDate
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(DynamicPricing);

