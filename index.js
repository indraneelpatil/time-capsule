console.log('Hello Neel');
let name = 'Neel';
console.log(name);

let person = {
    name: ' Mosh',
    age: 30
};

console.log(person);

function greet(name) {
    console.log('Hi from function '+name);
}

greet('Neel');

const man = {
    firstName : 'John',
    hobbies: ['music','movies']
}

console.log(man.hobbies[1]);
console.log(man.hobbies[0]);

let temp_str = `Testing ${person.age}`;
for(let i=0;i<=10;i++){
    console.log(`For loop number ${i}`);
}

const addNums = (num1,num2) => num1 + num2;

console.log(addNums(5,5));
