var index, stSound, postIndex, getSoundFile, getImageFile, getArtists, getAlbums, getSongs;

stSound = require('./soundStreaming');
connectionDB = require('./connectionDB');

exports.route = function (app) {
	app.get('/', index);
	app.post('/', postIndex);
	app.get('/files/:filename', getSoundFile);
	app.get('/image/:filename', getImageFile);
	app.get('/artists', getArtists);
	app.get('/albums', getAlbums);
	app.get('/songs', getSongs);
};

index = function (req, res) {
	return res.render('index', {title: 'Home', url: __dirname+"/../files/FloatOn.mp3"});
};

postIndex = function(req, res){
	if(!req.body['password-repeat']){
		return auth.doLogin(req, res);
	}else{
		return regi.doReg(req,res);
	}
};

getSoundFile = function(req, res){
	return stSound.streaming(req, res);
};

getImageFile = function(req, res){
	console.log("image");
	return stSound.image(req, res);
};

getArtists = function(req, res) {
	return connectionDB.artists(req, res);
};

getAlbums = function(req, res) {
	return connectionDB.albums(req, res);
};

getSongs = function(req, res) {
	return connectionDB.songs(req, res);
};