
import config from './dbconfig.js';
import express from "express";
import cors from "cors";
import PizzaRouter from './src/controllers/pizzaController.js'
const app = express();
const port = 3000;



// Estos son middlewares, son como filtros - todos los request pasan por esto
// Ejemplo: si esta logeado se puede continuar
// hago uno de si me vino la api key
// hago uno para cada tabla: /api/pizzzas lo atiende un solo middle.
//app = express

// Middleware: req - res - next



// const horaMiddleware = function (req, res, next) {
//     console.log('Middleware (Antes): ' + new Date().toISOString());
  
//     // Ir al proximo middleware
//     next();
//     console.log('Middleware (Despues): ' + new Date().toISOString());
//   }

app.use(cors())
app.use(express.json());
app.use(express.static('public'));
// app.use(horaMiddleware);

app.use("/api/pizzas", PizzaRouter);

app.listen(port, () => {
    console.log("Escuchando en el " + port );
});