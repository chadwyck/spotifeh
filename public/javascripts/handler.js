/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 1/2/14
 * Time: 4:58 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

// Create an instance
var ws = [];

var loadMusic = function (url) {


	var wavesurfer = Object.create(WaveSurfer);


// Init & load audio file
	document.addEventListener('DOMContentLoaded', function () {
		var options = {
			container: document.querySelector('.waveform'),
			waveColor: 'rgb(104, 165, 165)',
			progressColor: 'rgb(81, 134, 134)',
			loaderColor: 'rgb(81, 134, 134)',
			cursorColor: 'navy',
			markerWidth: 2
		};

		if (location.search.match('scroll')) {
			options.minPxPerSec = 100;
			options.scrollParent = true;
		}

		if (location.search.match('normalize')) {
			options.normalize = true;
		}

		/* Progress bar */
		var progressDiv = document.querySelector('.progress-bar-outer');
		var progressBar = progressDiv.querySelector('.progress-bar');
		wavesurfer.on('loading', function (percent, xhr) {
			progressDiv.style.display = 'block';
			progressBar.style.width = percent + '%';
		});
		wavesurfer.on('ready', function () {
			progressDiv.style.display = 'none';
		});
		wavesurfer.on('destroy', function () {
			progressDiv.style.display = 'none';
		});

		// Init
		wavesurfer.init(options);
		// Load audio from URL
//	console.log($('.profile-sound-url'));
		wavesurfer.load(url);

	});

// Play at once when ready
// Won't work on iOS until you touch the page
	wavesurfer.on('ready', function () {
//    wavesurfer.play();
	});

// Bind buttons and keypresses

	(function () {
		var eventHandlers = {
			'play': function () {
				wavesurfer.playPause();
			},

			'green-mark': function () {
				wavesurfer.mark({
					id: 'up',
					color: 'rgba(0, 255, 0, 0.5)'
				});
			},

			'red-mark': function () {
				wavesurfer.mark({
					id: 'down',
					color: 'rgba(255, 0, 0, 0.5)'
				});
			},

			'back': function () {
				wavesurfer.skipBackward();
			},

			'forth': function () {
				wavesurfer.skipForward();
			},

			'toggle-mute': function () {
				wavesurfer.toggleMute();
			}
		};

		document.addEventListener('keydown', function (e) {
			var map = {
				32: 'play',       // space
				38: 'green-mark', // up
				40: 'red-mark',   // down
				37: 'back',       // left
				39: 'forth'       // right
			};
			if (e.keyCode in map) {
				var handler = eventHandlers[map[e.keyCode]];
				e.preventDefault();
				handler && handler(e);
			}
		});

		document.addEventListener('click', function (e) {
			var action = e.target.dataset && e.target.dataset.action;
			if (action && action in eventHandlers) {
				eventHandlers[action](e);
			}
		});
	}());

// Flash mark when it's played over
	wavesurfer.on('mark', function (marker) {
		if (marker.timer) {
			return;
		}

		marker.timer = setTimeout(function () {
			var origColor = marker.color;
			marker.update({ color: 'yellow' });

			setTimeout(function () {
				marker.update({ color: origColor });
				delete marker.timer;
			}, 100);
		}, 100);
	});

	wavesurfer.on('error', function (err) {
		console.error(err);
	});

	ws.push(wavesurfer);
};



// $(document).on('click', '.profile-track-play-pause', function(){
// 	console.log('test string');
// 	var classList =$(this).attr('class').split(/\s+/);
// 	if(classList.indexOf('glyphicon-play') != -1){
// 		$(this).removeClass('glyphicon-play');
// 		$(this).addClass('glyphicon-pause');
// 	}else{
// 		$(this).removeClass('glyphicon-pause');
// 		$(this).addClass('glyphicon-play');
// 	}
// 	for(var i =0; i < ws.length; i++){
// 		if(i == $('.profile-track-play-pause').index($(this))){
// 			ws[i].playPause();
// 		}else{
// 			ws[i].pause();
// 			$($('.profile-track-play-pause')[i]).removeClass('glyphicon-pause');
// 			$($('.profile-track-play-pause')[i]).addClass('glyphicon-play');
// 		}
// 	}
// });