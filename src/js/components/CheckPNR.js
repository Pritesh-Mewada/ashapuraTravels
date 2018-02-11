import React from 'react'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import * as firebase from 'firebase'
const tableHeadStyle={
    height:50,
    background: "linear-gradient(-151deg, rgba(30,128,197,0.5), rgba(99,231,177,0.5) )",

};
const headerStyle={
    color:"#fff",
    fontWeight:600,
    fontSize:18
};

class CheckPNR extends React.Component{

    constructor(){
        super();
        this.state={
            FormatDate:null,
            PNR:null,
            show:[],
            source:{}
        }
    }
    handlePnr=(e,pnr)=>{
        this.setState({PNR:pnr});
    };
    handleDate= (def,date)=>{
        this.setState({
            Date :date,
            FormatDate:date.toDateString()
        });
    };
    formatDate=(date)=>{
        return date.toDateString();
    };

    GetDetails=()=>{
        if(!this.state.FormatDate || !this.state.PNR){
            alert("Please enter the details")
        }

        var show=['Seats','Amount','Departure','Journey','JourneyTime','Name','BusName','Point'];
        var cancelled=['Date','Reason'];
        var ref = this.state.FormatDate+"/"+this.state.PNR.substring(0,2)+"/"+this.state.PNR.substring(2);
        var pnr = firebase.database().ref("PNRS/"+ref);

        pnr.once('value').then((snap)=>{
            var data = snap.val();

            if(data.isCancel){
                this.setState({
                    show:cancelled,
                    source:data

                })
            }else{
                this.setState({
                    show:show,
                    source:data

                })
            }


        })

    };
    render(){
        return(
            <div style={{width:800,margin:"auto"}}>
                <div style={{textAlign:"center",margin:"auto",display:"flex",width:800,justifyContent:"space-around",alignItems:"flex-end"}}>
                    <TextField
                        hintText="PNR number"
                        floatingLabelText="PNR"
                        type="text"
                        floatingLabelStyle={{fontSize:18}}
                        onChange={this.handlePnr}
                    />
                    <DatePicker hintText="Select Date of Journey" onChange={this.handleDate} formatDate={this.formatDate} />
                    <RaisedButton onClick={this.GetDetails} primary={true} label="Search PNR" />
                </div>
                <div>
                    <Table selectable={false}>
                        {/*<TableHeader displaySelectAll={false} adjustForCheckbox={false} style={tableHeadStyle} >*/}
                            {/*<TableRow>*/}
                                {/*<TableHeaderColumn style={headerStyle}>ID</TableHeaderColumn>*/}
                                {/*<TableHeaderColumn style={headerStyle}>Seat</TableHeaderColumn>*/}
                                {/*<TableHeaderColumn style={headerStyle}>Price</TableHeaderColumn>*/}
                            {/*</TableRow>*/}
                        {/*</TableHeader>*/}
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.state.show.map((seat,index)=>(
                                    <TableRow key={index}>
                                        <TableRowColumn>{seat}</TableRowColumn>
                                        <TableRowColumn>{this.state.source[seat]}</TableRowColumn>
                                    </TableRow>

                                ))
                            }
                        </TableBody>

                    </Table>
                    <br/>
                </div>

            </div>
        )
    }
}

export default CheckPNR

