var playlist = {
    list: []
};

var currentPos = 0;

var pushOnPlaylist = function(url, title, artist) {
	if(playlist.list.length < 1 && !checkIsPlaying()) {
		playSong(url, title, artist);
	} else {
		playlist.list.push({ 
	        "url" : url,
	        "title" : title,
	        "artist" : artist 
	    });
	}
	updatePlaylist();
}

var playFromPlaylist = function() {
	if(playlist.list.length > 0) {
		var newSong = playlist.list.splice(0, 1)[0];
		playSong(newSong.url,newSong.title,newSong.artist);
	}
	updatePlaylist();
}

var nonZeroLength = function() {
	if(playlist.list.length > 0) return true;
	return false;
}

var jsonPlaylist = function() {
	return playlist;
}