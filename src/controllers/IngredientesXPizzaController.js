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
  
  const ingredientesXPizza = await ingredientesXPizzaService.getById(req.params.id);

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

/*
IngredientesRouter.post('', async (req, res) => {
  //estoy creando uno nuevo por body-- en postman va en body
  let cuerpo = req.body;
  console.log('Estoy en: IngredientesController post /', cuerpo);

  const ingredientes = await ingredientesService.insert(cuerpo);

  return res.status(201).json(ingredientes);
});

IngredientesRouter.put('', async (req, res) => {
  let cuerpo = req.body;

  console.log('Estoy en: IngredientesController put /:id');

  const ingredientes = await ingredientesService.update(cuerpo);

  return res.status(200).json(ingredientes);
});

IngredientesRouter.delete('/:id', async (req, res) => {
  console.log('Estoy en: IngredientesController delete /:id', req.params.id);

  const ingredientes = await ingredientesService.deleteById(req.params.id);

  return res.status(200).json(ingredientes);
});
*/


export default IngredientesXPizzaRouter;