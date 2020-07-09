"use strict";
//3a

function Student(lastName,firstName,id){
    this.lastName = lastName;
    this.firstName = firstName;
    this.id=id;
     this.toString = function (){
        var st ="student: "+lastName+", "+firstName+", "+id;
        return st;

    }

}
//3c
function ForeignStudent(lastName,firstName,id,nationality){
    this.lastName = lastName;
    this.firstName = firstName;
    this.id=id;
    this.nationality = nationality;

    this.toString = function (){
        return "student: "+lastName+", "+firstName+", "+id+", "+nationality;
        
    } 
}


exports.Student = Student;
exports.ForeignStudent = ForeignStudent;