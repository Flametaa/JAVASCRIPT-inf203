"use strict";



function GET(req){
    
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET","../../"+req);
    
    xhr.onload = function(){
        
        document.getElementById("MAINSHOW").innerHTML = this.response;
    }
    xhr.send();
}

function clear1(){
 
    GET("clear");
    
}

function show(){
    GET("show")
}

function remove(){
    var ind = document.getElementById("indexTF").value;
    if (ind==""){
        document.getElementById("MAINSHOW").innerHTML ="Please enter Valid information" ;
    }
    else
    GET("remove?index="+ind);

}

function add(){
    var title = document.getElementById("titleTF").value;
    console.log(title=="");
    var color = document.getElementById("colorTF").value;
    var value = document.getElementById("valueTF").value;
    if (title=="" || color=="" || value==""){
        document.getElementById("MAINSHOW").innerHTML ="Please enter Valid information" ;
    }
    else
    GET("add?title="+title+"&color="+color+"&value="+value);
}

function pie(){
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET","../../piechart");
    
    xhr.onload = function(){
        for (var i in JSON.parse(this.response))
        document.getElementById("view_box").innerHTML +=JSON.parse(this.response)[i] ;
    }
    xhr.send();

}

function localpie(){
    
}

function add1(){
    document.getElementById("ad").style.visibility = 'visible';
}

function remove1(){
    document.getElementById("rem").style.visibility = 'visible';
}