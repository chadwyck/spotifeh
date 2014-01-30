var index, stSound, postIndex, getSoundFile;

stSound = require('./soundStreaming');

exports.route = function (app) {
	app.get('/', index);
	app.post('/', postIndex);
	app.get('/files/:filename', getSoundFile);
};

index = function (req, res) {
	return res.render('index', {title: 'Home'});
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