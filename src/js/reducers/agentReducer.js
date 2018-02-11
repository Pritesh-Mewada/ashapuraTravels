const seats={
    Buses:{},
    BusName:[],
    Seats:null,
};
var busname,data,Seats,seatData
;
export default (state = seats, action) => {
    switch (action.type){
        case 'AGENT_FETCH_BUS':

            busname=[];

            for (var name in action.data){
                busname.push(name);
            }

            return Object.assign({},state,{
                Buses:action.data,
                BusName:busname
            });

            break;

        case 'OPEN_DIALOG':
            return Object.assign({},state,{
                status:true,
                statement:action.data
            });
            break;


        case 'AGENT_STORE_SEAT':

            return Object.assign({},state,{
                seat:action.data
            });
            break;

        case 'AGENT_STORE_SEAT_DATA':
            Seats=[];
            data = action.seats;
            if(data!=null){
                seatData ={};
                for(var seat in data){
                    seatData = data[seat];
                    seatData["No"] = seat
                    Seats.push(seatData);
                }
                return{...state,Seats}
            }else{

            }

            break;

        default:
            return state;
            break;
    }

    return state;


};