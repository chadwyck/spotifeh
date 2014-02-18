
var fs = require('fs');
var mm = require('musicmetadata');
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
}

exports.uploadMgr = function(req,res){
	// console.log(req.files);
	var albumID = '5';
	fs.readFile(req.files.uploadSong.path, function (err, data) {
	  var newPath = __dirname + "/../../files/roscoeswetsuit/"+req.files.uploadSong.name;
	  fs.writeFile(newPath, data, function (err) {
	    var parser = mm(fs.createReadStream(newPath));
	    parser.on('metadata', function (result) {
	    	console.log(result);
	    });
	  	res.redirect('/');
	  });
	});
}
