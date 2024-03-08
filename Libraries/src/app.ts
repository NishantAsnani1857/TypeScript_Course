import _ from 'lodash';
import { Product } from './product.model'
import 'reflect-metadata'
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator'


console.log(_.shuffle([1, 2, 3]));
console.log('HI')

const products = [
    { title: "A carpet", price: 20 },
    { title: "A pen", price: 6 }
]

const newProd = new Product("", -5.99)
validate(newProd)
.then((errors)=>{
    if(errors.length>0){
        console.log("THERE ARE VALIDATION ERRORS");
    }
    else{
        console.log(newProd.getInformation());
        console.log("NO ERRORS EXIST");
    }
})


// const loadedProducts = products.map((prods) => {
//     return new Product(prods.title, prods.price)
// })

const loadedProducts = plainToInstance(Product, products)
for (const prods of loadedProducts) {
    console.log(prods.getInformation());
}

const product1 = new Product("book", 2)
console.log(product1.getInformation());