import PizzaService from './src/services/pizzas-services.js'
import config from './dbconfig.js';
import express from "express";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

const port = 3000;


app.get('/getAll', async (req, res)=>{
    let svc = new PizzaService()
    let result = await svc.getAll()
     res.send(result);
})

app.get('/getById/:id', async (req, res)=>{
    let svc = new PizzaService()
    let result = await svc.getById(req.params.id)
     res.send(result);
})

app.post('/insert', async function (req, res){
        let svc = new PizzaService()
        let Objparametros = req.query
        let result = await svc.insert(Objparametros.nombre,Objparametros.libreGluten, Objparametros.importe, Objparametros.descripcion)
        res.send(result)
})

app.put('/update', async function (req, res){
    let svc = new PizzaService()
    let Objparametros = req.query
    let result = await svc.update(Objparametros.id,Objparametros.nombre,Objparametros.libreGluten, Objparametros.importe, Objparametros.descripcion)
    res.send(result)
})

app.delete('/deleteById', async function (req, res){
    let svc = new PizzaService()
    let result = await svc.deleteById(req.query.id)
     res.send(result);
})

app.listen(port, () => {
    console.log("Escuchando en el " + port );
});