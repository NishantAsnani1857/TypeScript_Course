"use strict";
const button = document.querySelector('button');
function add(n1, n2, showResult, phrase) {
    const result = n1 + n2;
    if (typeof (n1) !== 'number' || typeof (n2) !== 'number') {
        throw new Error('Invalid input');
    }
    else {
        if (printResult) {
            console.log(phrase + " " + result);
        }
    }
    return result;
}
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["READ_ONLY"] = "READ_ONLY";
    Role["AUTHOR"] = "AUTHOR";
})(Role || (Role = {}));
// const person: {
//     name: string,
//     age: number,
//     hobbies: string[], //array
//     role: [string, number, ...string[]] //tuple
// } = {
const person = {
    name: "Nishant",
    age: 30,
    hobbies: ["Sports", "Academics"],
    Role: "READ_ONLY"
};
if (person.Role === Role.READ_ONLY) {
    console.log("person is read_only");
}
console.log(person);
let favouriteActivities;
favouriteActivities = ["Sports"];
for (const hobby of person.hobbies) {
    console.log(hobby);
}
const printResult = true;
const phrase = "Result is";
add(3, 4.8, printResult, phrase);
function combine(number1, number2, resultType) {
    let result;
    if (typeof (number1) == 'number' && typeof (number2) == 'number') {
        result = number1 + number2;
    }
    else {
        result = number1.toString() + number2.toString();
    }
    if (resultType === 'as-integer') {
        return +result;
    }
    else if (resultType === 'as-string') {
        return result.toString();
    }
}
const result = combine(1, 11, 'as-integer');
console.log(result);
const result1 = combine("efrv", 'afe', 'as-string');
console.log(result1);
console.log(addAndHandle(10, 20, (result) => {
    console.log(result);
}));
const userName = 'sdfvv';
console.log(userName);
button.addEventListener('click', (e) => {
    const v = 20;
    console.log("Button Clicked");
});
