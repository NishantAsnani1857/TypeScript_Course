

abstract class Department {
    // name: string 
    // private employees: string[] = []  //Can only be accessed in this class not even in extended classes.
    static fiscalYear = 2024

    protected employees: string[] = [] //Unlike private can aslo be used in extended classes.

    constructor(public name: string, public readonly id: string) {
        //Same task as this.name=n but directly from constructor. Readonly exits only in Typescript.

        // this.name = n
    }
    static addEmployee(name: string) {
        return { name }
    }

    abstract describe(): void;

    // console.log(`Department (${this.id}): ${this.name}`);


    addEmployee(employee: string) {
        this.employees.push(employee)
    }


    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admin: string[]) {
        super('IT', id) //will have to use super to use this in inherited class 
    }
    describe() {
        console.log(`This is department with name ${this.name} and id ${this.id}`);
    }
}

class AccountingDepartment extends Department {
    private static instance: AccountingDepartment
    private lastReport: string;

    
    constructor(id: string, public reports: string[]) {
        super('Accounting', id)
        this.lastReport = reports[0]//will have to use super to use this in inherited class
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return;
        }
        else {
            this.instance = new AccountingDepartment('d3', [])
            return this.instance;
        }
    }


    describe() {
        console.log(`This is department with name ${this.name} and id ${this.id}`);
    }

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No reports available")

    }
    addEmployee(name: string) {
        if (name == "Max") {
            return
        }
        this.employees.push(name)
    }

    addReport(text: string) {
        this.reports.push(text)
        this.lastReport = text;
    }

}
// const department = new Department("Admin", "d1");

// const employee1 = Department.addEmployee('xyz')
// console.log(employee1, Department.fiscalYear); //One cannot use this with static variables

// console.log("This is Department base class");
// department.addEmployee('sahil')
// department.addEmployee('umang')
// department.printEmployeeInformation()
// department.describe()




const it = new ITDepartment("d2", ["Max"]);
it.describe()
it.addEmployee('Nishant')
it.addEmployee('Rajan')
it.printEmployeeInformation()
console.log(it.id);


const accounting = new AccountingDepartment("d3", ["Report-1"]);
accounting.describe()
accounting.addEmployee('Riken')
accounting.printEmployeeInformation()
accounting.addReport("Report-2")
console.log(accounting.mostRecentReport);

const accountStatic=AccountingDepartment.getInstance()
console.log(accountStatic);