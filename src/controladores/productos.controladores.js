import pool from "../conexionDB.js";

/**
 * Devuelve todos los productos si existen
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function obtenerProductos (req, res){
    try {
        const [resultado] = await pool.query("SELECT * FROM producto");
        if(!resultado.length){
            res.status(404).json(
                {
                    mensaje: "No se encontraron productos"
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

/* async function obtenerProducto (req, res){
    console.log(req.query);
    res.send(`<h1> Hola 2! ${req.query.param3}</h1>`);
}; */


/**
 * Devuelve el producto solicitado si existe
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function obtenerProducto (req, res){
    const ID = req.params.id;
    try {
        const [resultado] = await pool.query("SELECT * FROM producto WHERE id = ?", ID);
        if (!resultado.length) {
            res.status(404).json({
                info: "No se encontro el producto con id: "+ID
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
 * Crea un producto
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function crearProducto (req, res){
    const {nombre, precio, imagen} = req.body;
    try {
        const [info] = await pool.query(`INSERT INTO producto(nombre, precio, imagen) VALUES(?, ?, ?);`, [nombre, precio, imagen]);
        const [resultado] = await pool.query("SELECT * FROM producto WHERE id = ?;", [info.insertId]);
        if (info.affectedRows !== 1 || !resultado.length) {
            res.status(404).json({
                mensaje: "Error al agregar producto"
            });
        }else{
            res.status(201).json({
                idNuevo: info.insertId,
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


/**
 * Actualiza el producto solicitado
 * @param {Object} req de la consulta que tiene la info a actualizar y el id
 * @param {Object} res de la consulta informa la situacion de la respuesta
 */
async function actualizarProducto (req, res){
    const ID = req.params.id;
    try {
        const {nombre, precio, imagen} = req.body;
        const [info] = await pool.query(`UPDATE producto SET nombre = ?, precio = ?, imagen = ? WHERE id = ?;`, [nombre, precio, imagen, ID]);
        if (info.affectedRows !== 1 || info.warningStatus) {
            res.status(404).json({
                info: "Error al actualizar el producto con id: "+ID
            });
        }else{
            res.json({
                info: "Producto actualizado"
            });
        }
    } catch (error) {
        res.status(500).json({
            informe: "Algo salio mal al actualizar el producto con id:"+ID,
            error: error
        })
    }


};


/**
 * Elimina el producto solicitado
 * @param {Object} req de la consulta
 * @param {Object} res de la consulta
 */
async function eliminarProducto (req, res){
    const ID = req.params.id;
    try {
        const [resultado] = await pool.query("DELETE FROM producto WHERE id = ?;", [ID]);
        if (resultado.affectedRows !== 1) {
            res.status(404).json({
                info: "No se encontro el producto con id: "+ID
            });
        }else{
            res.json({
                info: "Producto con id "+ID+" eliminado"
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
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}