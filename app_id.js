var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
app.listen(80, function(){
  console.log("this line will be at the end");
});
for(var i=0; i<20; i++){
 console.log("this is line number " + i);
};
app.use(express.static('public'));
app.get('/', function(req,res){

  res.sendFile(path.join(__dirname, "/public/main.html"));
});
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/email_post', function(req,res){
  console.log(req.body)
  res.send("welcome! " + req.body.email)
})
app.post('/ajax_send_email', function(req, res){
  console.log(req.body.email);
  var responseData = {'result' : 'ok', 'email' : req.body.email}
  res.json(responseData);
  // 서버에서는 JSON.stringify 필요없음
})
