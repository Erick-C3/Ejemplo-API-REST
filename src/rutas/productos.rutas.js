import { Router } from "express";
import productosControladores from "../controladores/productos.controladores.js";

const ruta = Router();


ruta.get("", productosControladores.obtenerProductos);
/* ruta.get("/api", ); */
ruta.get("/:id", productosControladores.obtenerProducto);
ruta.post("", productosControladores.crearProducto);
ruta.put("", productosControladores.actualizarProducto);
ruta.delete("", productosControladores.eliminarProducto);


export default ruta;