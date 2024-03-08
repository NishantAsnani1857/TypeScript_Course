const total: number = 23;

console.log(total);
type Admin = {
    name: string,
    privilages: string[]
}

type Employee = {
    name: string,
    startDate: Date
}

type elevatedEmployee = Admin & Employee  //Similar to interface inheritance servers the same purpose.  //In object type intersection is combination of properties 


//In simple types such as string, number it is the common (intersection) of types mentioned below

type combinable = string | number
type Numeric = number | boolean


type Universal = combinable & Numeric //Only numeric 

const person1: Admin = {
    name: "nishant",
    privilages: ["dbAccess"]
};

const e1: elevatedEmployee = {
    name: "Boss",
    startDate: new Date(),
    privilages: ["Create Server"]

}

//Typeguard for Custom types

type unknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: unknownEmployee) {
    console.log(emp.name);
    if ('privilages' in emp) { //Cannot use typeof as it would return object
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
    loadCarriage(amount: number) {
        console.log(`Loaded ${amount} units ready for shipment`);
    }
}

const v1 = new Car()
const v2 = new Truck()


type Vehicle = Car | Truck


function vechileInfo(vehicle: Vehicle) {
    vehicle.drive()
    if (vehicle instanceof Truck) {
        vehicle.loadCarriage(200)
    }
}


vechileInfo(v1)
vechileInfo(v2)



interface Bird {
    type: 'bird',
    flyingSpeed: number
}

interface Horse {
    type: 'horse',
    runningSpeed: number
}


type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case ('bird'):
            speed = animal.flyingSpeed;
            break

        case ('horse'):
            speed = animal.runningSpeed;
            break

    }
    console.log("Moving at speed:  " + speed);

}

moveAnimal({ type: 'bird', flyingSpeed: 200 })


const paragraph = document.querySelector('p')! //Shows paragra[h as it is selected

const userInput = <HTMLInputElement>document.querySelector('#user-input')!; //Shows HTML Element so typecast to input element


userInput.value = "hello"


interface errorContainer {
    [prop: string]: string    // Index Properties defining index and value types
}

interface errorBag {
    email: "Not a valid E-mail",
    username: "Must be a valid username"
}

const userinput = null;

const storedData = userinput ?? 'DEFAULT' //Prints Deafault only when userinput is undefind or null.

console.log(storedData);

