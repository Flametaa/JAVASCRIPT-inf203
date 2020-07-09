let ex3 = require ('./exercise3');
let Student = ex3.Student;
let ForeignStudent = ex3.ForeignStudent;
let fs = require('fs');

function Promotion(){
    var prom = []
    var siz = 0;
    this.add = function(student){
        prom[this.size()] = student;
        siz++;

    }
    this.size = function(){
        return siz;

    }
    this.get = function(i){
        return prom[i];

    }

    this.print = function(){

        var res=""
        for (var i=0; i<this.size();i++){

            var stud = prom[i];
            res+=stud.toString();
            res+="\n";

        }
        console.log(res);
        return res;

    }
    this.write = function () {
        var res = JSON.stringify(prom);
        return res;

    }
    this.read = function (st) {
        var str = JSON.parse(st)
        for (var i =0;i< str.length;i++){
            t=[]
            k=0;
            for (var a in str[i]){
                t[k] = str[i][a];
                k++;
            }
            if(k==3) {
                var ss = new Student(t[0], t[1], t[2]);
                this.add(ss);
            }
            else {
                var ss = new ForeignStudent(t[0], t[1], t[2], t[3]);
                this.add(ss);
            }
        }

    }

    this.saveToFile = function (fileName) {

        fs.writeFile(fileName, 'utf8', function readFileCallback(err){
                        console.log(err);
        });

    }
    this.readFromFile = function (fileName) {
        fs.readFile(fileName, 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {

                this.read(obje);
            }});

    }
}
exports.Promotion = Promotion;
