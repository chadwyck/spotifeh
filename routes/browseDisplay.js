var mysql = require('mysql');

var connection = mysql.createConnection({
	  host     : 'spotifeh.csse.rose-hulman.edu',
	  user     : 'spotifeh_admin',
	  password : 'Pekaege7',
});

exports.artists = function(req,res){
	connection.connect(function(err) {
	  res.send(err);//'hello world, bitches');
	});

	// connection.query('select id, code, name from Continent', function (err, rows, fields) {
	//     // close connection first
	//     closeConnection(connection);
	//     // done: call callback with results
	//     cb(err, rows);
 //  	});
}
	