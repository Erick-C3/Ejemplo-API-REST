import pool from "../conexionDB.js";

/**
 * Devuelve todos los productos de la base de dato si existen
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

async function obtenerProducto (req, res){
    const ID = req.params.id;
    const [resultado] = await pool.query("SELECT * FROM producto WHERE id = ?", ID);
    if (!resultado.length) {
        res.status(404).json({
            info: "No se encontro el producto con id: "+ID
        });
    }else{
        res.json(resultado);
    }
};




async function crearProducto (req, res){
    res.status(201).json(req.body);
};


async function actualizarProducto (req, res){
    res.json({atributo: "<h1> PUT </h1>"});
};

async function eliminarProducto (req, res){
    res.json({atributo: "<h1> DELETE </h1>"});
};


export default {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}