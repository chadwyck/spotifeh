
var fs = require('fs');
// var path = require('path');

exports.streaming = function(req,res){
	console.log('streamed');
	// var a = req.body['audio'];
	// new MediaElement(a, {success: function(media) {
	//     media.play();
	// }});
	fs.readFile(__dirname+"/../files/"+req.params.filename, function(err, data){
		res.contentType('audio');
		res.send(data);
	});
}