import config from '../../dbconfig.js';
import sql from 'mssql';

export default class IngredientesXPizzaService{

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

        getAll = async() => {
            let returnEntity = null;
            
            console.log('Estoy en: IngredientesXPizzaService.GetAll');
            try{
                
                let pool= await sql.connect(config);
               
                let result = await pool.request().query(`SELECT 
                Pizzas.Id, 
                Ingredientes.Id, 
                Ingredientes.Nombre 
                FROM IngredientesXPizzas 
                INNER JOIN Ingredientes ON IngredientesXPizzas.IdIngrediente = Ingredientes.Id
                INNER JOIN Pizzas ON IngredientesXPizzas.IdPizza = Pizzas.Id
                `)
                returnEntity=result.recordsets[0];
            } 
            catch(error) {
                console.log(error);
            }
           return returnEntity;
            }

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