import React from 'react'
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import {GetHash} from '../actions/index'

class GetPrice extends React.Component{
    constructor(props){
        super(props)
    }


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

class ShowPricesTable extends  React.Component{
    constructor(props){
        super(props);
        this.GetHash=this.GetHash.bind(this);
        this.submitForm=this.submitForm.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state ={
            payment:{
                key:"gtKFFx",
                txnid:"priteshtxid"+Math.abs(Math.random()*10000),
                amount:2,
                productinfo:"productinfo",
                firstname:"priteshname",
                email:"mewadapritesh5@gmail.com",
                surl:"heydemo",
                furl:"heydemo",
                phone:"9172977934",
                udf1:"ello",
                service_provider:"payu_paisa"
            }

        }
    }
    submitForm(){
        this.refs.formToSubmit.submit();
    }
    handleSubmit(e){
        e.preventDefault();
    }
    GetHash(){

        this.props.hash(this.state.payment)
    }
    render(){
        console.log(this.props.user);
        return(

                <div>
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Seat</TableHeaderColumn>
                                <TableHeaderColumn>Price</TableHeaderColumn>
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
                    <CalculateTotalCost seats={this.props.bucket} price={this.props.price}/>
                    <br/>
                    <RaisedButton label="Get Hash" secondary={true} fullWidth={true} onClick={this.GetHash} />

                    <RaisedButton label="Proceed to pay" primary={true} fullWidth={true} onClick={this.submitForm} />
                    <form ref="formToSubmit" id="paymentForm" action='https://test.payu.in/_payment' method='post'>
                        <input type="hidden" name="key" value={this.state.payment.key} />
                        <input type="hidden" name="txnid" value={this.state.payment.txnid} />
                        <input type="hidden" name="amount" value={this.state.payment.amount} />
                        <input type="hidden" name="productinfo" value={this.state.payment.productinfo} />
                        <input type="hidden" name="firstname" value={this.state.payment.firstname} />
                        <input type="hidden" name="udf1" value={this.state.payment.udf1} />
                        <input type="hidden" name="email" value={this.state.payment.email} />
                        <input type="hidden" name="phone" value={this.state.payment.phone} />
                        <input type="hidden" name="lastname" value={this.state.payment.firstname} />
                        <input type="hidden" name="surl" value="https://ashapura-travels-8bfb5.firebaseapp.com/success" />
                        <input type="hidden" name="furl" value="https://ashapura-travels-8bfb5.firebaseapp.com/failure" />
                        <input type="hidden" name="hash" id="hash" value={this.props.hashvalue}/>
                    </form>
                </div>

        )

    }

}
const mapStateToProps = (state)=> {
    return {
        bucket:state.sleeper.userBucket,
        price:state.sleeper.busLayout.Pricing,
        user:state.sleeper.user,
        hashvalue:state.sleeper.hash
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

