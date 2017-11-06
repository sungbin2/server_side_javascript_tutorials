var app = require('./config/mysql/express')();
var passport = require('./config/mysql/passport')(app);

app.get('/', function(req, res){
    res.render('main');
});

app.get('/welcome', function(req, res){
  if(req.user && req.user.displayName) {
    res.send(`<meta charset='utf-8' name="viewport" content="initial-scale=1, maximum-scale=1")>
      <h1>Hello, ${req.user.displayName}</h1>
      <a href="/auth/logout">logout</a>
    `);
  } else {
    res.send(`
      <h1>Welcome</h1>
      <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
      </ul>
    `);
  }
});

var auth = require('./routes/mysql/auth')(passport);
app.use('/auth/', auth);
var topic = require('./routes/mysql/topic')();
app.use('/topic/', topic);

app.post('/ajax_send_email', function(req, res){
  var conn = require('./config/mysql/db')();
  var userid = {authId:'local:'+req.body.email};
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
