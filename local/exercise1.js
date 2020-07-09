"use strict";

function loadDoc(){

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "text.txt");
	xhr.onload = function() {
		var textArea = document.getElementById("textarea");
		textArea.textContent+=this.responseText;
	}
	
	xhr.send();
	
}

function loadDoc2(){

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "text.txt");
	xhr.onload = function() {
		var text = document.getElementById("textarea2");
		var lines = this.responseText.split("<br/>");
		var colors = ["#FF0000","#66CC66","#FF9966","#FFCCCC","#FF0066"];
	 	var index=0;
		for  (var i in lines) {
			const line = lines[i];
			var obj = document.createElement("p");
			obj.textContent=line;
			obj.style.color = colors[index];
			index=(index+1)%5;
			text.appendChild(obj);
		  }
	}
	
	xhr.send();

}