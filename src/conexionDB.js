import { createPool } from "mysql2/promise";
import configuracion from "./configuracion.js";

const CREAR_TABLA = `
    CREATE TABLE IF NOT EXISTS producto (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(45) DEFAULT NULL,
        precio INT(10) DEFAULT NULL,
        imagen VARCHAR(400) DEFAULT NULL,
        PRIMARY KEY(id)
    );
`;

const pool = createPool({
    host: configuracion.HOST,
    port: configuracion.DB_PORT,
    user: configuracion.USER,
    password: configuracion.PASSWORD,
    database: configuracion.NAME
});

await pool.query(CREAR_TABLA);

console.log("CONEXION A BASE DE DATOS INICIADA");

export default pool;