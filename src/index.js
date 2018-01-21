import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from "redux-logger"
import allReducers from '../src/js/reducers';
import App from '../src/js/components/App';
import {ConnectedRouter as Router,routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import * as firebase from 'firebase';
require('./css/style.css')
var config = {
    apiKey: "AIzaSyC73vQqaQAZ-1njlCV-Wfe9qHYRA78QzuI",
    authDomain: "ashapura-travels-8bfb5.firebaseapp.com",
    databaseURL: "https://ashapura-travels-8bfb5.firebaseio.com",
    projectId: "ashapura-travels-8bfb5",
    storageBucket: "",
    messagingSenderId: "24479807923"
};
firebase.initializeApp(config);

const history =createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    allReducers,
    applyMiddleware(thunk,createLogger(), promise,middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
