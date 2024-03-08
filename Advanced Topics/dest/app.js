"use strict";
const total = 23;
console.log(total);
const person1 = {
    name: "nishant",
    privilages: ["dbAccess"]
};
const e1 = {
    name: "Boss",
    startDate: new Date(),
    privilages: ["Create Server"]
};
function printEmployeeInformation(emp) {
    console.log(emp.name);
    if ('privilages' in emp) {
        console.log('Privilages ' + emp.privilages);
    }
    if ('startDate' in emp) {
        console.log('Start-Date ' + emp.startDate);
    }
}
printEmployeeInformation(e1);
printEmployeeInformation({ name: "Manu", startDate: new Date() });
class Car {
    drive() {
        console.log("I am driving a car");
    }
}
class Truck extends Car {
    drive() {
        console.log("I am driving a Truck");
    }
    loadCarriage(amount) {
        console.log(`Loaded ${amount} units ready for shipment`);
    }
}
const v1 = new Car();
const v2 = new Truck();
function vechileInfo(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCarriage(200);
    }
}
vechileInfo(v1);
vechileInfo(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case ('bird'):
            speed = animal.flyingSpeed;
            break;
        case ('horse'):
            speed = animal.runningSpeed;
            break;
    }
    console.log("Moving at speed:  " + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 200 });
const paragraph = document.querySelector('p');
const userInput = document.querySelector('#user-input');
userInput.value = "hello";
const userinput = null;
const storedData = userinput !== null && userinput !== void 0 ? userinput : 'DEFAULT';
console.log(storedData);
