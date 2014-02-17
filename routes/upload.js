ID3.loadTags(file[i], function(){
	var tags = ID3.getAlltags(file[i]);
	var AlbumId;
	var ArtistId;

	connection.query('SELECT AlbumID
		FROM Album
		WHERE Name = ?', [tags[2]], function(err, rows){
			if(err) throw err;
			AlbumId = rows.AlbumID;
		});

	if(AlbumId = ""){
	// make album and get assigned ID
		connection.query( 'INSERT INTO Album (AlbumID, Name, Image, ReleaseDate, Genre) 
			VALUES ( , ??, ??, '', ?)', [tags[2], **picture**, tags[5]], function(err, result) {
				if(err) throw err;
				AlbumId = result.insertId; // make the new album
	});
	}
	
	connection.query('SELECT ArtistID
	FROM Artist
	WHERE Name = ?', [tags[1]], function(err, rows) {
		if(err) throw err;
		ArtistId = rows.ArtistID;
	});
	if (ArtistId == ""){ // make artist if DNE
		connection.query('INSERT INTO Artist (ArtistID, Name, Image)
	VALUES ( , ?, )', [tags[1]], function(err, result) {
		if (err) throw err;
		ArtistId = result.insertId;
	}); 
	}
	connection.query('INSERT INTO ContributesTo (ArtistID, AlbumID) 
		VALUES (??, ?)', [ArtistId, AlbumId], function(err, result)) {
		if(err) throw err;
	} // makes the album artist connection
	connection.query('INSERT INTO Song (Username, AlbumID, TrackNum, Length, Title, LinkToMedia
		VALUES ('roscoeswetsuit', ??, ??, '', ??, ?' [albumId, tags[3], tags[0], file[i]], function(err, result) {
			if(err) throw err);
		});
},
{tags: ["title", "artist", "album", "track", "picture", "genre"]});

//https://github.com/aadsm/JavaScript-ID3-Reader
//This creates a song entry and 