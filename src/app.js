import express from "express";
import cors from "cors";
import productosRutas from "./rutas/productos.rutas.js";
import configuracion from "./configuracion.js";

const app = express();

const urlPermitidas = [configuracion.URL_PERMIT_1];

app.use(express.json());
app.use(cors({
    origin: (origin, callback)=>{
        console.log(origin);
        if (urlPermitidas.includes(origin) || !origin) {
            callback(null, true);
        }else{
            const error = new Error("Error: no permitido por CORS");
            error.status = 401;
            callback(error, false);
        }
    }
}));

app.use("/productos/",productosRutas)
app.use((req, res)=>{
    res.send("<h1> ERROR: ruta no encontrada</h1>");
})

export default app;