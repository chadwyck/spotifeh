
// var value = 0

$(document).ready(function() {
    // initialize
    // grab elements
    var $picturePane = $("#picturePane"),
        $pictureSlider = $("#pictureSlider"),
        $playlistPane = $("#playlistPane"),
        $playlistSlider = $("#playlistSlider"),
        value = 0;
        value2 = 0;
        isToggled = {music:false, pictures:false};

    // attach event handlers
    $pictureSlider.click(togglePicturePane);
    $playlistSlider.click(togglePlaylistPane);

    $("#sliderImg").rotate({ 
       bind: 
         { 
            click: function(){
                value -=90;
                $(this).rotate({ animateTo:value})
            }
         } 
       
    });
    $("#sliderImg2").rotate({ 
       bind: 
         { 
            click: function(){
                value2 +=90;
                $(this).rotate({ animateTo:value2})
            }
         } 
       
    });

    function togglePicturePane(e) {
        if (isToggled.pictures) {
            $picturePane.stop(true, true).hide("slide", {direction: "right"}, 500);
        }
        else {
            $picturePane.stop(true, true).show("slide", {direction: "right"}, 500);
        }
        isToggled.pictures = !isToggled.pictures;
    }

    function togglePlaylistPane(e) {
        if (isToggled.music) {
            $playlistPane.stop(true, true).hide("slide", {direction: "left"}, 500);
        }
        else {
            updatePlaylist();
            $playlistPane.stop(true, true).show("slide", {direction: "left"}, 500);
        }
        isToggled.music = !isToggled.music;
    }
});


var updatePlaylist = function() {
    var i,
        data = jsonPlaylist(),
        innHtml = '';

    for(i = 0; i<data.list.length; i++){
        innHtml += '<p class=resultBoldPlay>'+data.list[i].title+'</p>'+
            '<p class=resultLamePlay>'+data.list[i].artist+'</p>'+
            '<br>'
    }

    document.getElementById("playlistContainer").innerHTML = innHtml;
}
