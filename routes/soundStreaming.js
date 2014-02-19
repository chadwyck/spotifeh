
var fs = require('fs');
var mm = require('musicmetadata');

var connectionDB = require('./connectionDB');

var connection = connectionDB.getConnection();

exports.streaming = function(req,res){
	console.log('streamed');
	fs.readFile(__dirname+"/../../files/roscoeswetsuit/"+req.params.album+"/"+req.params.filename, function(err, data){
		if(err) {
			console.log(err);
			fs.readFile(__dirname+"/../../files/spotify.wav", function(err, data){
				res.contentType('audio');
				res.send(data);
			});
		} else {
			res.contentType('audio');
			res.send(data);
		}
	});
}

exports.image = function(req,res){
	console.log('getting image');
	fs.readFile(__dirname+"/../../files/"+req.params.user+"/"+req.params.album+"/"+req.params.filename, function(err, data){
		res.contentType('img');
		res.send(data);
	});
}

exports.uploadMgr = function(req,res){
	res.redirect('/');
	console.log("starting upload");
	var parser = mm(fs.createReadStream(req.files.uploadSong.path));
	parser.on('metadata', function (result) {
		console.log(result);
		var AlbumId;
		var ArtistId;
		var isReady = false;

		connection.query('SELECT AlbumID FROM Album WHERE Name = \''+result.album+'\'',
			function(err, rows){
				if(err) throw err;
				// AlbumId = rows.AlbumID;
				console.log(rows);
				if(rows.length<1) {
					connection.query('INSERT INTO Album (AlbumID, Name, Image, ReleaseDate, Genre) '+
						'VALUES ( \'\', \''+result.album+'\', \'\', \'\', \''+result.genre[0]+'\')', function(err, resultA) {
							if(err) throw err;
							AlbumId = resultA.insertId; // make the new album
							if(isReady){
								contributes(AlbumId, ArtistId, result, req.files.uploadSong.path, req.files.uploadSong.name);
							} else {
								isReady = true;
							}
					});
				} else {
					AlbumId = rows[0].AlbumID;
					if(isReady){
						contributes(AlbumId, ArtistId, result, req.files.uploadSong.path, req.files.uploadSong.name);
					} else {
						isReady = true;
					}
				};
		});

		connection.query('SELECT ArtistID FROM Artist WHERE Name = \''+result.artist[0]+'\'',
			function(err, rows){
				if(err) throw err;
				// AlbumId = rows.AlbumID;
				console.log(rows);
				if(rows.length<1) {
					connection.query('INSERT INTO Artist (ArtistID, Name, Image) '+
						'VALUES ( \'\', \''+result.artist[0]+'\', \'\')', function(err, resultB) {
							if (err) throw err;
							ArtistId = resultB.insertId;
							if(isReady){
								contributes(AlbumId, ArtistId, result, req.files.uploadSong.path, req.files.uploadSong.name);
							} else {
								isReady = true;
							}
					}); 
				} else {
					ArtistId = rows[0].ArtistID;
					console.log('misses and artID: '+ArtistId+' AlbumId: '+AlbumId);
					if(isReady){
						contributes(AlbumId, ArtistId, result, req.files.uploadSong.path, req.files.uploadSong.name);
					} else {
						isReady = true;
					}
				};
		});
	});
}

var contributes = function(AlbumId, ArtistId, result, path, filename){
	console.log(ArtistId+' IDS '+AlbumId);

	connection.query('SELECT ArtistID FROM ContributesTo WHERE AlbumID = \''+AlbumId+'\'',
			function(err, rows){
				if(err) throw err;
				// AlbumId = rows.AlbumID;
				console.log(rows);
				if(rows.length<1) {

					connection.query('INSERT INTO ContributesTo (ArtistID, AlbumID) '+
						'VALUES (\''+ArtistId+'\', \''+AlbumId+'\')', function(err, resultA) {
							if(err) throw err;

							var folderPath = __dirname + '/../../files/roscoeswetsuit/'+AlbumId+'/';
							fs.mkdir(folderPath, 0755, function(error) {
								fs.readFile(path, function (err, data) {
								  var newPath = folderPath+filename;
								  fs.writeFile(newPath, data, function (err) {
								  	connection.query('INSERT INTO Song (Username, AlbumID, TrackNum, Length, Title, LinkToMedia) '+
										'VALUES (\'roscoeswetsuit\', \''+AlbumId+'\', \''+result.track.no+'\', \'10\', \''+result.title+'\', \''+filename+'\')', function(err, resultB) {
											if(err) throw err;
										});
								  });
								});
							});	
					});
				} else {
					var folderPath = __dirname + '/../../files/roscoeswetsuit/'+AlbumId+'/';
					fs.readFile(path, function (err, data) {
					  var newPath = folderPath+filename;
					  fs.writeFile(newPath, data, function (err) {
					  	connection.query('INSERT INTO Song (Username, AlbumID, TrackNum, Length, Title, LinkToMedia) '+
							'VALUES (\'roscoeswetsuit\', \''+AlbumId+'\', \''+result.track.no+'\', \'10\', \''+result.title+'\', \''+filename+'\')', function(err, resultB) {
								if(err) throw err;
							});
					  });
					});
				}
		});
}