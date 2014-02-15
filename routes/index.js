var index, stSound, postIndex, getSoundFile;

stSound = require('./soundStreaming');
browseDisplay = require('./browseDisplay');

exports.route = function (app) {
	app.get('/', index);
	app.post('/', postIndex);
	app.get('/files/:filename', getSoundFile);
	app.get('/artists', getArtists);
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

getArtists = function(req, res) {
	return browseDisplay.artists(req, res);
	// res.render('index', {title: 'Artists', url: __dirname+"/../files/FloatOn.mp3"});
};