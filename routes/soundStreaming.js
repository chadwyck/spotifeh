
var fs = require('fs');
// var audio = require('audio-component');


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
	// soundManager.url = 'swf/soundmanager2.swf'; // path to movie   
	// soundManager.onload = function() {  // soundManager.createSound() etc. may now be called
	// 	soundManager.createSound({id:'myMp3',
	// 		url:__dirname+'/../files/FloatOn.mp3',
	// 		onfinish:function() {
	// 			console.log('done');
	// 		}
	// 	});
	// };
	// var el = document.querySelector('audio');
	// audio(el);
}