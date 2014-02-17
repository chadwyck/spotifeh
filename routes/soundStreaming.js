
var fs = require('fs');
// var audio = require('audio-component');


exports.streaming = function(req,res){
	console.log('streamed');
	fs.readFile(__dirname+"/../../files/roscoeswetsuit/2/"+req.params.filename, function(err, data){		if(err) {
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
exports.uploadMgr = function(req,res){
	// console.log(req.files);
	fs.readFile(req.files.uploadSong.path, function (err, data) {
	  var newPath = __dirname + "/../../files/"+req.files.uploadSong.name;
	  fs.writeFile(newPath, data, function (err) {
	    res.redirect("back");
	  });
	});
}