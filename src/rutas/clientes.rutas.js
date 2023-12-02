import { Router } from "express";
import clientesControladores from "../controladores/clientes.controladores.js";

const ruta = Router();


ruta.get("", clientesControladores.obtenerClientes);
/* ruta.get("/api", ); */
ruta.get("/:id", clientesControladores.obtenerCliente);
ruta.post("", clientesControladores.crearCliente);
ruta.put("/:id", clientesControladores.actualizarCliente);
ruta.delete("/:id", clientesControladores.eliminarCliente);


export default ruta;