// ./src/reducers/bookReducers.js

const seats={
    Seats:{},
    userBucket:[],
    Buses:{},
    searchedBus:[],
    busLayout:{
        BookingRef: "RangeelaUp3-1-2018",
        BusName: "Rangeela Travels",
        DateStamp: "3/1/2018",
        LayoutName: "rangeelatype1",
        Pricing: {
            SST: 600,
            USSL: 800
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
        txnid:"ashapura"+Math.abs(Math.random()*10000000),
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

};

export default (state = seats, action) => {
    switch (action.type){
        // Check if action dispatched is
        // CREATE_BOOK and act on that
        case 'SLEEPER_CLICK':
            var prevBucket = state.userBucket;
            console.log(prevBucket);
            var prevSeats = state.Seats;

            if(prevSeats[action.seat] && prevSeats[action.seat].isHold==true){
                delete prevSeats[action.seat];
                prevBucket.splice(prevBucket.indexOf(action.seat),1)
            }else{
                prevSeats[action.seat] = {isHold:true};
                prevBucket.push(action.seat);
            }
            return Object.assign({},state,{
                userBucket:prevBucket,
                Seats:prevSeats
            });

            break;
        case 'GOT_BUSES':
            return Object.assign({},state,{
                Buses:action.data
            });
            break;
        case 'SELECT_BUS':
            var searchedBus=[];
            for (var a in state.Buses){
                var bus=state.Buses[a];
                if(bus.From[action.criteria.from]!=null && bus.To[action.criteria.to]){
                    searchedBus.push(a)
                }
            }
            return Object.assign({},state,{
                searchedBus:searchedBus,
                Route:action.criteria
            });
        case 'SHOW_LAYOUT':
            return Object.assign({},state,{
                busLayout:action.data
            });
            break;

        case 'STORE_USER':
            var payment = state.payment;
            payment.firstname = action.data.Name;
            payment.email=action.data.Email;
            payment.phone=action.data.Number;
            payment.productinfo = state.userBucket.toString();
            payment.udf1=state.busLayout.BookingRef;
            return Object.assign({},state,{
                user:action.data,
                payment:payment
            });
        break;

        case 'STORE_HASH':
            var user = state.user;
            user['hash']=action.data;
            return Object.assign({},state,{
                hash:action.data
            });
        break;

        default:
            return state;
            break;
    }

    return state;


};