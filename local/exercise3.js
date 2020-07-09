"use strict";

function load() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "slides.json");
    xhr.onload = function () {
     
        var text = this.responseText;

        
        obj = JSON.parse(text);
        return obj;
    }

    xhr.send();
    


}

var obj = load();


function slide(url) {
    var div = document.getElementById("MAIN");
    
    if (div.firstChild) div.removeChild(div.firstChild);
	if (url =="") return;
    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.height = "75%";
    iframe.style.width = "75%";
    div.appendChild(iframe);
}
function play() {
    
    for (var i in obj.slides){
        
        setTimeout(slide, 1000 * obj.slides[i].time, obj.slides[i].url);

    }
	
}
