
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var names =[];
const database = 'storage.json';
const jsonArray = [{"title":"foo","color":"red","value":20},{"title":"bar","color":"ivory","value":100},{"title":"new","color":"pink","value":300}];
const requestListener = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    if (req.url=='/'){
    
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end('New Server');
    }
    if (req.url=='/exit'){
        
        res.writeHeader(200,{'Content-Type': 'text/html'});
        res.write('The server will stop now.', 'utf8', process.exit, 0);
        res.end();
        
    
    }
    if (req.url.substring(0,5) =="/show"){
        
        var data = JSON.parse(fs.readFileSync(database));
        
        res.writeHeader(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(data));
        res.end();

    }
    if (req.url.substring(0,8) =="/restore"){
        var querys = querystring.parse(req.url.substring(8,));
        
        fs.writeFileSync(database, JSON.stringify(jsonArray));
        res.writeHeader(200, {"Content-Type": "application/json"});
        res.write( JSON.stringify(jsonArray));
        res.end();

    }
    if (req.url.substring(0,5) =="/add?"){
        var querys = querystring.parse(req.url.substring(5,));
        var obj = {
            "title": querys.title,
            "color": querys.color,
            "value": querys.value
        };
        var data = JSON.parse(fs.readFileSync(database));
        data.push(obj);
        fs.writeFileSync(database, JSON.stringify(data));
        res.writeHeader(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(obj) + "        Was added successfully\n");
        res.end();

    }

    if (req.url.substring(0,9) =="/piechart"){
        var result=[];
        var data = JSON.parse(fs.readFileSync(database));
        var values = [];
        var sum=0;
        for (var i in data){
            sum+=parseFloat(data[i].value);
        }
        var cum = 0;
        var prevx = 100;
        var prevy = 0;
        for (var i in data){
            cum+=parseFloat(data[i].value);
            
            var a = (2*Math.PI) *(cum/sum);
            var x = Math.cos(a)*100;
            var y = Math.sin(a)*100;
            var flag = 0;
            if ((parseFloat(data[i].value)/sum)>0.5) flag = 1;
            var svg ="<path d=\"M0,0 L"+prevx+","+prevy+ " A100,100 0 "+flag+",1 "+x+","+y+" Z\" fill=\""+data[i].color+"\"/> ";
            result.push(svg);
            prevx=x;
            prevy=y;

        }
            
        
        
        res.writeHeader(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(result));
        res.end();

    }

    if (req.url.substring(0,8) =="/remove?"){
        var querys = querystring.parse(req.url.substring(8,));
        var ind = querys.index;

        var data = JSON.parse(fs.readFileSync(database));   
        var obj = data[ind];
        data.splice(ind,1);

        fs.writeFileSync(database, JSON.stringify(data));

        res.writeHeader(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(obj) + "        Was removed successfully\n");
        res.end();

    }

    if (req.url.substring(0,7) =="/files/") {
        var ss=req.url;
        var filename = ss.substring(7,);
        if (ss.includes("../")) {
            res.writeHeader(403, {"Content-Type": "text/html"});
            res.write("403 Forbidden");
            res.end();
            return;
          }
        fs.readFile(filename, (err, data) => {

            if (err) {
              res.writeHead(404);
              res.write("File not found");
              res.end();
            }
            else{
                var mimeTypes = {
                    "html": "text/html",
                    "jpeg": "image/jpeg",
                    "jpg": "image/jpeg",
                    "png": "image/png",
                    "js": "text/javascript",
                    "css": "text/css",
                    "txt": "text/plain",
                    "js" : "application/javascript",
                    "json": "application/json"
                  };
                
                var extension = filename.substring(filename.indexOf('.')+1,);
                
                var mime = mimeTypes[extension] ? mimeTypes[extension] : "text/plain";
                console.log(mime);
                res.writeHead(200,{"Content-type": mime });
                res.write(data);
                res.end();
            }
          })
    }
    if (req.url.substring(0,7) =="/hello?") {
        var querys = querystring.parse(req.url.substring(7,));
        console.log(querys);
        res.writeHead(200,{"Content-type": "text/html; charset=utf-8" });
        res.write("Hello "+querys.name);
        res.end();
    }
    if (req.url.substring(0,8) =="/hello2?") {

        var querys = querystring.parse(req.url.substring(8,));
        var name = querys.name.replace(/</g, "&lt&").replace(/>/g,"&gt&");
        
        
        console.log(names);
        var str = "";
        for (var i in names){
            str = str+names[i];
            if (i!=(names.length-1)) str+=", ";
        }
        names.push(name);
        res.writeHead(200,{"Content-type": "text/html; charset=utf-8" });
        
        res.write("Hello "+name+", the following users have already visited this page: "+str);
        res.end();
       
    }
    if (req.url.substring(0,6) =="/clear"){
        
        names = [];
        var json = JSON.stringify([{title:"empty", color:"red", value:1}]);

        fs.writeFileSync(database, json);

        res.writeHeader(200, {"Content-Type": "application/json"});
        res.write(json);
        res.end();
    }

  }
  
  const server = http.createServer(requestListener);
  server.listen(process.argv[2]);
  console.log("Server running on port "+process.argv[2]);