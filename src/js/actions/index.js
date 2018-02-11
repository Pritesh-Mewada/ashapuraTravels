import { routerActions } from 'react-router-redux'
import * as firebase from 'firebase'
import Axios from 'axios'
const sleeperClicked = (seat,seatType) => {
    return {
        type: 'SLEEPER_CLICK',
        seat: seat,
        seatType:seatType
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

const AgentGetBus=(data)=>{
    return{
        type:"AGENT_FETCH_BUS",
        data:data
    }
};

const StoreBoarding =(point)=>{
    return{
        type:'STORE_BOARDING',
        data:point
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

const StoreRoute=(route)=>{
    return{
        type:'STORE_ROUTE',
        data:route
    }
};


const ClearBucket=()=>{
    return{
        type:'CLEAR_BUCKET',

    }
};

const StoreSeat=(seat)=>{
    return{
        type:'AGENT_STORE_SEAT',
        data:seat
    }
};
const StoreBusBookings=(seat)=>{
    return{
        type:'STORE_BUS_BOOKINGS',
        data:seat
    }
};

const StoreBusHoldings=(seat)=>{
    return{
        type:'STORE_BUS_HOLDINGS',
        data:seat
    }
};

// async calls
const GetHash=(data)=>{
    //dont send the amount let the server to calculate it
    // var preHashString =  data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|' + data.udf1 + '|'+data.udf2+'|||||||||';
    // console.log(preHashString);
    //
    return (dispatch)=>{
        dispatch(OpenProgessDialog("Configuring Please wait"));
        return Axios.post('https://ashapura-travels-8bfb5.firebaseapp.com/gethash',{
            key:data.key,
            txnid:data.txnid,
            productinfo:data.productinfo,
            firstname:data.firstname,
            email:data.email,
            udf1:data.udf1,
            udf2:data.udf2,
            Ref:data.Node,
            udf3:data.udf3,
            seats:data.seats
        }).then(response=>{
          dispatch(Storehash(response.data));
          dispatch(CloseProgressDialog());

        }).catch(error=>{
          throw error
      })

    }
};


const searchBuses =(data)=>{
    return (dispatch)=>{
        dispatch(StoreRoute(data));
        dispatch(OpenProgessDialog("fetching buses"));
        return Axios.post('https://ashapura-travels-8bfb5.firebaseapp.com/getbus',data).then(response=>{
            dispatch(GetBuses(response.data));
            dispatch(CloseProgressDialog());
        }).catch(error=>{
            throw error
        })
    }
};


const fetchBuses = () => {
    return (dispatch) => {
        var buses = firebase.database().ref('Buses');
        return buses.on('value',(data)=>{
            dispatch(AgentGetBus(data.val()))
        })

    };
};
const fetchSeats = (ref) => {
    return (dispatch) => {
        var buses = firebase.database().ref('Bookings/'+ref);
        return buses.on('value',(data)=>{
            dispatch(StoreBusBookings(data.val()))
        })
    };
};


const fetchHoldings = (ref) => {
    return (dispatch) => {
        var buses = firebase.database().ref('Holdings/'+ref);
        return buses.on('value',(data)=>{
            dispatch(StoreBusHoldings(data.val()))
        })
    };
};



const AgentLogin=(email,password)=>{
    return (dispatch) => {
        var signIn = firebase.auth();
        dispatch(OpenProgessDialog("Verifying agent"));
        return signIn.signInWithEmailAndPassword(email, password).then((response)=>{
            dispatch(CloseProgressDialog());
            dispatch(NavigateTo("/app/agent"))
        }).catch(error=>{
            dispatch(CloseProgressDialog());
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
const StoreAgentSeats=(data)=>{
  return{
      type:'AGENT_STORE_SEAT_DATA',
      seats:data
  }
};

const GetSeats=(ref)=>{
//check if the seat is available or not
    return (dispatch) => {
        var Bookings = firebase.database().ref("Bookings/"+ref);
        return Bookings.on('value',(snap)=>{
            dispatch(StoreAgentSeats(snap.val()));

        });
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
};

const AgentBookSelected=(seats)=>{
    console.log(seats)
    return (dispatch) => {
        dispatch(OpenProgessDialog("holding your seats"));
        var book = firebase.database().ref('Bookings/'+seats.Ref.toString());
        var PNRS=[];
        return book.once('value').then((data) => {
               var seatsBooking=data.val();
               if(!seatsBooking){
                    seatsBooking={};
               }
               for(var a in seats.Seats){
                   var newPnr = Math.floor((Math.random()*100000000));
                   PNRS.push({
                       PNR:newPnr,
                       seat:seats.Seats[a],
                       Amount:seats.SeatPrice[seats.Seats[a]].Price
                   });
                   seatsBooking[seats.Seats[a]]={
                        isBooked:true,
                        BookedBy:firebase.auth().currentUser.email,
                        PNR:seats.PNR+""+newPnr,
                   }
               }
               console.log(PNRS);

             return book.set(seatsBooking)
        }).then(()=>{
            var PNR = firebase.database().ref('PNRS').child(seats.Date).child(seats.PNR);
            return PNR.once('value');
        }).then((snap)=>{
            var PNRBook = firebase.database().ref('PNRS').child(seats.Date).child(seats.PNR);
            var oldPnr = snap.val();
            if(!oldPnr){
                oldPnr={};
            }
            for(var object in PNRS){
                oldPnr[PNRS[object].PNR] ={
                    Seats:PNRS[object].seat,
                    Amount:PNRS[object].Amount,
                    Name:seats.CName,
                    BusName:seats.BusName,
                    Number:seats.Number,
                    Point:seats.Point,
                    Departure:seats.Departure,
                    JourneyTime:seats.JourneyTime,
                    Ref:seats.Ref,
                    Journey:seats.Journey,
                    PNR:PNRS[object].PNR,
                }
            }
            return PNRBook.set(oldPnr);
        }).then(()=>{
            dispatch(CloseProgressDialog());
            dispatch(ClearBucket());
            dispatch(handleOpenDialog("Seats Booked"));
        });
    };

};

const BookSelected=(seatsAvailable)=>{
//check if the seat is available or not
    return (dispatch) => {
        var book = firebase.database().ref('Holdings/'+seatsAvailable.Ref.toString());
        return book.once('value')
            .then((data) => {
                var seatsBooking=data.val();
                if(!seatsBooking){
                    seatsBooking={};
                }
                for(var a in seatsAvailable.Seats){

                    if(!seatsBooking[seatsAvailable.Seats[a]]){
                        //inflate the seat object
                        seatsBooking[seatsAvailable.Seats[a]]={
                            isHold:(new Date().toJSON()),
                            Name:seatsAvailable.Name,
                            Number:seatsAvailable.Number
                        }
                    }else{
                        var getdate = new Date(seatsBooking[seatsAvailable.Seats[a]].isHold);
                        var diff= Math.ceil(((new Date()).getTime()-getdate.getTime())/60000);
                        if(diff>15){
                            //inflate the seat object
                            seatsBooking[seatsAvailable.Seats[a]]={
                                isHold:(new Date().toJSON()),
                                Name:seatsAvailable.Name,
                                Number:seatsAvailable.Number
                            }
                        }else{
                            seatsBooking={};
                            dispatch(handleOpenDialog("Some seats are Not Availabe please implement refresh seat action"));
                            return
                        }
                    }
                }

                book.set(seatsBooking).then(()=>{
                    dispatch(ClearBucket())
                })



            });
    };
};



export {AgentLogin,fetchHoldings,GetSeats,fetchSeats,AgentBookSelected,StoreBoarding,StoreSeat,CancelBlockDate,CancelBlock,GetHash,GetUser,fetchBuses,NavigateTo,BlockBus,BookSelected,showBusLayout,sleeperClicked,OpenProgessDialog,CloseProgressDialog,GetBuses,handleOpenDialog,handleCloseDialog,searchBuses,BookSlot}