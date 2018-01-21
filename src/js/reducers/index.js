import {combineReducers} from 'redux';
import sleeperReducer from './sleeperReducers'
import defaultSeats from './defaultSeats'
import alertDialogueReducer from './alertDialogueReducer'
import progressDialogueReducer from './progressDialogueReducer'
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

import {routerReducer} from 'react-router-redux'
const allReducers = combineReducers({
    sleeper:sleeperReducer,
    Dialog:alertDialogueReducer,
    router:routerReducer,
    ProgressDialogue:progressDialogueReducer
});

export default allReducers
