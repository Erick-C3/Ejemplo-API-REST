import { Router } from "express";
import pedidosControladores from "../controladores/pedidos.controladores.js";

const ruta = Router();


/* ruta.get("", pedidosControladores.obtenerPedido); */
/* ruta.get("/api", ); */
/* ruta.get("/:id", pedidosControladores.obtenerPedido); */
ruta.post("", pedidosControladores.crearPedido);
/* ruta.put("/:id", pedidosControladores.actualizarPedido);
ruta.delete("/:id", pedidosControladores.eliminarPedido);
 */

export default ruta;