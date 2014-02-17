function ajaxArtists() {
	$('.resultsPanel').empty();
	$('.resultsTitle').empty();
	$('.resultsTitle').append('Artists');
	$.get("/artists", function(data,status){
	  // alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);

	  var i;
	  for(i in data) {
	  	// console.log
	  	var imgSrc;
	  	if(data[i].Image.length<1){
	  		imgSrc = '/images/default.png';
	  	} else {
	  		imgSrc = data[i].Image;
	  	}
	  	$('.resultsPanel').append('<div class="resultItem" id='+data[i].ArtistID+'>'+
	  		'<img class="albumCover" src='+imgSrc+'></img>'+
	  		'<p class=resultBold>'+data[i].Name+'</p>'+
	  		'<p class=resultLame>artistID is '+data[i].ArtistID+'</p></div>');
	  }
	});
};

function ajaxAlbums() {
	$('.resultsPanel').empty();
	$('.resultsTitle').empty();
	$('.resultsTitle').append('Albums');
	$.get("/albums", function(data,status){
	  // alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);

	  var i;
	  for(i in data) {
	  	// console.log
	  	var imgSrc;
	  	if(data[i].Image.length<1){
	  		imgSrc = '/images/default.png';
	  	} else {
	  		imgSrc = '/image/roscoeswetsuit/'+data[i].AlbumID+'/'+data[i].Image;
	  	}
	  	$('.resultsPanel').append('<div class="resultItem" id='+data[i].AlbumID+
	  		' onclick="ajaxSongs('+data[i].AlbumID+',\''+data[i].Name+'\')" style="cursor: pointer;">'+
	  		'<img class="albumCover" src='+imgSrc+'></img>'+
	  		'<p class=resultBold>'+data[i].Name+'</p>'+
	  		'<p class=resultLame>'+data[i].ReleaseDate+'</p>'+
	  		'<p class=resultLame>'+data[i].Genre+'</p></div>');
	  }
	});
};

function ajaxSongs(albumID, albumTitle) {
	// alert(albumID + ' ' + albumTitle);
	var title = 'Songs';
	if(albumID != 'none'){
		title = albumTitle;
	}
	$('.resultsPanel').empty();
	$('.resultsTitle').empty();
	$('.resultsTitle').append(title);
	$('.resultsPanel').append('<div class="songTableHeader"><div class="blankCover" />'+
		'<p class="title">Title</p><p class="artist">Artist</p><p class="album">Album</p>'+
		'<p class="length">Length</p><p class="track">Track</p></div>');
	$.get("/songs/"+albumID, function(data,status){
	  // alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);

	  var i;
	  for(i in data) {
	  	var imgSrc;
	  	// if(data[i].Image.length<1){
	    imgSrc = '/images/default.png';
	  	// } else {
	  	// 	imgSrc = '../files/roscoeswetsuit/'+data[i].AlbumID+'/'+data[i].Image;
	  	// }
	  	$('.resultsPanel').append('<div class="resultItemSong" id="../files/'+data[i].LinkToMedia+'" '+
	  		'onclick="clickedSong(this)">'+
	  		'<img class="albumCover" src='+imgSrc+'></img>'+
	  		'<p class=title>'+data[i].Title+'</p>'+
	  		'<p class=artist>'+data[i].Username+'</p>'+
	  		'<p class=album>'+data[i].AlbumID+'</p>'+
	  		'<p class=length>'+data[i].Length+'</p>'+
	  		'<p class=track>'+data[i].TrackNum+'</p>'+
	  		'</div>');
	  }
	});
};

// document.getElementById("inputUpload").onchange = function () {
//     document.getElementById("uploadFile").value = this.value;
// };







// Username
// AlbumID
// TrackNum
// Length
// Title
// LinkToMedia