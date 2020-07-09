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
var timer=[];
var boo = false;
var current=null;

function slide(ss) {
    var div = document.getElementById("MAIN");
    
    if (div.firstChild) div.removeChild(div.firstChild);
    var iframe = document.createElement("iframe");
    iframe.style.height = "70%";
    iframe.style.width = "70%";
    iframe.src = ss.url;
    div.appendChild(iframe);
    current = ss;
}

function pause() {
    if (boo===false) {
        document.getElementById("PAUSE").textContent = "Pause";
        boo = true;
        for (var index in obj.slides) {
            if (obj.slides[index].time>current.time)
                timer.push(setTimeout(slide, 1000 * obj.slides[index].time, obj.slides[index]));
        }
        
    }
    else {
        for (var i in timer)
            clearTimeout(timer[i])
        console.log("I AM PAUSIIING")
        document.getElementById("PAUSE").textContent = "Continue";
        boo = false;
        
        timer=[]
    }


   
}
function next() {
    for (var i in timer)
        clearTimeout(timer[i])
    timer = []
    if (current === null) {
        slide(obj.slides[0]);
        return;
    }
    for (var index in obj.slides) {
        if (obj.slides[index].time > current.time) {
            slide(obj.slides[index]);
            break;
        }
    }
   
    

}

function prev() {
    for (var i in timer)
        clearTimeout(timer[i])
    timer = []
    if (current === null) {
        slide(obj.slides[obj.slides.length-1]);
        return;
    }
    for (var index in obj.slides) {
        if (obj.slides[index].time == current.time) {
            if (index === 0) slide(obj.slides[obj.slides.length - 1]);
            else  slide(obj.slides[index-1]);
            break;
        }
    }
  
}
function play() {
    document.getElementById("PAUSE").textContent = "Pause";
    boo = true;
    for (var index in obj.slides) {
        
        timer.push(setTimeout(slide, 1000 * obj.slides[index].time, obj.slides[index]));

    }


}