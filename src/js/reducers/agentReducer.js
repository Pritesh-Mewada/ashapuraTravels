const seats={
    Buses:{},
    BusName:[]
};

export default (state = seats, action) => {
    switch (action.type){
        case 'AGENT_FETCH_BUS':
            var busname = [];

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



        default:
            return state;
            break;
    }

    return state;


};