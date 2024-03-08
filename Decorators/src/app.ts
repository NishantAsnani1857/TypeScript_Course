// Code goes here
function Logger(logstring: string) {             //Decorator factory
    return function (constructor: Function) {
        console.log(logstring);
        console.log(constructor);
    }

}


function withTemplate(template: string, hookId: string) { //Decorator factory
    return function <T extends { new(...args: any[]): { name: string } }>(originalconstructor: T) {
        return class extends originalconstructor {
            constructor(...args: any[]) {
                super();
                const hookEle = document.getElementById(hookId);
                if (hookEle) {
                    hookEle.innerHTML = template
                    hookEle.querySelector('h1')!.textContent = this.name
                }

            };
        }
    }

}

@Logger("LOGGER-FUNCTION")
@withTemplate('<h1>My person Object</h1>', 'app')
class Person {
    name = "Nishant";
    constructor() {
        console.log("Creating person");
    }
}


function Log(target: any, propertyName: string | Symbol) {
    console.log("Property Decorator");
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("accesor Decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);

}

function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("accesor Decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);

}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Parameter Decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}



class Product {
    @Log // Property Decorator
    title: string;
    private price: number;


    constructor(t: string, p: number) {
        this.title = t
        this.price = p

    }
    @Log2  //accesor Decorator
    set amount(val: number) {
        if (val > 0) {
            this.price = val
        }
        else {
            throw new Error("Cannot add negative amount ")
        }
    }

    @Log3 // Method Decorator
    getPriceWithTax(@Log4 tax: number) { //Parameter Decorator
        return this.price * (1 + tax);
    }
}


function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor;

}

class Printer {
    message = "This works"

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const button = document.querySelector('button')
const p = new Printer();


button?.addEventListener('click', p.showMessage.bind(p))