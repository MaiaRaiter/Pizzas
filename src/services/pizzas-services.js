import config from '../../dbconfig.js';
import sql from 'mssql';


export default class PizzaService{
    getAll = async() => {
        let returnEntity = null;
        console.log('Estoy en: PizzaSErvice.GetAll');
        try{
            
            let pool= await sql.connect(config);
           
            let result = await pool.request().query("SELECT * FROM Pizzas")

            returnEntity=result.recordsets[0];
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
        //me conecto con la base
        let pool= await sql.connect(config);
        //hago un request
        let result = await pool.result()
        //por parametros (input)
                            .input('pId', sql.Int, id)
                            .query('SELECT * FROM Pizzas WHERE id=@pId')
        returnEntity=result.recordsets[0][0];
    } 
    catch(error) {
        console.log(error);
    }
   return returnEntity;
    }

    insert=async(id, nombre,libreGluten, importe, descripcion)=>{
        let returnEntity=null;
        console.log('Estoy en: PizzaSErvice.insert');
        try{
            let pool= await sql.connect(config);
            let result = await pool.result()
                                .input('pId', sql.Int, id)
                                .imput('pNombre',sql.VarChar, nombre)
                                .imput('pLibreGluten',sql.Bit, libreGluten)
                                .input('pImporte', sql.Float,importe)
                                .input('pDescripcion', sql.VarChar,descripcion)
                                .query("INSERT INTO Pizzas WHERE Nombre=@pNombre,LibreGluten=@pLibreGluten,Importe=@pImporte,Descripcion=@pDescripcion WHERE id=@pId");
            resultado=result.rowsAffected;
        } 
        catch(error) {
            console.log(error);
        }
       return resultado;
        }


        update=async(id, nombre,libreGluten, importe, descripcion)=>{
            let returnEntity=null;
            console.log('Estoy en: PizzaSErvice.update');
            try{
                let pool= await sql.connect(config);
                let result = await pool.result()
                                    .input('pId', sql.Int, id)
                                    .imput('pNombre',sql.VarChar, nombre)
                                    .imput('pLibreGluten',sql.Bit, libreGluten)
                                    .input('pImporte', sql.Float,importe)
                                    .input('pDescripcion', sql.VarChar,descripcion)
                                    .query("UPDATE Pizzas SET Nombre=@pNombre,LibreGluten=@pLibreGluten,Importe=@pImporte,Descripcion=@pDescripcion WHERE id=@pId");
                resultado=result.rowsAffected;
            } 
            catch(error) {
                console.log(error);
            }
           return resultado;
            }

    deleteById=async(id)=>{
    let rowsAffected=0;
    console.log('Estoy en: PizzaService.deleteById(id)');
    try {
        let pool = await sql.connect(config)
        let result= await pool.request()
                          .input('pId', sql.Int , id)
                          .query('DELETE FROM Pizzas WHERE id=@pId');
      rowsAffected=result.rowsAffected;                    
    } catch (error) {
        console.log(error)
    }
    return rowsAffected;
    }
}