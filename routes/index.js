var index, stSound, postIndex, getSoundFile, getImageFile,
	getArtists, getAlbums, getSongs, uploadFile, doUpdate;

stSound = require('./soundStreaming');
connectionDB = require('./connectionDB');

exports.route = function (app) {
	app.get('/', index);
	app.post('/', uploadFile);
	app.get('/files/:user/:album/:filename', getSoundFile);
	app.get('/image/:user/:album/:filename', getImageFile);
	app.get('/update/:newTitle/:albumID/:trackNum', doUpdate);
	app.get('/artists', getArtists);
	app.get('/albums/:artistID', getAlbums);
	app.get('/songs/:albumID/:order/:searchby/:searchterm', getSongs);
	// app.get('/addQueue/:filename', addQueue);
	// app.post('/upload', uploadFile);
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

uploadFile = function(req, res) {
	return stSound.uploadMgr(req, res);
};

doUpdate = function(req, res) {
	return connectionDB.update(req, res);
};

// addQueue = function(req, res) {
// 	return stSound.uploadMgr(req, res);
// }