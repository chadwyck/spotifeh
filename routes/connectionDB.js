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
	var where;
	where = '';
	if(req.params.artistID != 'none'){
		where = 'and art.ArtistID = \'' + req.params.artistID + '\' ';
	}
	connection.query('select alb.AlbumID, alb.Name as Album, alb.Genre, alb.Image, art.Name as Artist '+
		'from Album alb, ContributesTo c, Artist art '+
		'where c.AlbumID = alb.AlbumID and c.ArtistID = art.ArtistID '+
		where+'order by Artist', function (err, rows, fields) {
	  if (err) throw err;
	  res.send(rows);
 	});
}

exports.songs = function(req,res){
	var where;
	where = '';
	var orderParam;
	orderParam = 'Title';
	if(req.params.order != 'none'){
		orderParam = req.params.order;
	}
	if(req.params.albumID != 'none'){
		where = 'and alb.AlbumID = \'' + req.params.albumID + '\' ';
	}
	var search;

	switch(req.params.searchby) {
		case 'song':
			search = 'and s.Title LIKE \''+req.params.searchterm+'\' ';
			break;
		case 'artist':
			search = 'and c.AlbumID IN (SELECT c.AlbumID '+
				'FROM ContributesTo c '+
				'WHERE c.ArtistID IN (SELECT art.ArtistID '+
									'FROM Artist art '+
									'WHERE art.Name LIKE \''+req.params.searchterm+'\')) ';
			break;
		case 'album':
			search = 'and c.AlbumID IN (SELECT alb.AlbumID '+
				 'FROM Album alb '+
				 'WHERE alb.Name LIKE \''+req.params.searchterm+'\') ';
			break;
		case 'none':
			search = '';
			break;
		default:
			search = '';
	}

	connection.query('select s.Title, art.Name as Artist, alb.Name as Album, '+
		's.TrackNum, s.Length, s.LinkToMedia, alb.Image, s.AlbumID '+
		'from Song s, Album alb, Artist art, ContributesTo c '+
		'where s.AlbumID = alb.AlbumID and c.AlbumID = alb.AlbumID and c.ArtistID = art.ArtistID '+
		where+search+'order by '+orderParam, function (err, rows, fields) {
	  if (err) throw err;
	  res.send(rows);
 	});
}

exports.update = function(req,res) {
	console.log('Hit the update section');
	connection.query('UPDATE spotifeh.Song SET Title = \''+req.params.newTitle+'\' '+
	'WHERE Song.Username = \'roscoeswetsuit\' AND Song.AlbumID = \''+
	req.params.albumID+'\' AND Song.TrackNum = \''+req.params.trackNum+'\' LIMIT 1;', function (err, rows, fields) {
	  if (err) throw err;
	  res.send('song updated');
 	});
}

exports.getConnection = function(req,res) { return connection; }

// exports.songs = function(req,res){
// 	var where;
// 	if(req.params.albumName.length > 0) {
// 		where = ' where Song.AlbumID = "' + req.params.albumName + '"';
// 	} else {
// 		where = '';
// 	}
// 	connection.query('select * from Song' + where, function (err, rows, fields) {
// 	  if (err) throw err;
// 	  res.send(rows);
//  });
// }