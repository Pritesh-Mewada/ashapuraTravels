const functions = require('firebase-functions');
const express =require('express');
const app = express();
const sha512 = require('js-sha512');
const bodyParser = require('body-parser');
const firebase = require('firebase');
var ejs = require('ejs');
var fs = require('fs');
var msg91 = require('msg91-sms');
var nodemailer = require('nodemailer');
var paykey ="gtKFFx";
var salt = 'eCwWELxi';

var firebaseLogin ={
    user:"server@ashapura.com",
    password:"AShaPura@TraVels"
};




FirebaseSign=()=>{
    var signIn = firebase.auth();
    return signIn.signInWithEmailAndPassword(firebaseLogin.user, firebaseLogin.password).then((response)=>{
        console.log("Server Signed in "+(new Date).toDateString()+response.toString());
    }).catch(error=>{
        console.log("Error Emergency Contact the support",error.toString())
    });
}
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

BookTickets=(req,res)=>{
    var writeEmail = firebase.auth().currentUser.email;
    console.log(writeEmail);
    const {productinfo,firstname,amount,txnid,mihpayid,phone,email} = req.body;
    var  udf1 = req.body.udf1;
    var udf2 = req.body.udf2;
    udf1 = JSON.parse(udf1.replace(/&quot;/g,'"'));
    udf2 = JSON.parse(udf2.replace(/&quot;/g,'"'));

    console.log(JSON.stringify(udf1));
    console.log(JSON.stringify(udf2));

    var newPnr = Math.floor((Math.random()*100000000));
    var book = firebase.database().ref('Bookings/'+udf1.Ref.toString());
    var bookInfo={};
    return book.once('value').then((data) => {
        var seatsBooking = data.val();
        if (!seatsBooking) {
            seatsBooking = {};
        }
        var seats = productinfo.split(" ");

        for (var a in seats) {
            seatsBooking[""+seats[a]] = {
                isBooked: true,
                BookedBy:writeEmail,
                PNR:udf1.PNR+""+newPnr
            };
        }

        return book.set(seatsBooking)
    }).then(()=>{

            var pnr =firebase.database().ref('PNRS').child(udf1.PNR).child(newPnr);

            console.log("my new pnr is ",udf1.PNR+""+newPnr);
            bookInfo ={
                Seats:productinfo,
                Amount:amount,
                Name:firstname,
                BusName:udf1.Name,
                Ref:udf1.Ref,
                Departure:udf1.Departure,
                JourneyTime:udf1.Time,
                Transaction:txnid,
                mihpay:mihpayid,
                Point:udf1.Point,
                Number:phone,
                PNR:udf1.PNR+""+newPnr,
                Journey:udf2.Journey
            };
            return pnr.set(bookInfo)
        }).then(()=>{
            sendEmail(email,bookInfo)
            res.send("Successfull");
    })

};

app.post('/success',(request,res)=>{
    console.log(request.body);
    const {status,udf1,email,firstname,productinfo,amount,txnid,hash,udf2} =request.body;
    var hashcheck = sha512(salt+'|'+status+'|||||||||'+udf2+'|'+udf1+'|'+email+'|'+firstname+'|'+productinfo+'|'+amount+'|'+txnid+'|'+paykey);
    if(hashcheck===hash){
        console.log("Perfect hash");
    }else{
        res.send("Sorry invalid transaction");
        return;
    }

    if(firebase.auth().currentUser ==null){
        var signIn = firebase.auth();
        return signIn.signInWithEmailAndPassword(firebaseLogin.user, firebaseLogin.password).then((response)=> {
            console.log("Server Signed in " + (new Date).toDateString());
            BookTickets(request,res);
        });

    }else{
        BookTickets(request,res);
    }


});


