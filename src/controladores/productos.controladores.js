import pool from "../conexionDB.js";

async function obtenerProductos (req, res){
    try {
        const [resultado] = await pool.query("SELECT * FROM producto");
        console.log(resultado);
        res.json(resultado);
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
    console.log(req.params);
    const [resultado] = await pool.query("SELECT * FROM producto WHERE id = ?", req.params.id);
    res.json(resultado);
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