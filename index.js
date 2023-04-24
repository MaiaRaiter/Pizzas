import PizzaService from './src/services/pizzas-services.js'
import config from './dbconfig.js';


let svc=new PizzaService()
let result= await svc.getAll(1,'id',null)
console.log(result);
