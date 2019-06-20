let net = require('net')

// T24 TEST SERVER HOST AND PORT
let HOST = '10.133.17.171'
let PORT = 9080

// USE NET MODULE TO CREATE SOCKET CONNECTION TO T24 SERVER
let sock = new net.Socket()

// THIS IS THE STRUCTURE OF THE DATA COMING IN FROM THE CLIENT
let data = {
  memberNumber:30469,
  phoneNumber:254799361115,
  amount:1000,
  term:24,
  type:'SaccoEducation',
  purpose:'Personal',
  guarantors: [
    29991,40304,30469,30155
  ]
}

// THIS IS HOW THE DATA IS FED INTO THE T24REQUEST STRING
let t24request = `ENQUIRY.SELECT,,INPUTT/Le@ve123/KE0010001,KBS.LOAN.APPL.APP,CUSTOMER.NO:EQ=${data.memberNumber},PHONE.NO:EQ=${data.phoneNumber},LOAN.AMOUNT:EQ=${data.amount},LOAN.TERM:EQ=${data.term + 'M'},LOAN.TYPE:EQ=${data.type},LOAN.PURPOSE:EQ=${data.purpose},GUARANTORS:EQ=${data.guarantors.join(':')/*'29991:40304:30469:30155'*/}`


// LENGTH OF T24 REQUEST STRING
let strlen = (t24request.length).toString()

// CONCATENATE ABOVE LENGTH OF T24 REQUEST STRING TO THE T24 REQUEST STRING AND ASSIGN TO VARIABLE paddedStr
let paddedStr = strlen.padStart(4,0)+t24request

console.log("PADDEDSTR:",paddedStr)  

// CONNECT TO T24 SERVER
sock.connect(PORT,HOST,()=>{
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);

  // WRITE paddedStr TO T24 SERVER AS SOON AS THE CLIENT IS CONNECTED    
  sock.write(paddedStr);      
})

// SEND BACK FEEDBACK FROM T24 SERVER TO CLIENT
sock.on('data',(data)=>{  
  console.log('DATA: ' + data);
})

sock.on('error', function(exception){
  console.log('Exception:',exception);
});


sock.on('drain', function() {
  console.log("drain!");
});

sock.on('timeout', function() {
  console.log("timeout!");
});

// Add a 'close' event handler for the client socket
sock.on('close', function() {
   console.log('Connection closed');
});