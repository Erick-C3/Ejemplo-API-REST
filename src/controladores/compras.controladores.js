import pool from "../conexionDB.js";


/**
 * Devuelve todos los Compras si existen
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function obtenerCompras (req, res){
    try {
        const [resultado] = await pool.query("SELECT * FROM compra");
        if(!resultado.length){
            res.status(404).json(
                {
                    mensaje: "No se encontraron Compras"
                }
            )
        }else{
            res.json(resultado);
        }
    } catch (error) {
        res.status(500).json({
            informe: "Algo salio mal",
            error: error
        })
    }
};

/* async function obtenercompra (req, res){
    console.log(req.query);
    res.send(`<h1> Hola 2! ${req.query.param3}</h1>`);
}; */


/**
 * Devuelve el compra solicitado si existe
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function obtenerCompra (req, res){
    const ID = req.params.id;
    try {
        const [resultado] = await pool.query("SELECT * FROM compra WHERE id = ?", ID);
        if (!resultado.length) {
            res.status(404).json({
                info: "No se encontro el compra con id: "+ID
            });
        }else{
            res.json(resultado);
        }
    } catch (error) {
        res.status(500).json({
            informe: "Algo salio mal",
            error: error
        })
    }
};



/**
 * Crea un compra
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function crearCompra (req, res){
    const {nombre, precio, cantidad, cliente_id} = req.body;
    try {
        const [info] = await pool.query(`INSERT INTO compra(nombre, precio, cantidad, cliente_id) VALUES(?, ?, ?, ?);`, [nombre, precio, cantidad, cliente_id]);
        const [resultado] = await pool.query("SELECT * FROM compra WHERE id = ?;", [info.insertId]);
        if (info.affectedRows !== 1 || !resultado.length) {
            res.status(404).json({
                mensaje: "Error al agregar compra"
            });
        }else{
            res.status(201).json({
                idNuevo: info.insertId,
                compra: resultado
            });
        }
    } catch (error) {
        res.status(500).json({
            informe: "Algo salio mal al agregar",
            error: error
        })
    }
};


/**
 * Actualiza el compra solicitado
 * @param {Object} req de la consulta que tiene la info a actualizar y el id
 * @param {Object} res de la consulta informa la situacion de la respuesta
 */
async function actualizarCompra (req, res){
    const ID = req.params.id;
    try {
        const {nombre, precio, cantidad, cliente_id} = req.body;
        const [info] = await pool.query(`UPDATE compra SET nombre = ?, precio = ?, cantidad = ?, cliente_id = ? WHERE id = ?;`, [nombre, precio, cantidad, cliente_id, ID]);
        if (info.affectedRows !== 1 || info.warningStatus) {
            res.status(404).json({
                info: "Error al actualizar el compra con id: "+ID
            });
        }else{
            res.json({
                info: "compra actualizado"
            });
        }
    } catch (error) {
        res.status(500).json({
            informe: "Algo salio mal al actualizar el compra con id:"+ID,
            error: error
        })
    }


};


/**
 * Elimina el compra solicitado
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function eliminarCompra (req, res){
    const ID = req.params.id;
    try {
        const [resultado] = await pool.query("DELETE FROM compra WHERE id = ?;", [ID]);
        if (resultado.affectedRows !== 1) {
            res.status(404).json({
                info: "No se encontro el compra con id: "+ID
            });
        }else{
            res.json({
                info: "compra con id "+ID+" eliminado"
            });
        }
    } catch (error) {
        res.status(500).json({
            informe: "Algo salio mal",
            error: error
        })
    }
};


export default {
    obtenerCompras,
    obtenerCompra,
    crearCompra,
    actualizarCompra,
    eliminarCompra
}