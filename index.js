import PizzaService from './src/services/pizzas-services.js'
import config from './dbconfig.js';


let svc=new PizzaService()
let result= await svc.getAll()
console.log(result);