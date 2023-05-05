import express from "express";
import dotenv from "dotenv"
import conectarDB from "./conifg/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js'
import visitaRoutes from './routes/visitaRoutes.js'

const app = express();
app.use(express.json())

dotenv.config();

conectarDB();

//Routing

app.use('/api/usuarios', usuarioRoutes)
app.use('/api/visitas', visitaRoutes)

const port = process.env.PORT || 4000

app.listen(port, () =>
{
    console.log(`servidor corriendo en el puerto ${port}`)
})