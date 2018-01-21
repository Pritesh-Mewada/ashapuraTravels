const functions = require('firebase-functions');
const express =require('express');
const app = express();
var sha512 = require('js-sha512');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.engine('html',require('ejs').renderFile);

app.post('/success',(request,response)=>{
    response.render('success.html');
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