sendEmail=(email, info)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'mewadapritesh1996@gmail.com',
            clientId: '705908929615-scbnm2vsjt80lsmaonnaougvmoreej0g.apps.googleusercontent.com',
            clientSecret: '2iBLrBMfxCf9Kk3YV5QVsKgu',
            refreshToken: '1/CnhK3hrYSSzvLWgJlhOZJTxvuWsauBoG1_BW2hU-WqM',

        },
    });

    fs.readFile(__dirname+"/templates/ticket/email.ejs", 'utf8', function(err, contents) {
        var data = ejs.render(contents,info);
        var mailOptions = {
            from: 'mewadapritesh1996@gmail.com',
            to: email,
            subject: 'Ticket Confirmation from Ashapura Travels',
            html:data

        };


        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);

            }
        });
    });
};

formatDate=(date)=>{
    var returnDate="";

    var month =["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    returnDate = date.getDate()+" "+month[date.getMonth()]+" "+date.getFullYear();

    var hours =date.getHours();

    if(hours>=12){
        returnDate = returnDate+" "+(hours-12)+"pm";
    }else{
        returnDate = returnDate+" "+(hours)+"am";
    }

    return returnDate;
};
setPrice =(bus,date,busDeparture,busarrival,totaltime)=>{
    var renderBus ={
        Ref:bus.BookingRef+date,
        Name:bus.Name,
        Price:{
            SL:bus.Prices.SL,
            ST:bus.Prices.ST

        },
        Departure:formatDate(busDeparture),
        Arrival:formatDate(busarrival),
        Time:totaltime,
        Layout:bus.Layout,
        Services:bus.Services,
        Boarding:bus.Boarding,
        PNR:bus.PNR
    };

    if(bus.Prices.Slots){
        for(var a in bus.Prices.Slots){

            var currentDate= Date.parse(date);
            var slot = bus.Prices.Slots[a];
            var from = Date.parse(slot.from);
            var to =Date.parse(slot.to);

            if(currentDate >= from && currentDate <= to){

                renderBus.Price.SL = slot.SSL;
                renderBus.Price.ST = slot.SST;
            }
        }
    }
    return renderBus;
};

app.get('/sendSms',(req,res)=>{

    const authkey='196457AP6IC0vRliF5a7593e6';
    //for single number
    var number='+919172977934';
    //message
    var message='Hello i am message';
    //Sender ID
    var senderid='ASHAPU';
    //Route
    var route='4';
    //Country dial code
    var dialcode='91';
    //send to single number
    msg91.sendOne(authkey,number,message,senderid,route,dialcode,function(response){

        //Returns Message ID, If Sent Successfully or the appropriate Error Message
        console.log(response);
        res.send("successfull")

    });

});

app.post("/getbus",(req,res)=>{
    var bus = firebase.database().ref('Buses');
    var sendbus=[];
    console.log(req.body);
    var today = req.body.date;
    bus.once('value').then((data)=>{
        var buses = data.val();

        for (var  busName in buses){
            var busObject = buses[busName];
            if(busObject.From[req.body.from] && busObject.To[req.body.to]   ){
                var busDeparture = new Date(new Date(Date.parse(today)).getTime()+1000*60*60*busObject.From[req.body.from]);
                var busArrival = new Date(new Date(Date.parse(today)).getTime()+1000*60*60*busObject.To[req.body.to]);
                var totalJourney = busObject.To[req.body.to]-busObject.From[req.body.from];
                console.log(busDeparture.toString(),busArrival.toString());
                if((!busObject.Availability || busObject.Availability.indexOf(today)<0) &&  busDeparture >(new Date())){
                    sendbus.push(setPrice(busObject,today,busDeparture,busArrival,totalJourney))
                }
            }
        }

        res.send(JSON.stringify(sendbus));

    })


});

app.get("/hello",(request,response)=>{
    response.send("all set")
});

app.get("/get",(request,response)=>{
    response.send("hello")
});

app.post('/failure',(request,response)=>{
    response.render('failure.html');
});

app.post('/gethash',(request,response)=>{
    var hash = sha512(request.body.preHashString + salt);
    response.send(hash);
});

app.get("/get",(req,res)=>{
    res.render('templates/ticket/html', {
        name:"Pritesh Mewada"
    });
});

//exports.app = functions.https.onRequest(app);
app.listen(5000,function () {
    console.log("started successfully");
})
