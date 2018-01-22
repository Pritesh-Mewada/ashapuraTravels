const functions = require('firebase-functions');
const express =require('express');
const app = express();
const sha512 = require('js-sha512');
const bodyParser = require('body-parser');
const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyC73vQqaQAZ-1njlCV-Wfe9qHYRA78QzuI",
    authDomain: "ashapura-travels-8bfb5.firebaseapp.com",
    databaseURL: "https://ashapura-travels-8bfb5.firebaseio.com",
    projectId: "ashapura-travels-8bfb5",
    storageBucket: "",
    messagingSenderId: "24479807923"
};
firebase.initializeApp(config);
const db = firebase.database();

app.use(bodyParser());

app.engine('html',require('ejs').renderFile);

app.post('/success',(request,response)=>{
    console.log(request.body);
    var seats = request.body.productinfo.split(" ");

    var book = firebase.database().ref('Bookings/'+request.body.udf1.toString());
    book.once('value').then((data) => {
            var seatsBooking=data.val();
            if(!seatsBooking){
                seatsBooking={};
            }
            for(var a in seats){
                seatsBooking[seats[a]]={isBooked:true}
            }
            book.set(seatsBooking).then(()=>{
                response.send("Your ticket has been done successfully enjoy your journey")
            })
        });
    });


app.get("/get",(request,response)=>{
    response.send("hello")
});

app.post('/failure',(request,response)=>{
    response.render('failure.html');
});

app.post('/gethash',(request,response)=>{
    var salt = 'eCwWELxi';
    var hash = sha512(request.body.preHashString + salt);
    response.send(hash);
});


exports.app = functions.https.onRequest(app);
// app.listen(5001,function () {
//     console.log("started successfully");
// })
