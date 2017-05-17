"use strict";
(function () {
    //automatically called as soon as the javascript is loaded
    window.addEventListener("load", main);
}());

function main() {
	var music = document.getElementById("music");  
    music.volume = 0.5;
}

window.show = function(elementId) { 
    var elements = document.getElementsByTagName("div");
    for (var i = 0; i < elements.length; i++)
        elements[i].className = "hidden";
    
    document.getElementById(elementId).className = "centrado";
}
  
function increaseVolume() {
	var music = document.getElementById("music"); 
    music.volume = music.volume + 0.05;
} 
  
function decreaseVolume() { 
	var music = document.getElementById("music");
    music.volume = music.volume - 0.05;
} 

function muteVolume() { 
	var music = document.getElementById("music");
	var btn = document.getElementById("musicbtn");

	if(music.volume==0){
		music.volume=0.5;
	}
	else{
    	music.volume = 0;
    }
}