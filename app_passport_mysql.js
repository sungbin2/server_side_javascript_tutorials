var app = require('./config/mysql/express')();
var passport = require('./config/mysql/passport')(app);
var path = require('path');
var http = require('http').Server(app);


app.get('/', function(req, res){
    res.sendfile(__dirname+'index.html');
});

var auth = require('./routes/mysql/auth')(passport);
app.use('/auth/', auth);
var topic = require('./routes/mysql/topic')();
app.use('/topic/', topic);

app.post('/ajax_send_email', function(req, res){
  var conn = require('./config/mysql/db')();
  var userid = {authId:req.body.email};
  var sql = 'SELECT authId FROM users WHERE authId=?'
  conn.query(sql, [userid.authId], function(err, results){
    console.log(sql, JSON.stringify(results[0]));
    if (JSON.stringify(userid) == JSON.stringify(results[0])){
      var responseData = {'result' : 'no', 'email' : req.body.email}
      res.json(responseData);
      return;
    }else {
      var responseData = {'result' : 'ok', 'email' : req.body.email}
      res.json(responseData);
      return;
    }
  });
})

app.listen(80, function(){
  console.log('Connected 80 port!!!');
});
