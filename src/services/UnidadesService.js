import config from '../../dbconfig.js';
import sql from 'mssql';

export default class UnidadesService{
    getAll = async() => {
        let returnEntity = null;
        console.log('Estoy en: UnidadesService.GetAll');
        try{
            
            let pool= await sql.connect(config);
           
            let result = await pool.request().query("SELECT * FROM Unidades")

            returnEntity=result.recordsets[0];
        } 
        catch(error) {
            console.log(error);
        }
       return returnEntity;
        }

        getById=async(id)=>{
            let returnEntity=null;
            console.log('Estoy en: UnidadesService.GetById(id)');
            try{
               
                let pool= await sql.connect(config);
                
                let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Unidades WHERE id=@pId')
                returnEntity=result.recordsets[0][0];
            } 
            catch(error) {
                console.log(error);
            }
           return returnEntity;
        }

}