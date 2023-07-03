import {Router} from 'express';
import UsuariosService from '../services/UsauriosService.js';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

const Usuariosrouter = Router();
const svc = new UsuariosService();

Usuariosrouter.post('/login', async (req, res) => {
    let entidad = req.body;
    let respuesta;
    let returnEntity;

    returnEntity = await svc.login(entidad);

    if (returnEntity != null){
        returnEntity.Password = '*'.repeat(10);
        respuesta = res.status(StatusCodes.OK).json(returnEntity);
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`Usuario Inexistente`);
    }

    return respuesta;
});

export default Usuariosrouter;