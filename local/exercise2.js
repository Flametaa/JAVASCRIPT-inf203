 "use strict";


var lines=[];

function load(){

	var xhr = new XMLHttpRequest();
    var txt = document.getElementById("textedit").value;
    console.log(txt);
	if (txt!=""){
	var str = "::1 - "+txt;
	lines.unshift(str);
    var req = "chat.php?phrase="+txt;
    xhr.open("GET", req);
    
    xhr.send();
    
	document.getElementById("textedit").value ="";
    reload();
	}
    
	
}

function get(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "chatlog.txt");
    xhr.onload = function() {
      
      lines = this.responseText.split("\n").reverse();
      
    
    }
    
    xhr.send();
  }

get();

function reload(){
	
	var ddd = document.getElementById("textarea");
	console.log(ddd);
	ddd.innerHTML = "";
      
      for (let i in lines) {
		if (lines[i]=="") continue;
		
        var p = document.createElement("p");
        p.textContent = lines[i];
        
        ddd.appendChild(p);
        if (ddd.childElementCount == 10) break;
      }
	  
	  
}



