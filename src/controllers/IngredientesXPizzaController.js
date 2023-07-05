import {Router} from 'express';
import IngredientesXPizzaService from '../services/IngredientesXPizzaService.js';

const IngredientesXPizzaRouter = Router();
const ingredientesXPizzaService = new IngredientesXPizzaService();

IngredientesXPizzaRouter.get('/', async (req, res) => {
  console.log('Estoy en: ingredientesXPizzaController get /');
  
  const ingredientesXPizza = await ingredientesXPizzaService.getAll();

  return res.status(200).json(ingredientesXPizza);
});


IngredientesXPizzaRouter.get('/:id', async (req, res) => {

  console.log('Estoy en: ingredientesXPizzaController get /:id', req.params.id);

  let respuesta;
  
  const ingredientesXPizza = await ingredientesXPizzaService.getByIdPizza(req.params.id);

  console.log('ingredientesXPizza', ingredientesXPizza);

  if (ingredientesXPizza!=null){

    console.log('1');

    respuesta = res.status(200).json(ingredientesXPizza);

  } else {

    console.log('2');
    
    respuesta = res.status(404).send("No se encontraron los ingredientes de la pizza.");
  }

  return respuesta;
});


IngredientesXPizzaRouter.post('', async (req, res) => {
  let cuerpo = req.body;
  console.log('Estoy en: ingredientesXPizzaController post /', cuerpo);

  const ingredientesXPizza = await ingredientesXPizzaService.insertIngredienteXPizza(cuerpo);

  return res.status(201).json(ingredientesXPizza);
});

IngredientesXPizzaRouter.delete('/:idIngrediente', async (req, res) => {
  console.log('Estoy en: ingredientesXPizzaController delete /:idIngrediente', req.params.idIngrediente);

  const ingredientesXPizza = await ingredientesXPizzaService.deleteByIdIngrediente(req.params.idIngrediente);

  return res.status(200).json(ingredientesXPizza);
});

export default IngredientesXPizzaRouter;