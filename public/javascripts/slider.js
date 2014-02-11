
// var value = 0

$(document).ready(function() {
    // initialize
    // grab elements
    var $picturePane = $("#picturePane"),
        $pictureSlider = $("#pictureSlider"),
        value = 0;
        isToggled = {music:false, pictures:false};

    // attach event handlers
    $pictureSlider.click(togglePicturePane);

    $("#sliderImg").rotate({ 
       bind: 
         { 
            click: function(){
                value +=90;
                $(this).rotate({ animateTo:value})
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
});


