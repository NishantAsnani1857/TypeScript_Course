// interface Person {
//     name: string,
//     age: number,
//     greet(phrase: string): void;
// }

// let user: Person
// user = {
//     name: "Nishant",
//     age: 20,
//     greet(phrase: string) {
//         console.log(`${phrase} - ${this.name}`);
//     }
// }


// user.greet('Hi there')

interface Named { //Interface Named
    Name?: string
    outputName?: string  //Optional property doesn't force to imply. 
}


interface Greetable extends Named {  // Compulsarily implement named 
    greet(phrase: string): void;
}


class Person implements Greetable {  //Any class can implement multiple interfaces.
    outputName = "this is output"
    Name="Optional name"
    constructor(public name?: string) {
        if (name = "Default") {
            this.name = name;
        }
    }

    greet() {
        console.log(`How are you ${this.name} ??`);
    }
}


const person = new Person("Nishant");
person.greet()
console.log(person.Name);