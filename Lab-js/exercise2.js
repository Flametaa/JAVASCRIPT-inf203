"use strict";
//2a
function wordCount(s){
    var words = s.split(" ");
    var obj = {};
    for (var i in words){
        if (obj[words[i]])  obj[words[i]]++;
        else obj[words[i]]=1;
    }
    
    return obj;

}
//2b

function WordList(s){
    var words = s.split(" ");
    var obj = wordCount(s);
    
    this.maxCountWord = function () {
        var ma=0;
        var res;

        for (var p in obj){
            if (obj[p]>ma){
                ma=obj[p];
                res=p;
            }
        }
        return res;
    }


    this.minCountWord = function () {
        var ma=Infinity;
        var res;

        for (var p in obj){
            if (obj[p]<ma){
                ma=obj[p];
                res=p;
            }
        }
        return res;
    }
    this.getWords = function (){
        var set = new Set(words.sort())
        return Array.from(set);


    }
    this.getCount = function(word){
        if (obj[word])
        return obj[word];
        return 0;

    }
    
    this.applyWordFunc = function(f){
        return this.getWords().map(f);
    }

}

exports.wordCount = wordCount;
exports.WordList = WordList;