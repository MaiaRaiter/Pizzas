import config from '../../dbconfig.js';
import sql from 'mssql';
import logHelper from '../modules/log-helper.js';
import crypto from 'crypto';

const NOMBRE_SERVICE = 'UsuariosService';
const NOMBRE_TABLA = 'Usuarios';

export default class UsuariosService{

    login = async (usuario) =>{
    let returnEntity = null;
    let token;

    returnEntity = await this.getByUserNamePassword(
        usuario.UserName,
        usuario.Password);
        console.log(returnEntity);
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
                        .input ('pUserName', sql.VarChar, userName)
                        .input ('pPassword', sql.VarChar, password)
                        .query (`SELECT * FROM ${NOMBRE_TABLA} WHERE UserName=@pUserName`)

                        returnEntity=result.recordset[0];
        }
        catch(error){
            logHelper.logError(`${NOMBRE_TABLA} -> getByUserNamePassword`,error)

        }
        return returnEntity;
    }

    getByToken = async (token) => {

        let returnEntity = null;

        try{
            let pool= await sql.connect(config);
            let result = await pool.request()
            .input ('pToken', sql.VarChar, token)
            .query (`SELECT * FROM ${NOMBRE_TABLA} WHERE Token=@pToken `)

            returnEntity = result.recordsets[0][0];

        }
        catch (error){
            logHelper.logError(`${NOMBRE_TABLA} -> getByToken`,error);
        }
        return returnEntity;
    }

    
    

    addMinutos = (minutos, date) => {
        date = date || new Date();

        if (typeof minutos !== 'numero') {
            console.log('Los "minutos" han expirado')
        }

        if (!(date instanceof Date)) {
            console.log('El tiempo de entrada ha expirado')
        }

        date.setMinutes(date.getMinutes() + minutos)

        return date;

    }

    refreshTokenById= async(id) => {
        let rowsAffected=0;
        let token = crypto.randomUUID();
        let expirationDate = this.addMinutos(15,new Date ());

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                            .input ('pToken', sql.VarChar, token)
                                            .input ('pId', sql.Int, id)
                                            .input ('pExpirationDate', sql.VarChar, expirationDate.toISOString())
                                            .query (`UPDATE ${NOMBRE_TABLA} SET
                                                    Token = @pToken,
                                                    TokenExpirationDate = @pTokenExpirationDate
                                                    WHERE Id = @pId`);

            rowsAffected = result.rowsAffected;
            console.log(rowsAffected);
        }
        catch (error) {
            console.log(error);
            logHelper.logError(`${NOMBRE_SERVICE}->updateTokenById`, error);
        }
        return rowsAffected;
    }

}



