import config from '../../dbconfig.js';
import sql from 'mssql';
import IngredientesXPizzaService from './IngredientesXPizzaService.js'

const iXpS =  new  IngredientesXPizzaService();

export default class PizzaService{

    getAll = async() => {

        let returnEntity = null;

        console.log('Estoy en: PizzaSErvice.GetAll');

        try{
            
            let pool= await sql.connect(config);
           
            let result = await pool.request().query("SELECT * FROM Pizzas")
            
            returnEntity=result.recordsets[0];
            returnEntity.Ingredientes = await iXpS.getAll(result.recordsets[0]);
        } 
        catch(error) {
            console.log(error);
        }
       return returnEntity;
        }
    
    getById=async(id)=>{
    let returnEntity=null;
    console.log('Estoy en: PizzaSErvice.GetById(id)');
    try{
       
        let pool= await sql.connect(config);
        
        let result = await pool.request()
       
                            .input('pId', sql.Int, id)
                            .query('SELECT * FROM Pizzas WHERE id=@pId')

        returnEntity=result.recordsets[0][0];
        returnEntity.Ingredientes = await iXpS.getByIdPizza(id);
        
    } 
    catch(error) {
        console.log(error);
    }
   return returnEntity;
    }

    insert = async (cuerpo) => {
        let returnEntity=null;
        console.log('Estoy en: PizzaService.insert');
        try{
            let pool= await sql.connect(config);
            let result = await pool.request()
                                .input('pNombre',sql.VarChar, cuerpo.Nombre)
                                .input('pLibreGluten',sql.Bit, cuerpo.LibreGluten)
                                .input('pImporte', sql.Float,cuerpo.Importe)
                                .input('pDescripcion', sql.VarChar,cuerpo.Descripcion)
                                .query("INSERT INTO Pizzas(Nombre,LibreGluten,Importe,Descripcion) VALUES (@pNombre,@pLibreGluten,@pImporte,@pDescripcion)");
            returnEntity=result.rowsAffected;
        } 
        catch(error) {
            console.log(error);
        }
        return returnEntity;
    }


    update=async(cuerpo)=>{
            let returnEntity=null;
            console.log('Estoy en: PizzaService.update');
            try{
                let pool= await sql.connect(config);
                let result = await pool.request()
                                    .input('pId', sql.Int, cuerpo.Id)
                                    .input('pNombre',sql.VarChar, cuerpo.Nombre)
                                    .input('pLibreGluten',sql.Bit, cuerpo.LibreGluten)
                                    .input('pImporte', sql.Float,cuerpo.Importe)
                                    .input('pDescripcion', sql.VarChar,cuerpo.Descripcion)
                                    .query("UPDATE Pizzas SET Nombre=@pNombre,LibreGluten=@pLibreGluten,Importe=@pImporte,Descripcion=@pDescripcion WHERE Id=@pId");
              returnEntity=result.rowsAffected;
            } 
            catch(error) {
                console.log(error);
            }
           return returnEntity;
            }

    deleteById=async(id)=>{
    let rowsAffected=0;
    console.log('Estoy en: PizzaService.deleteById(id)');
    try {
        let pool = await sql.connect(config)
        let result= await pool.request()
                          .input('pId', sql.Int , id)
                          .query('DELETE FROM Pizzas WHERE Id=@pId');
      rowsAffected=result.rowsAffected;                    
    } catch (error) {
        console.log(error)
    }
    return rowsAffected;
    }

}