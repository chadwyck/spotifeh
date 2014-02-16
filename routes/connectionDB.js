var mysql = require('mysql');

var connection = mysql.createConnection({
	  host     : 'spotifeh.csse.rose-hulman.edu',
	  user     : 'spotifeh_admin',
	  password : 'Pekaege7',
	  database : 'spotifeh'
});

connection.connect(function(err) {
	 console.log(err); // 'hello world, bitches');
});

exports.artists = function(req,res){
	connection.query('select * from Artist', function (err, rows, fields) {
	     // close connection first
	    // closeConnection(connection);
	//     // done: call callback with results	     //cb(err, rows);
	  if (err) throw err;
	  res.send(rows);
 });
//	connection.end();
}
	
exports.albums = function(req,res){
	connection.query('select * from Album', function (err, rows, fields) {
	  if (err) throw err;
	  res.send(rows);
 });
}

exports.songs = function(req,res){
	connection.query('select * from Song', function (err, rows, fields) {
	  if (err) throw err;
	  res.send(rows);
 });
}