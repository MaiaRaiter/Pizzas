import config from '../../dbconfig.js';
import sql from 'mssql';

export default class IngredientesService{
    getAll = async() => {
        let returnEntity = null;
        console.log('Estoy en: IngredientesService.GetAll');
        try{
            
            let pool= await sql.connect(config);
           
            let result = await pool.request().query("SELECT * FROM Ingredientes")

            returnEntity=result.recordsets[0];
        } 
        catch(error) {
            console.log(error);
        }
       return returnEntity;
        }

        getById=async(id)=>{
            let returnEntity=null;
            console.log('Estoy en: IngredientesService.GetById(id)');
            try{
               
                let pool= await sql.connect(config);
                
                let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Ingredientes WHERE id=@pId')
                returnEntity=result.recordsets[0][0];
            } 
            catch(error) {
                console.log(error);
            }
           return returnEntity;
        }
    
        /*
    getById=async(id)=>{
    let returnEntity=null;
    console.log('Estoy en: IngredientesService.GetById(id)');
    try{
       
        let pool= await sql.connect(config);
        
        let result = await pool.request()
                            .input('pId', sql.Int, id)
                            .query('SELECT  IngredientesXPizzas.Id AS IdRelacion, Ingredientes.Id AS IdIngrediente, Ingredientes.Nombre AS Nombre, IngredientesXPizzas.Cantidad AS Cantidad, Unidades.Id AS IdUnidad, Unidades.Nombre AS Unidad  FROM IngredientesXPizzas INNER JOIN Ingredientes ON IngredientesXPizzas.IdIngrediente = Ingredientes.IdINNER JOIN Pizzas ON IngredientesXPizzas.IdPizza = Pizzas.Id INNER JOIN Unidades ON IngredientesXPizzas.IdUnidad = Unidades.Id WHERE IdPizza = @pId')
        returnEntity=result.recordsets[0][0];
    } 
    catch(error) {
        console.log(error);
    }
   return returnEntity;
    }
    */

    insert = async (cuerpo) => {
        let returnEntity=null;
        console.log('Estoy en: IngredientesService.insert');
        try{
            let pool= await sql.connect(config);
            let result = await pool.request()
                                .input('pNombre',sql.VarChar, cuerpo.Nombre)
                                .query("INSERT INTO Ingredientes(Nombre) VALUES (@pNombre)");
            returnEntity=result.rowsAffected;
        } 
        catch(error) {
            console.log(error);
        }
        return returnEntity;
    }


    update=async(cuerpo)=>{
            let returnEntity=null;
            console.log('Estoy en: IngredientesService.update');
            try{
                let pool= await sql.connect(config);
                let result = await pool.request()
                                    .input('pId', sql.Int, cuerpo.Id)
                                    .input('pNombre',sql.VarChar, cuerpo.Nombre)
                                    .query("UPDATE Ingredientes SET Nombre=@pNombre WHERE Id=@pId");
              returnEntity=result.rowsAffected;
            } 
            catch(error) {
                console.log(error);
            }
           return returnEntity;
            }

    deleteById = async (id) => {

    let rowsAffected=0;

    console.log('Estoy en: IngredientesService.deleteById(id)');

    try {
        let pool = await sql.connect(config)
        let result= await pool.request()
                          .input('pId', sql.Int , id)
                          .query('DELETE FROM Ingredientes WHERE Id=@pId');

      rowsAffected=result.rowsAffected; 
                         
    } catch (error) {
        console.log(error)
    }
    return rowsAffected;
    }

}