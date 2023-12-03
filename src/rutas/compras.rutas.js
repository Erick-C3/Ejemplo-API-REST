import { Router } from "express";
import comprasControladores from "../controladores/compras.controladores.js";

const ruta = Router();


ruta.get("", comprasControladores.obtenerCompras);
/* ruta.get("/api", ); */
ruta.get("/:id", comprasControladores.obtenerCompra);
ruta.post("", comprasControladores.crearCompra);
ruta.put("/:id", comprasControladores.actualizarCompra);
ruta.delete("/:id", comprasControladores.eliminarCompra);


export default ruta;