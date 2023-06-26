import config from '../../dbconfig.js';
import sql from 'mssql';
import logHelper from './../modules/log-helper.js';
import crypto from 'crypto';

const NOMBRE_SERVICE = 'UsuariosService';
const NOMBRE_TABLA = 'Usuarios';

class UsuariosService{

    login = async (usuario) =>{
    let returnEntity = null;
    let token;

    returnEntity = await this.getByUserNamePassword(
        usuario.UserName,
        usuario.Password);

        if (returnEntity != null) {

            token = await this.refreshTokenById(returnEntity.Id)

        }


    )



    }

}

export default UsuariosService;


