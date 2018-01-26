import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import {handleOpenDialog,fetchBuses,BookSlot,BlockBus,CancelBlock,CancelBlockDate} from "../../actions/index";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
const rowStyle={
    display:"flex"
};
class DynamicPricing extends React.Component{

    constructor(props){
        super(props);
        this.state={
            from:"",
            to:"",
            dates:[],
            Bus:null,
            Slots:[]
        }
    }

    componentWillMount(){
        this.props.fetchbus();


    }

    handleDate = (def,date)=>{
        this.setState({
            from:date,
            to:date
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
        return date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
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
        this.props.book({
            bus :this.props.BusName[this.state.Bus],
            from :this.formatDate(this.state.from),
            to:this.formatDate(this.state.to),
            ssl:this.state.ssl,
            sst:this.state.sst
        })
    };

    CancelSlot=(id)=>{
        this.props.cancel({
            id:id,
            bus:this.props.BusName[this.state.Bus]
        })
    };

    BlockBus=()=>{
        this.props.block({
            bus:this.props.BusName[this.state.Bus],
            dates:this.state.dates
        })
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
                var dataObject = bus.Prices.Slots[slot]
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



    render(){
        return(
            <div>
                <SelectField  floatingLabelText="From"
                              value={this.state.Bus}
                              onChange={this.handleFromSelect}
                >
                    {
                        this.props.BusName.map((place, index) => (
                            <MenuItem value={index} key={index} primaryText={place}/>
                        ))
                    }
                </SelectField>
                <div style={rowStyle} >
                    <DatePicker hintText="From Date" onChange={this.handleDate} minDate={new Date((new Date()).setDate((new Date().getDate()+10)))} formatDate={this.formatDate} />
                    <DatePicker hintText="To Date"  onChange={this.handleToDate} formatDate={this.formatDate} minDate={this.state.to==""? new Date() : new Date(new Date(this.state.to).setDate((this.state.to.getDate()+1)))  } />
                </div>
                <div style={rowStyle}>
                    <div><span>Sleeper Price</span><TextField hintText="Hint Text" onChange={this.handleTextSSL}/></div>
                    <div><span>Seat Price</span><TextField hintText="Hint Text" onChange={this.handleTextSST}/></div>
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

                <h5>Already Blocked On</h5>
                <div>
                    { this.state.Bus!=null && this.props.buses[this.props.BusName[this.state.Bus]].Availability ? <h5>{

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



                    }</h5>:<h5>Data not available</h5>

                    }
                </div>

                <RaisedButton primary={true} label="bookSlot" onClick={this.BookSlot}/>
                <h5>Block the bus</h5>
                <DatePicker hintText="Select Date" onChange={this.handleBlockDate} minDate={new Date((new Date()).setDate((new Date().getDate()+10)))} formatDate={this.formatDate} />

                <div>
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
                <RaisedButton primary={true} label="Block bus" onClick={this.BlockBus}/>


            </div>
        )
    }
}



const mapStateToProps = (state)=> {
    return {
        buses:state.sleeper.Buses,
        BusName:state.sleeper.BusName
    };
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    const actions={
        Dialog:handleOpenDialog,
        fetchbus:fetchBuses,
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

