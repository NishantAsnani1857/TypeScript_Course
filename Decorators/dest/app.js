"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logstring) {
    return function (constructor) {
        console.log(logstring);
        console.log(constructor);
    };
}
function withTemplate(template, hookId) {
    return function (originalconstructor) {
        return class extends originalconstructor {
            constructor(...args) {
                super();
                const hookEle = document.getElementById(hookId);
                if (hookEle) {
                    hookEle.innerHTML = template;
                    hookEle.querySelector('h1').textContent = this.name;
                }
            }
            ;
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = "Nishant";
        console.log("Creating person");
    }
};
Person = __decorate([
    Logger("LOGGER-FUNCTION"),
    withTemplate('<h1>My person Object</h1>', 'app')
], Person);
function Log(target, propertyName) {
    console.log("Property Decorator");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("accesor Decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("accesor Decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter Decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
    set amount(val) {
        if (val > 0) {
            this.price = val;
        }
        else {
            throw new Error("Cannot add negative amount ");
        }
    }
    getPriceWithTax(tax) {
        return this.price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "amount", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function Autobind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = "This works";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const button = document.querySelector('button');
const p = new Printer();
button === null || button === void 0 ? void 0 : button.addEventListener('click', p.showMessage.bind(p));
