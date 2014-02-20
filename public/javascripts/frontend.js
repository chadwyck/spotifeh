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
	  		' onclick="ajaxSongs('+data[i].AlbumID+',\''+data[i].Album+'\',\'TrackNum\',\'none\')" style="cursor: pointer;">'+
	  		'<img class="albumCover" src='+imgSrc+'></img>'+
	  		'<p class=resultBold>'+data[i].Album+'</p>'+
	  		'<p class=resultLame>'+data[i].Artist+'</p>'+
	  		'<p class=resultLame>'+data[i].Genre+'</p></div>');
	  }
	});
};

function ajaxSongs(albumID, albumTitle, order, searchBy) {
	// alert(albumID + ' ' + albumTitle);
	// alert(searchBy);
	var title = 'Songs';
	if(albumID != 'none'){
		title = albumTitle;
	}
	$('.resultsPanel').empty();
	$('.resultsTitle').empty();
	$('.resultsTitle').append(title);
	$('.resultsPanel').append('<div class="songTableHeader"><div class="blankCover" />'+
		'<div class="title head-click" onclick="ajaxSongs(\''+albumID+'\',\''+albumTitle+'\',\'Title\',\''+searchBy+'\')">'+
		'Title</div><div class="artist head-click" onclick="ajaxSongs(\''+albumID+'\',\''+albumTitle+'\',\'Artist\',\''+searchBy+'\')">'+
		'Artist</div><div class="album head-click" onclick="ajaxSongs(\''+albumID+'\',\''+albumTitle+'\',\'Album\',\''+searchBy+'\')">'+
		'Album</div><div class="length">'+
		'Edit</div><div class="track head-click" onclick="ajaxSongs(\''+albumID+'\',\''+albumTitle+'\',\'TrackNum\',\''+searchBy+'\')">'+
		'Track</div></div>');
	var searchTerm = 'none';
	if(searchBy != 'none'){
		searchTerm = $('#searchInput').val();
	}
	$.get("/songs/"+albumID+"/"+order+"/"+searchBy+"/"+searchTerm, function(data,status){
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
	  		'onclick="clickedSong(this,\''+data[i].Title+'\',\''+data[i].Artist+'\')">'+
	  		'<img class="albumCover" src='+imgSrc+'></img>'+
	  		'<div class=title id="'+data[i].TrackNum+'QQ'+data[i].AlbumID+'">'+data[i].Title+'</div>'+
	  		'<p class=artist>'+data[i].Artist+'</p>'+
	  		'<p class=album>'+data[i].Album+'</p>'+
	  		'<p class=length><img class="editButton" src="/images/editButton.svg" onclick="editIt(\''+data[i].Title+'\',\''+data[i].TrackNum+'\',\''+data[i].AlbumID+'\')"></img></p>'+
	  		'<p class=track>'+data[i].TrackNum+'</p>'+
	  		'</div>');
	  }
	});
};

function editIt(title, trackNum, albumID) {
	document.getElementById(trackNum+'QQ'+albumID).innerHTML = '<input type="text" value="'+title+'" onkeydown="editEnter(this, this.value, '+trackNum+', '+albumID+');">';
};

function editEnter(theGuy, newTitle, trackNum, albumID) {
	if(event.keyCode == 13){
		// alert('key enter');
		document.getElementById(trackNum+'QQ'+albumID).innerHTML = newTitle;
		$.get("/update/"+newTitle+"/"+albumID+"/"+trackNum, function(data,status){
			
		});
	} else if(event.keyCode == 13){
		alert('key space');
		theGuy.value += ' ';
	}
};

function searchEnter() {
	if(event.keyCode == 13){
		ajaxSongs('none','none','none',$('#searchType').val());

		return false;
	}
	return true;
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