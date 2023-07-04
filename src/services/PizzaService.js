import config from '../../dbconfig.js';
import sql from 'mssql';
import IngredientesXPizzaService from './IngredientesXPizzaService.js'

const iXpS =  new  IngredientesXPizzaService();

export default class PizzaService{

    getAll = async(incliurIngredientes) => {

        let returnEntity = null;
        incliurIngredientes = incliurIngredientes || false;
        console.log('Estoy en: PizzaSErvice.GetAll');
        console.log('incliurIngredientes', incliurIngredientes);

        try{
            
            let pool= await sql.connect(config);
           
            let result = await pool.request().query("SELECT * FROM Pizzas")

            returnEntity = result.recordset;

            if (incliurIngredientes){

                if ((returnEntity != null) && (returnEntity.length > 0)) {

                    for (let i = 0; i < returnEntity.length; i++) {

                        const pizza = returnEntity[i];
        
                        returnEntity[i].Ingredientes = await iXpS.getByIdPizza(pizza.Id);
        
                        console.log(returnEntity[i].Ingredientes);
        
                    }

                }
            }

        } 
        catch(error) {
            console.log(error);
        }
        return returnEntity;
    }
    
    getById=async(id, incliurIngredientes)=>{

        let returnEntity=null;

        incliurIngredientes = incliurIngredientes || false;

        console.log('Estoy en: PizzaSErvice.GetById(id)');

        try{
        
            let pool= await sql.connect(config);
            
            let result = await pool.request()
        
                                .input('pId', sql.Int, id)
                                .query('SELECT * FROM Pizzas WHERE id=@pId')

            returnEntity=result.recordset[0];

            if (incliurIngredientes){

                if (returnEntity != null) {
                    returnEntity.Ingredientes = await iXpS.getByIdPizza(id);
                }
            }
            
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
                                .input('pId',sql.VarChar, cuerpo.Id)
                                .input('pNombre',sql.VarChar, cuerpo.Nombre)
                                .input('pLibreGluten',sql.Bit, cuerpo.LibreGluten)
                                .input('pImporte', sql.Float,cuerpo.Importe)
                                .input('pDescripcion', sql.VarChar,cuerpo.Descripcion)
                                .query("INSERT INTO Pizzas(Nombre,LibreGluten,Importe,Descripcion) VALUES (@pNombre,@pLibreGluten,@pImporte,@pDescripcion)");

            returnEntity=result.rowsAffected;

            returnEntity.rowsAffectedIngedientes = await iXpS.insertIngredienteXPizza(cuerpo.Id, cuerpo);
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