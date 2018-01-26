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
        type:'ACTION_DONE'
    }
};

const NavigateTo=(location)=>{
    // check all the required credentials before navigating
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


// async calls
const GetHash=(data)=>{
    //dont send the amount let the server to calculate it
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

const fetchBuses = () => {
    return (dispatch) => {
        var buses = firebase.database().ref('Buses');
        return buses.on('value',(data)=>{
            dispatch(GetBuses(data.val()))
        })

    };
};


const AgentLogin=(email,password)=>{
    return (dispatch) => {
        var signIn = firebase.auth();
        dispatch(OpenProgessDialog("Verifying agent"));
        return signIn.signInWithEmailAndPassword(email, password).then((response)=>{
            dispatch(CloseProgressDialog());
        }).catch(error=>{
            dispatch(CloseProgressDialog())
            dispatch(handleOpenDialog("Error wrong credentials"));
        });
    };
};


const BookSlot=(data)=>{
//check if the seat is available or not
    return (dispatch) => {
        var slot = firebase.database().ref('Buses/'+data.bus+'/Prices/Slots');
        return slot.push().set({
            from:data.from,
            to:data.to,
            SSL:data.ssl,
            SST:data.sst
        }).then(()=>{
            dispatch(temp())
        })
    };
};

const BlockBus=(datesArrayObject)=>{
//check if the seat is available or not
    return (dispatch) => {
        var slot = firebase.database().ref('Buses').child(datesArrayObject.bus).child('Availability');
        return slot.once('value').then((data)=>{
            var dataDates =data.val();
            if(!dataDates){
                dataDates=[];
            }
            dataDates=dataDates.concat(datesArrayObject.dates);

            return slot.set(dataDates)
        }).then(()=>{
            dispatch(temp());
        })
    };
};


const CancelBlock=(Block)=>{
    return (dispatch) => {
        var slot = firebase.database().ref('Buses').child(Block.bus).child("Prices").child("Slots").child(Block.id);
        return slot.set(null).then(()=>{
            dispatch(temp());
        })
    };
}


const CancelBlockDate=(Block)=>{
    return (dispatch) => {
        var slot = firebase.database().ref('Buses').child(Block.bus).child("Availability");
        return slot.set(Block.dates).then(()=>{
            dispatch(temp());
        })
    };
}

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


export {AgentLogin,CancelBlockDate,CancelBlock,GetHash,GetUser,NavigateTo,BlockBus,BookSelected,showBusLayout,sleeperClicked,OpenProgessDialog,CloseProgressDialog,GetBuses,handleOpenDialog,handleCloseDialog,fetchBuses,searchBuses,BookSlot}