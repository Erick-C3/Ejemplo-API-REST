import { createPool } from "mysql2/promise";
import configuracion from "./configuracion.js";

const pool = createPool({
    host: configuracion.HOST,
    user: configuracion.USER,
    password: configuracion.PASSWORD,
    port: configuracion.PORT,
    database: configuracion.NAME
});

console.log("BASE DE DATOS CONECTADA");

export default pool;