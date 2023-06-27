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

            token = await this.refreshTokenById(returnEntity.Id);

            if (token != null){

                returnEntity = await this.getByUserNamePassword(
                    usuario.UserName,
                    usuario.Password);
                
            }
        }

        return returnEntity;
    }
    getByUserNamePassword= async(userName, password) =>
    {
        let returnEntity=null;

        try
        {
            let pool= await sql.connect(config);
            let result = await pool.request()
                        .input ('pUsername', sql.Varchar, userName)
                        .input ('pPassword', sql.Varchar, password)
                        .query (`SELECT * FROM ${NOMBRE_TABLA} WHERE UserName=@pUsername `)

                        returnEntity=result.result.recordset[0];
        }
        catch(error){
            logHelper.logError(`${NOMBRE_TABLA} -> getByUserNamePassword`,error)

        }
        return returnEntity;
    }

    addMinutos = (minutos, date) => {
        date = date || new Date();

        if (typeof minutos !== 'numero') {
            throw new Error('Los minutos han expirado')
        }

        if (!(date instanceof Date)) {
            throw new Error('El tiempo de entrada ha expirado')
        }

        date.setMinutos(date.get)

    }

}

export default UsuariosService;


