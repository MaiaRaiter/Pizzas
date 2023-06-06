import {Router} from 'express';
import IngredientesService from '../services/IngredientesService.js';

const IngredientesRouter = Router();
const ingredientesService = new IngredientesService();

IngredientesRouter.get('/', async (req, res) => {
  console.log('Estoy en: IngredientesController get /');
  
  const ingredientes = await ingredientesService.getAll();

  return res.status(200).json(ingredientes);
});

IngredientesRouter.get('/:id', async (req, res) => {

  console.log('Estoy en: IngredientesController get /:id', req.params.id);

  let respuesta;
  
  const ingredientes = await ingredientesService.getById(req.params.id);

  console.log('ingredientes', ingredientes);
  
  if (ingredientes!=null){

    console.log('1');

    respuesta = res.status(200).json(ingredientes);

  } else {

    console.log('2');
    
    respuesta = res.status(404).send("No se encontro el ingrediente.");
  }

  return respuesta;
});


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


export default IngredientesRouter;