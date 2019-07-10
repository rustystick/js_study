
let array = [];

function function1 (){
  console.log("i'm function 1");
}

function function2 (){
  console.log("i'm function 2");

}
array.push(function1);
array.push(function2);


array = array.filter((fn)=> {return fn !== function1})

console.log(array)