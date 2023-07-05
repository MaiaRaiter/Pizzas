
import config from './dbconfig.js';
import express from "express";
import cors from "cors";
import PizzaRouter from './src/controllers/pizzaController.js'
import IngredientesRouter from './src/controllers/IngredientesController.js'
import IngredientesXPizzaRouter from './src/controllers/IngredientesXPizzaController.js';
import UsuarioRouter from './src/controllers/UsuariosController.js';
import pkg from 'express/lib/response.js';
import autenticationMiddleWare from './middlewares/autenticacion-middleware.js';
import UnidadesRouter from './src/controllers/UnidadesController.js';
const { header } = pkg;


const app = express();
const port = 3000;


// Estos son middlewares, son como filtros - todos los request pasan por esto
// Ejemplo: si esta logeado se puede continuar
// hago uno de si me vino la api key
// hago uno para cada tabla: /api/pizzzas lo atiende un solo middle.
//app = express

// Middleware: req - res - next

const horaMiddleware = function (req, res, next) {

    console.log('Middleware (Antes): ' + new Date().toISOString());

    next();

    console.log('Middleware (Despues): ' + new Date().toISOString());
}

const checkApiKey = function (req, res, next) {
  
    const apiKey = req.header['apikey'];

    if (apiKey !== '123456789') {
            
        return res.status(401).json({ error: 'Unauthorized, es necesario una ApiKey Valida.' });
    }

    next();
}

const CreatedByAlumno = function (req, res, next) {

    const createdBy = 'maia y shirly'; 

    res.set('CreatedBy', createdBy);

    next();
}        

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
//app.use(horaMiddleware);
//app.use(checkApiKey);
//app.use(CreatedByAlumno);

app.use(autenticationMiddleWare.requiereAutenticacion);
app.use("/api/pizzas", PizzaRouter);
app.use("/api/ingredientes", IngredientesRouter);
app.use("/api/ingredientesXPizza", IngredientesXPizzaRouter);
app.use("/api/usuarios", UsuarioRouter);
app.use("/api/unidades", UnidadesRouter);

app.listen(port, () => {
    console.log("Escuchando en el " + port );
});