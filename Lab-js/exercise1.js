"use strict";
//1a
function fibonacciIt(n){
    var fib=[];
    fib[0]=0; fib[1]=1;
    for (var i=2;i<=n;i++){
        fib[i]=fib[i-1]+fib[i-2];
    }
    return fib[n];
    
}

//1b
function fibonacciRec(n){
    if (n==0) return 0;
    if (n==1) return 1;
    return fibonacciRec(n-1)+fibonacciRec(n-2)

}
//1c
function fibonacciArray(t){
    var res=[];
    for (var i=0;i<t.length;i++){
        res[i]=fibonacciIt(t[i]);
    }
    return res;

}
//1d
function fibonacciMap(t){
    
    return t.map(fibonacciIt);

}

exports.fibonacciIt = fibonacciIt;
exports.fibonacciRec = fibonacciRec;
exports.fibonacciArray = fibonacciArray;
exports.fibonacciMap = fibonacciMap;
