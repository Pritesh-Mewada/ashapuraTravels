import { routerActions } from 'react-router-redux'
import * as firebase from 'firebase'
import Axios from 'axios'
const sleeperClicked = (seat) => {
    return {
        type: 'SLEEPER_CLICK',
        seat: seat
    }
};
const GetBuses = (data)=>{
    return{
        type:'GOT_BUSES',
        data:data
    }
};
const handleOpenDialog=(data)=>{
    return{
        type:'OPEN_DIALOG',
        data:data
    }
};
const handleCloseDialog=()=>{
    return{
        type:'CLOSE_DIALOG'
    }
};

const GetUser=(user)=>{
    return{
        type:'STORE_USER',
        data:user
    }
};

const OpenProgessDialog=(data)=>{
    return{
        type:'OPEN_DIALOG_PROGRESS',
        data:data
    }
};
const CloseProgressDialog=()=>{
    return{
        type:'CLOSE_DIALOG_PROGRESS'
    }
};

const fetchBuses = () => {
    return (dispatch) => {
        var buses = firebase.database().ref('Buses');
        return buses.once('value')
            .then((data) => {
                dispatch(GetBuses(data.val()))
            });
    };
};



const searchBuses =(data)=>{
    return{
        type:'SELECT_BUS',
        criteria:data
    }
};



const showBusLayout =(data)=>{
    return{
        type:'SHOW_LAYOUT',
        data:data
    }
};

const temp =()=>{
    return{
        type:'temp'
    }
};

const NavigateTo=(location)=>{
    return (dispatch) => {
        dispatch(routerActions.push(location));
    }

};

const Storehash=(hash)=>{
    return{
        type:'STORE_HASH',
        data:hash
    }
};


const GetHash=(data)=>{
    var preHashString =  data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|' + data.udf1 + '||||||||||';
    console.log(preHashString);
    var post ={
        preHashString:preHashString

    };
    return (dispatch)=>{
      return Axios.post('https://ashapura-travels-8bfb5.firebaseapp.com/gethash',post).then(response=>{
          dispatch(Storehash(response.data))
      }).catch(error=>{
          throw error
      })
  }
};


const BookSelected=(seatsAvailable)=>{
//check if the seat is available or not
    return (dispatch) => {
        var book = firebase.database().ref('Bookings/'+seatsAvailable.BookingRef.toString());
        return book.once('value')
            .then((data) => {
               var seatsBooking=data.val();
                if(!seatsBooking){
                    seatsBooking={};
                }
               for(var a in seatsAvailable.Seats){

                   if(!seatsBooking[seatsAvailable.Seats[a]]){
                        //inflate the seat object
                        seatsBooking[seatsAvailable.Seats[a]]={isHold:(new Date()).toJSON()}
                   }else{
                        var getdate = new Date(seatsBooking[seatsAvailable.Seats[a]].isHold);
                        var diff= Math.ceil(((new Date()).getTime()-getdate.getTime())/60000);
                        if(diff>15){
                            //inflate the seat object
                            seatsBooking[seatsAvailable.Seats[a]]={isHold:(new Date()).toJSON()}
                        }else{
                            seatsBooking={};
                            dispatch(handleOpenDialog("Some seats are Not Availabe please implement refresh seat action"));
                            return
                        }
                    }
                }

                book.set(seatsBooking).then(()=>{
                   dispatch(temp())
                })



            });
    };

};


export {GetHash,GetUser,NavigateTo,BookSelected,showBusLayout,sleeperClicked,OpenProgessDialog,CloseProgressDialog,GetBuses,handleOpenDialog,handleCloseDialog,fetchBuses,searchBuses}