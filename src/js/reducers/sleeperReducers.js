// ./src/reducers/bookReducers.js


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
    busLayout:{
        Ref: "RangeelaUp3-1-2018tESST",
        Name: "Rangeela Travels",
        DateStamp: "3/1/2018",
        Layout: "rangeelatype1",
        Price: {
            ST: 600,
            SL: 800
        }

    },
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
            var latest =action.seat;
            var payment =state.payment;

            if(Seats[action.seat] && Seats[action.seat].isHold===true){
                delete Seats[action.seat];
                total = total-state.busLayout.Price[action.seatType];
                userBucket.splice(userBucket.indexOf(action.seat),1);
                if(latest==action.seat){
                    latest=null
                }
            }else{
                Seats[action.seat] = {isHold:true};
                userBucket.push(action.seat);
                total = total+state.busLayout.Price[action.seatType]
            }
            payment.amount = total;
            payment.productinfo = userBucket.toString();

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

            var reqData = {
                Ref:action.data.Ref,
                Name:action.data.Name,
                PNR:action.data.PNR,
                Time:action.data.Time,
                Departure:action.data.Departure,

            };


            console.log(JSON.stringify(reqData));

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
                Journey:state.Route.from+" To "+state.Route.to
            }

            payment.udf1 = JSON.stringify(reqData);
            payment.udf2 = JSON.stringify(reqData2);
            payment.productinfo = state.userBucket.toString();

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

        default:
            return state;
            break;
    }

    return state;


};