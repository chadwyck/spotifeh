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
	  	$('.resultsPanel').append('<div class="resultItem" id='+data[i].ArtistID+
	  		' onclick="ajaxAlbums('+data[i].ArtistID+',\''+data[i].Name+'\')" style="cursor: pointer;">'+
	  		'<img class="albumCover" src='+imgSrc+'></img>'+
	  		'<p class=resultBold>'+data[i].Name+'</p>'+
	  		'<p class=resultLame>artistID is '+data[i].ArtistID+'</p></div>');
	  }
	});
};

function ajaxAlbums(artistID, artistName) {
	var title = 'Albums';
	if(artistID != 'none'){
		title = artistName;
	}
	$('.resultsPanel').empty();
	$('.resultsTitle').empty();
	$('.resultsTitle').append(title);
	$.get("/albums/"+artistID, function(data,status){
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
	  		' onclick="ajaxSongs('+data[i].AlbumID+',\''+data[i].Album+'\',\'TrackNum\')" style="cursor: pointer;">'+
	  		'<img class="albumCover" src='+imgSrc+'></img>'+
	  		'<p class=resultBold>'+data[i].Album+'</p>'+
	  		'<p class=resultLame>'+data[i].Artist+'</p>'+
	  		'<p class=resultLame>'+data[i].Genre+'</p></div>');
	  }
	});
};

function ajaxSongs(albumID, albumTitle, order) {
	// alert(albumID + ' ' + albumTitle);
	var title = 'Songs';
	if(albumID != 'none'){
		title = albumTitle;
	}
	$('.resultsPanel').empty();
	$('.resultsTitle').empty();
	$('.resultsTitle').append(title);
	$('.resultsPanel').append('<div class="songTableHeader"><div class="blankCover" />'+
		'<div class="title head-click" onclick="ajaxSongs(\''+albumID+'\',\''+albumTitle+'\',\'Title\')">'+
		'Title</div><div class="artist head-click" onclick="ajaxSongs(\''+albumID+'\',\''+albumTitle+'\',\'Artist\')">'+
		'Artist</div><div class="album head-click" onclick="ajaxSongs(\''+albumID+'\',\''+albumTitle+'\',\'Album\')">'+
		'Album</div><div class="length head-click" onclick="ajaxSongs(\''+albumID+'\',\''+albumTitle+'\',\'Length\')">'+
		'Length</div><div class="track head-click" onclick="ajaxSongs(\''+albumID+'\',\''+albumTitle+'\',\'TrackNum\')">'+
		'Track</div></div>');
	$.get("/songs/"+albumID+"/"+order, function(data,status){
	  // alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);

	  var i;
	  for(i in data) {
	  	var imgSrc;
	  	if(data[i].Image.length<1){
	    imgSrc = '/images/default.png';
	  	} else {
	  		imgSrc = '/image/roscoeswetsuit/'+data[i].AlbumID+'/'+data[i].Image;
	  	}
	  	$('.resultsPanel').append('<div class="resultItemSong" id="../files/roscoeswetsuit/'+data[i].AlbumID+'/'+data[i].LinkToMedia+'" '+
	  		'onclick="clickedSong(this)">'+
	  		'<img class="albumCover" src='+imgSrc+'></img>'+
	  		'<p class=title>'+data[i].Title+'</p>'+
	  		'<p class=artist>'+data[i].Artist+'</p>'+
	  		'<p class=album>'+data[i].Album+'</p>'+
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