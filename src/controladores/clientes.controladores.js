import pool from "../conexionDB.js";

/**
 * Devuelve todos los clientes si existen
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function obtenerClientes (req, res){
    try {
        const [resultado] = await pool.query("SELECT * FROM cliente");
        if(!resultado.length){
            res.status(404).json(
                {
                    mensaje: "No se encontraron clientes"
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

/* async function obtenercliente (req, res){
    console.log(req.query);
    res.send(`<h1> Hola 2! ${req.query.param3}</h1>`);
}; */


/**
 * Devuelve el cliente solicitado si existe
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function obtenerCliente (req, res){
    const ID = req.params.id;
    try {
        const [resultado] = await pool.query("SELECT * FROM cliente WHERE id = ?", ID);
        if (!resultado.length) {
            res.status(404).json({
                info: "No se encontro el cliente con id: "+ID
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
 * Crea un cliente
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function crearCliente (req, res){
    const {nombre, email} = req.body;
    try {
        const [info] = await pool.query(`INSERT INTO cliente(nombre, email) VALUES(?, ?);`, [nombre, email]);
        const [resultado] = await pool.query("SELECT * FROM cliente WHERE id = ?;", [info.insertId]);
        if (info.affectedRows !== 1 || !resultado.length) {
            res.status(404).json({
                mensaje: "Error al agregar cliente"
            });
        }else{
            res.status(201).json({
                idNuevo: info.insertId,
                cliente: resultado
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
 * Actualiza el cliente solicitado
 * @param {Object} req de la consulta que tiene la info a actualizar y el id
 * @param {Object} res de la consulta informa la situacion de la respuesta
 */
async function actualizarCliente (req, res){
    const ID = req.params.id;
    try {
        const {nombre, email} = req.body;
        const [info] = await pool.query(`UPDATE cliente SET nombre = ?, email = ? WHERE id = ?;`, [nombre, email, ID]);
        if (info.affectedRows !== 1 || info.warningStatus) {
            res.status(404).json({
                info: "Error al actualizar el cliente con id: "+ID
            });
        }else{
            res.json({
                info: "cliente actualizado"
            });
        }
    } catch (error) {
        res.status(500).json({
            informe: "Algo salio mal al actualizar el cliente con id:"+ID,
            error: error
        })
    }


};


/**
 * Elimina el cliente solicitado
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function eliminarCliente (req, res){
    const ID = req.params.id;
    try {
        const [resultado] = await pool.query("DELETE FROM cliente WHERE id = ?;", [ID]);
        if (resultado.affectedRows !== 1) {
            res.status(404).json({
                info: "No se encontro el cliente con id: "+ID
            });
        }else{
            res.json({
                info: "cliente con id "+ID+" eliminado"
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
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}