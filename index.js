const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const path = require('path');
require('dotenv').config();

const port = process.env.PORT  || 8082;
const ip   = process.env.IP    || '0.0.0.0';

app.use(express.static(__dirname+'/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'key',
    resave: true,
    saveUninitialized: true,
    cookie:{

        maxAge: 300000
    }
}));



app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname+'/public/inde.html'))
});
app.use(function(req,res,next)
{

    var err = new Error('Not Found');
    err.status = 404;
    res.send('page not found')
    // res.sendFile(path.join(__dirname+'/public/404.html'))

})
//hanlde server err 500 
app.use(function(err){

    res.status(err.status || 500)
        .send({message: err.message})
});




app.listen(port,ip);
console.log('Server running at port ' + port)