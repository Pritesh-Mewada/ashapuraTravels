const seats={
    status:false,
    statement:"Hello this statement is true"
};

export default (state = seats, action) => {
    switch (action.type){
        case 'CLOSE_DIALOG_PROGRESS':
            return Object.assign({},state,{
                status:false
            });

            break;

        case 'OPEN_DIALOG_PROGRESS':
            return Object.assign({},state,{
                status:true,
                statement:action.data
            });
            break;


        default:
            return state;
            break;
    }

    return state;


};