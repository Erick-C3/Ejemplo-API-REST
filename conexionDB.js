import { createPool } from "mysql2/promise";

const pool = createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "qwe123",
    database: "tienda_db"
});

console.log("CONEXION A BASE DE DATOS INICIADA");

export default pool;