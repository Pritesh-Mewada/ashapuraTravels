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
};

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

//app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');

BookTickets=(req,res)=>{
    console.log(req.body);
    var writeEmail = firebase.auth().currentUser.email;
    const {firstname,amount,txnid,mihpayid,phone,email} = req.body;
    var udf1 = req.body.udf1;
    var udf2 = req.body.udf2;
    var udf3 = req.body.udf3;
    var productinfo =req.body.productinfo;
    udf1 = JSON.parse(udf1.replace(/&quot;/g,'"'));
    udf2 = JSON.parse(udf2.replace(/&quot;/g,'"'));
    udf3 =udf3.split(",");


    var PNRS=[];
    var sendPNR=[];
    var book = firebase.database().ref('Bookings/'+udf1.Ref.toString());
    var bookInfo={};
    return book.once('value').then((data) => {
        var seatsBooking = data.val();
        if (!seatsBooking) {
            seatsBooking = {};
        }
        var seats = productinfo.split(" ");
        for (var a in seats) {
            var newPnr = Math.floor((Math.random()*100000000));
            console.log(a);
            PNRS.push({
                PNR:newPnr,
                seat:productinfo[a],
                Amount:udf3[a]
            });
            sendPNR.push(udf1.PNR+""+newPnr);
            seatsBooking[""+seats[a]] = {
                isBooked: true,
                BookedBy:writeEmail,
                PNR:udf1.PNR+""+newPnr
            };
        }
        return book.set(seatsBooking)
    }).then(()=>{
        var pnr =firebase.database().ref('PNRS').child(udf2.Date).child(udf1.PNR);
        return pnr.once('value');

    }).then((snap)=>{
        var PNRdata =snap.val();
        var pnr =firebase.database().ref('PNRS').child(udf2.Date).child(udf1.PNR);
        if(!PNRdata){
            PNRdata={}
        }
        for (var a in PNRS){
            PNRdata[PNRS[a].PNR]={
                Seats:PNRS[a].seat,
                Amount:PNRS[a].Amount,
                Name:firstname,
                BusName:udf1.Name,
                Ref:udf1.Ref,
                Departure:udf1.Departure,
                JourneyTime:udf1.Time,
                Transaction:txnid,
                mihpay:mihpayid,
                Point:udf1.Point,
                Number:phone,
                PNR:udf1.PNR+""+PNRS[a].PNR,
                Journey:udf2.Journey
            }
        }
        return pnr.set(PNRdata);
    }).then(()=>{
        var bookInfo={
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
            PNR:sendPNR,
            Journey:udf2.Journey
        };
        sendEmail(email,bookInfo);
        //send sms function
        res.render('success.ejs',bookInfo);
    });

};

app.post('/success',(request,res)=>{

    const {status,udf1,email,firstname,productinfo,amount,txnid,hash,udf2,udf3} =request.body;
    var hashcheck = sha512(salt+'|'+status+'||||||||'+udf3+'|'+udf2+'|'+udf1+'|'+email+'|'+firstname+'|'+productinfo+'|'+amount+'|'+txnid+'|'+paykey);
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

GetPrice=(bus,date)=>{
    var SL=parseInt(bus.Prices.SL);
    var ST=parseInt(bus.Prices.ST);
    console.log(SL,ST);

    if(bus.Prices.Slots){
        for(var a in bus.Prices.Slots){
            var currentDate= new Date(Date.parse(date));
            var slot = bus.Prices.Slots[a];
            var from = new Date(Date.parse(slot.from));
            var to = new Date(Date.parse(slot.to));

            console.log(from.toDateString(),currentDate.toDateString(),to.toDateString());
            console.log(slot.SSL,slot.SST);
            var SlotSSl =parseInt(slot.SSL);
            var SlotSST = parseInt(slot.SST);
            if(currentDate >= from && currentDate <= to){
                if(SlotSSl>=SL){
                    SL=slot.SSL
                }
                if(SlotSST>=ST){
                    ST=slot.SST
                }
            }
        }
    }

    return{
        SL:parseInt(SL),
        ST:parseInt(ST)
    }

};
setPrice =(bus,date,busDeparture,busarrival,totaltime,busname)=>{
    var price =GetPrice(bus,date);
    console.log(price);
    var renderBus ={
        Ref:bus.BookingRef+date,
        Name:bus.Name,
        Price:{
            SL:price.SL,
            ST:price.ST

        },
        Departure:formatDate(busDeparture),
        Arrival:formatDate(busarrival),
        Time:totaltime,
        Layout:bus.Layout,
        Services:bus.Services,
        Boarding:bus.Boarding,
        PNR:bus.PNR,
        Node:busname
    };

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
            if(busObject.From[req.body.from] && busObject.To[req.body.to]){
                var busDeparture = new Date(new Date(Date.parse(today)).getTime()+1000*60*60*busObject.From[req.body.from]);
                var busArrival = new Date(new Date(Date.parse(today)).getTime()+1000*60*60*busObject.To[req.body.to]);
                var totalJourney = busObject.To[req.body.to]-busObject.From[req.body.from];
                console.log(busDeparture.toString(),busArrival.toString());
                var currentTime = new Date();
                currentTime.setHours(currentTime.getUTCHours()+5);
                currentTime.setMinutes(currentTime.getUTCMinutes()+30);


                if((!busObject.Availability || busObject.Availability.indexOf(today)<0) &&  busDeparture >(currentTime)){
                    sendbus.push(setPrice(busObject,today,busDeparture,busArrival,totalJourney,busName))
                }
            }
        }

        res.send(JSON.stringify(sendbus));

    })


});

app.get("/serverTime",(request,response)=>{
    var date = new Date();
    date.setHours(date.getUTCHours()+5);
    date.setMinutes(date.getUTCMinutes()+30);
    response.send(date.toLocaleTimeString());
});



app.get("/app/*",(request,response)=>{
    response.redirect("https://ashapura-travels-8bfb5.firebaseapp.com")
});


app.post('/failure',(request,response)=>{
    response.render('failure.html');
});




app.post('/gethash',(request,response)=>{
    console.log(request.body)
    var {Ref,date,productinfo,key,txnid,firstname,email,udf1,udf2,udf3,seats}=request.body;
    var bus = firebase.database().ref('Buses/'+Ref);
    seats = JSON.parse(seats);
    var amount =0;

    bus.once('value').then((data)=>{
        var bus = data.val();
        var prices =GetPrice(bus,date);
        for (var a in seats){
            console.log(a,seats[a]);
            if(seats[a].Type="SL"){
                amount=amount+prices['SL']
            }else if(seats[a].Type="ST"){
                amount=amount+prices['ST']
            }
        }
        var preHashString =  key + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|' + udf1 + '|'+udf2+'|'+udf3+'||||||||';
        var hash = sha512(preHashString + salt);
        response.send(hash);
    });
});




exports.app = functions.https.onRequest(app);

//
// app.listen(5555,function () {
//     console.log("started successfully");
// });
