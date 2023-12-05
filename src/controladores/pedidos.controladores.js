import pool from "../conexionDB.js";

/**
 * Crea un producto
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function crearPedido (req, res){
    const {nombre, precio, cantidad, cliente_id} = req.body;
    try {
        const [producto] = await pool.query(`SELECT id FROM producto WHERE nombre = ?`,[nombre]);
        const [infoProducto] = await pool.query(`UPDATE producto SET cantidad = (cantidad-?) WHERE id = ?;`, [cantidad, producto[0].id]);
        const [infoCompra] = await pool.query(`INSERT INTO compra(nombre, precio, cantidad, cliente_id) VALUES(?, ?, ?, ?);`, [nombre, precio, cantidad, cliente_id]);
        
        const [resultado] = await pool.query("SELECT * FROM compra WHERE id = ?;", [infoCompra.insertId]);
        
        if (infoProducto.affectedRows !== 1 || infoCompra.affectedRows !== 1 || !resultado.length) {
            res.status(404).json({
                mensaje: "Error al crear pedido",
                error: {
                    infoCompra,
                    infoProducto,
                    resultado,
                    producto
                }
            });
        }else{
            res.status(201).json({
                idNuevo: infoCompra.insertId,
                producto: resultado
            });
        }
    } catch (error) {
        res.status(500).json({
            informe: "Algo salio mal al agregar",
            error: error
        })
    }
};

export default{
    crearPedido
}