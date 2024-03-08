// Code goes here

console.log("HIIIII");


// const names: string[] = []

const names: Array<string> = []  // Both are string arrays but this one has a generic type;

const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 2000)
})


promise
    .then((data) => console.log(data))


function extractAndCOnvert<T extends Object, U extends keyof T>(obj: T, key: U) {
    return "Value: " + obj[key]
}

let obj1 = {
    name: "Nishant",
    roll_no: 92
}

console.log(extractAndCOnvert(obj1, 'name'));


class DataStorage<T>{
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        this.data.splice(this.data.findIndex(ele => ele === item), 1)
    }

    getItems() {
        return [...this.data]
    }
}


const textStorage = new DataStorage<string>()

textStorage.addItem("asv")
textStorage.addItem("asfve")

console.log(textStorage.getItems());


const objectStorage = new DataStorage<object>()

objectStorage.addItem({ name: "Nishant", roll_No: 92 })
objectStorage.addItem({ name: "Rajan", roll_No: 135 })

console.log(objectStorage.getItems());



