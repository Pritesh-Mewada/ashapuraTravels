import React from 'react'
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {GetHash} from '../actions/index'

class GetPrice extends React.Component{
    render(){
        var type = this.props.seat.slice(-2);
        switch (type){
            case "SL" :
                return(
                    <span>{this.props.price.USSL}</span>
                );
            case "ST" :
                return(
                    <span>{this.props.price.SST}</span>
                );
            default:
                return(
                    <span>Error please report with screenShot</span>
                )
        }
    }
}

class CalculateTotalCost extends React.Component{
    constructor(props){
        super(props);
        var seats = this.props.seats;
        var totalprice=0;
        for (var seat in seats){
            var type = seats[seat].slice(-2);
            switch (type){
                case "SL" :
                    totalprice = totalprice+this.props.price.USSL;
                    break;
                case "ST" :
                    totalprice = totalprice+this.props.price.SST;
                    break;
                default:
                    break;
            }
        }
       this.state={
            Total:totalprice,
            Payment:0.02*totalprice
        }

    }

    render(){
        return(
            <div>
                <div className="totalPrice">
                    <div>Payment Gateway Charge (2%)</div>
                    <div>{this.state.Payment}</div>
                </div>
                <br/>
                <div className="totalPrice">
                    <div>Total Payment</div>
                    <div>{this.state.Payment+this.state.Total}</div>
                </div>
            </div>

        )
    }
}
const tableHeadStyle={
    height:50,
    background: "linear-gradient(-151deg, rgba(30,128,197,0.5), rgba(99,231,177,0.5) )",

};
const headerStyle={
    color:"#fff",
    fontWeight:600,
    fontSize:18
};
class ShowPricesTable extends  React.Component{

    constructor(props){
        super(props);
        this.GetHash=this.GetHash.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    handleSubmit(e){
        e.preventDefault();
    }


    GetHash(){
        this.props.hash(this.props.payment)
    }
    render(){
        this.GetHash();
        return(

                <div>
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={tableHeadStyle} >
                            <TableRow>
                                <TableHeaderColumn style={headerStyle}>ID</TableHeaderColumn>
                                <TableHeaderColumn style={headerStyle}>Seat</TableHeaderColumn>
                                <TableHeaderColumn style={headerStyle}>Price</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.props.bucket.map((seat,index)=>(
                                    <TableRow key={index}>
                                        <TableRowColumn>{index}</TableRowColumn>
                                        <TableRowColumn>{seat}</TableRowColumn>
                                        <TableRowColumn><GetPrice seat={seat} price={this.props.price}/></TableRowColumn>
                                    </TableRow>

                                ))
                            }
                        </TableBody>
                    </Table>

                    {/*<RaisedButton primary={true} onClick={this.GetHash} label="gethash"/>*/}

                    <CalculateTotalCost seats={this.props.bucket} price={this.props.price}/>
                    <br/>
                </div>

        )

    }

}
const mapStateToProps = (state)=> {
    return {
        bucket:state.sleeper.userBucket,
        price:state.sleeper.busLayout.Pricing,
        user:state.sleeper.user,
        payment:state.sleeper.payment
    };
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    const actions={
        hash:GetHash
    };
    return bindActionCreators(actions, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(ShowPricesTable);

