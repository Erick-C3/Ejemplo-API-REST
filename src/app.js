import express from "express";
import cors from "cors";
import productosRutas from "./rutas/productos.rutas.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/productos/",productosRutas)
app.use((req, res)=>{
    res.send("<h1> ERROR: ruta no encontrada</h1>");
})

export default app;