import config from '../../dbconfig.js';
import sql from 'mssql';

export default class IngredientesXPizzaService{

    getAll = async() => {

        let returnEntity = null;
        
        console.log('Estoy en: PizzaSErvice.GetAll');
       

        try{
            
            let pool= await sql.connect(config);
           
            let result = await pool.request().query("SELECT * FROM IngredientesXPizzas")

            returnEntity = result.recordset;

        } 
        catch(error) {
            console.log(error);
        }
        return returnEntity;
    }

        getByIdPizza = async (idPizza) => {
            let returnEntity=null;

            console.log('Estoy en: IngredientesXPizzaService.GetById(id)');

            try{
                
                let pool= await sql.connect(config);
                
                let result = await pool.request()
                                    .input('pIdPizza', sql.Int, idPizza)
                                    .query(`SELECT 
                                            Ingredientes.Id, 
                                            Ingredientes.Nombre 
                                            FROM IngredientesXPizzas 
                                            INNER JOIN Ingredientes ON IngredientesXPizzas.IdIngrediente = Ingredientes.Id
                                            Where IdPizza = @pIdPizza`);
                
                returnEntity=result.recordset;
            } 
            catch(error) {

                console.log(error);
            }

           return returnEntity;
        }

        insertIngredienteXPizza = async (cuerpo) => {
        let returnEntity=null;
        console.log('Estoy en: IngredientesXPizzaService.insertIngredienteXPizza');
        try{
            let pool= await sql.connect(config);
            let result = await pool.request()
                                .input('pIdPizza',sql.Int, cuerpo.IdPizza)
                                .input('pIdIngrediente',sql.Int, cuerpo.IdIngrediente)
                                .input('pCantidad',sql.Int, cuerpo.Cantidad)
                                .input('pIdUnidad',sql.Int, cuerpo.IdUnidad)
                                .query("INSERT INTO IngredientesXPizzas(IdPizza,IdIngrediente,Cantidad,IdUnidad) VALUES (@pIdPizza,@pIdIngrediente,@pCantidad,@pIdUnidad)");
            returnEntity=result.rowsAffected;
        } 
        catch(error) {
            console.log(error);
        }
        return returnEntity;
    }

    deleteByIdIngrediente = async (idIngrediente) => {
        

        let rowsAffected=0;

        console.log('Estoy en: IngredientesXPizzaService.deleteById(id)');

        try {
            let pool = await sql.connect(config)
            let result= await pool.request()
                            .input('pIdIngrediente', sql.Int , idIngrediente)
                            .query('DELETE FROM IngredientesXPizzas WHERE IdIngrediente=@pIdIngrediente');

            rowsAffected=result.rowsAffected; 
                            
        } catch (error) {
            console.log(error)
        }
        return rowsAffected;
    }

}