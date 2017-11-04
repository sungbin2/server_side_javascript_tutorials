module.exports = function(){
  var mysql = require('mysql');
  var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'tjdqls2',
    database : 'o2'
  });
  conn.connect();
  return conn;
}
