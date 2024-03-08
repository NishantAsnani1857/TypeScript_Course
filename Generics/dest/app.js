"use strict";
console.log("HIIIII");
const names = [];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 2000);
});
promise
    .then((data) => console.log(data));
function extractAndCOnvert(obj, key) {
    return "Value: " + obj[key];
}
let obj1 = {
    name: "Nishant",
    roll_no: 92
};
console.log(extractAndCOnvert(obj1, 'name'));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.findIndex(ele => ele === item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("asv");
textStorage.addItem("asfve");
console.log(textStorage.getItems());
const objectStorage = new DataStorage();
objectStorage.addItem({ name: "Nishant", roll_No: 92 });
objectStorage.addItem({ name: "Rajan", roll_No: 135 });
console.log(objectStorage.getItems());
