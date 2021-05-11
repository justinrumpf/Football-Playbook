//declare canvas
var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");
ctx.strokeStyle = "#ff0000";
ctx.lineJoin = "round";
ctx.lineWidth = 5;

var clickX = [];
var clickY = [];
var clickDrag = [];
var paint;

//function to get URL parameters by name
function getParameterByName( name ){
name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
var regexS = "[\\?&]"+name+"=([^&#]*)";
var regex = new RegExp( regexS );
var results = regex.exec( window.location.href );
if( results == null )
  return "";
else
  return decodeURIComponent(results[1].replace(/\+/g, " "));
}

//when page is loaded and ready
$(document).ready(function(){
  //make page not scrollable
  $("body").css({"overflow":"hidden",'position':'fixed'});

  //get the image URL to display
  var imageurl= getParameterByName("imageurl");  
  //get the playname to display
  var playname= getParameterByName("playname");    

  //display play name in the #PlayName div
  $("#PlayName").text(playname);

  //URL decode the Image URL
  var decodedimageurl = decodeURIComponent(imageurl);

  //add listeners to for touch and mouse to detect when to start drawing.
  canvas.addEventListener('mousedown', mouseWins);
  canvas.addEventListener('touchstart', touchWins);
   
   //set canvas background image, which is the image of the play.
    $('#canvas').css("background-image", "url(" + decodedimageurl + ")");
    $('#canvas').css("background-size", "550px");

});
