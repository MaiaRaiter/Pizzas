// van los router que direccionn los endpoints haciendolo clases separadas
import { Router} from 'express';
import PizzaService from '../services/PizzaService.js';

//import { ReasonPhrases, StatusCodes} from 'http-status-codes';

const PizzaRouter = Router();
const pizzaService = new PizzaService();

PizzaRouter.get('/', async (req, res) => {
  console.log('Estoy en: pizzaController get /');
  
  const pizzas = await pizzaService.getAll();

  //return res.status(StatusCodes.OK).json(pizzas);
  return res.status(200).json(pizzas);
});

PizzaRouter.get('/:id', async (req, res) => {
  console.log('Estoy en: pizzaController get /:id', req.params.id);
  let respuesta;
  
  const pizza = await pizzaService.getById(req.params.id);
  console.log('pizza', pizza);
  if (pizza!=null){
    console.log('1');
    respuesta = res.status(200).json(pizza);
  } else {
    console.log('2');
    respuesta = res.status(404).send("No se encontro la Pizza.");
  }

  return respuesta;
});

PizzaRouter.post('', async (req, res) => {
  let cuerpo = req.body;
  console.log('Estoy en: pizzaController post /', cuerpo);

  const pizza = await pizzaService.insert(cuerpo);

  return res.status(201).json(pizza);
});

PizzaRouter.put('', async (req, res) => {
  let cuerpo = req.body;

 
  console.log('Estoy en: pizzaController put /:id');

  const pizza = await pizzaService.update(cuerpo);

  return res.status(200).json(pizza);
});

PizzaRouter.delete('/:id', async (req, res) => {
  console.log('Estoy en: pizzaController delete /:id', req.params.id);

  const pizza = await pizzaService.deleteById(req.params.id);

  return res.status(200).json(pizza);
});

export default PizzaRouter;