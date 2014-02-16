var mysql = require('mysql');

var connection = mysql.createConnection({
	  host     : 'spotifeh.csse.rose-hulman.edu',
	  user     : 'spotifeh_admin',
	  password : 'Pekaege7',
	  database : 'spotifeh'
});

connection.connect(function(err) {
	 // res.send(err); // 'hello world, bitches');
	});

exports.artists = function(req,res){
	

	connection.query('select Name from Artist', function (err, rows, fields) {
	     // close connection first
	    // closeConnection(connection);
	//     // done: call callback with results	     //cb(err, rows);
	  if (err) throw err;
	  res.send(rows[0]);
 });
//	connection.end();
}
	
