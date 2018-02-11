var user={
        name:"Pritesh Mewada",
        address:"Ghartan pada no 2",
        number:"8097394573",
        mail:"mewadapritesh5@gmail.com"
};
const seats={
    Seats:{},
    userBucket:[],
    searchedBus:[],
    total:0,
    user:{
        name:"Pritesh Mewada",
        address:"Ghartan pada no 2",
        number:"8097394573",
        mail:"mewadapritesh5@gmail.com"
    },

    payment:{
        key:"gtKFFx",
        txnid:"ashapura233"+Math.floor(Math.random()*1000000),
        amount:2,
        productinfo:"productinfo",
        firstname:"priteshname",
        email:"mewadapritesh5@gmail.com",
        surl:"heydemo",
        furl:"heydemo",
        phone:"+919172977934",
        udf1:JSON.stringify(user),
        udf2:"",
        service_provider:"payu_paisa"
    }

};
export default (state = seats, action) => {
    switch (action.type){
        case 'SLEEPER_CLICK':
            var userBucket = state.userBucket;
            var total=state.total;
            var Seats = state.Seats;
            var latest=null;
            var payment =state.payment;

            if(Seats[action.seat] && Seats[action.seat].isHold===true){
                delete Seats[action.seat];
                total = total-state.busLayout.Price[action.seatType];
                userBucket.splice(userBucket.indexOf(action.seat),1);
                if(latest==action.seat){
                    latest=null
                }
            }else{
                Seats[action.seat] = {
                    isHold:true,
                    Type:action.seatType,
                    Price:state.busLayout.Price[action.seatType],
                    No:action.seat
                };
                userBucket.push(action.seat);
                total = total+state.busLayout.Price[action.seatType]
                latest=action.seat;
            }
            payment.amount = total;
            payment.productinfo = userBucket.toString();
            payment.seats = JSON.stringify(Seats);

            return {...state,
                userBucket,
                Seats,
                latest,
                total,
                payment
            };
            break;
        case 'GOT_BUSES':
            return Object.assign({},state,{
                Buses:action.data,
            });
            break;
        case 'STORE_ROUTE':
            // check the date of availability
            return Object.assign({},state,{
                Route:action.data
            });

        case 'SHOW_LAYOUT':
            var payment = state.payment;

            var userBucket = [];
            var busLayout = action.data;

            var boarding = busLayout.Boarding;
            var temp=[];
            for (var a in boarding){
                temp.push(boarding[a]);
            }
            busLayout.Boarding=temp;

            var reqData = {
                Ref:action.data.Ref,
                Name:action.data.Name,
                PNR:action.data.PNR,
                Time:action.data.Time,
                Departure:action.data.Departure,
            };


            payment['Node']=action.data.Node;
            payment['udf1'] = JSON.stringify(reqData);
            return {...state,busLayout,userBucket,payment};

        case 'STORE_USER':
            var hash = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789uvwxyzABCDEFGHI";
            var random8 = '';
            for(var i = 0; i < 10; i++){
                random8 += hash[parseInt(Math.random()*hash.length)];
            }

            var layout = state.busLayout;
            var payment = state.payment;
            payment.firstname = action.data.Name;
            payment.email=action.data.Email;
            payment.phone="+91"+action.data.Number;

            var reqData = {
                Ref:layout.Ref,
                Name:layout.Name,
                PNR:layout.PNR,
                Time:layout.Time,
                Departure:layout.Departure,
                Point:layout.Point,
            };

            var reqData2={
                Journey:state.Route.from+" To "+state.Route.to,
                Date:state.Route.date
            };

            payment.udf1 = JSON.stringify(reqData);
            payment.udf2 = JSON.stringify(reqData2);


            var tempprice=[];
            for (var a in state.userBucket){

                tempprice.push(state.Seats[state.userBucket[a]].Price);
            }

            payment.productinfo = state.userBucket.toString();
            payment.udf3=tempprice.toString();
            payment.seats = JSON.stringify(state.Seats)
            return Object.assign({},state,{
                user:action.data,
                payment:payment
            });

            break;
        case 'STORE_HASH':
            var payment = state.payment;
            payment['hash'] =action.data;
            return {...state,
                payment
            };

        break;

        case 'STORE_BOARDING':

            var busLayout = state.busLayout;
            busLayout['Point'] = action.data;
            return{...state,
                busLayout};

        case 'CLEAR_BUCKET':
            var userBucket =[];
            var Seats={};
            var total={};
            return{...state,userBucket,Seats,total};
            break;

        case 'STORE_BUS_BOOKINGS':
            console.log(action);
            var Bookings = action.data;

            return{...state,Bookings}
            break;
        case 'STORE_BUS_HOLDINGS':
            var temp = action.data;
            var Holdings={};
            if(temp){
                for (var a in temp){
                    var getdate = new Date(temp[a].isHold);
                    var diff= Math.ceil(((new Date()).getTime()-getdate.getTime())/60000);
                    if(diff<10){
                        Holdings[a]={
                            isHold:true,
                            Number:temp[a].Number,
                            Name:temp[a].Name
                        }
                    }
                }
            }
            return{...state,Holdings}
            break;
        default:
            return state;
            break;
    }

    return state;


};