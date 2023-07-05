import {Router} from 'express';
import UnidadesService from '../services/UnidadesService.js';

const UnidadesRouter = Router();
const unidadesService = new UnidadesService();

UnidadesRouter.get('/', async (req, res) => {
  console.log('Estoy en: UnidadesController get /');
  
  const unidades = await unidadesService.getAll();

  return res.status(200).json(unidades);
});

UnidadesRouter.get('/:id', async (req, res) => {

  console.log('Estoy en: UnidadesController get /:id', req.params.id);

  let respuesta;
  
  const unidades = await unidadesService.getById(req.params.id);

  console.log('ingredientes', unidades);
  
  if (unidades!=null){

    console.log('1');

    respuesta = res.status(200).json(unidades);

  } else {

    console.log('2');
    
    respuesta = res.status(404).send("No se encontraron las unidades.");
  }

  return respuesta;
});

export default UnidadesRouter;