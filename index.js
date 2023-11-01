import express from "express";
import cors from "cors";
import pool from "./conexionDB.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("", async (req, res)=>{
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
});

app.get("/api", (req, res)=>{
    console.log(req.query);
    res.send(`<h1> Hola 2! ${req.query.param3}</h1>`);
});

app.get("/api/:id", async (req, res)=>{
    console.log(req.params);
    const [resultado] = await pool.query("SELECT * FROM producto WHERE id = ?", req.params.id);

    res.json(resultado);
});

app.post("/api", (req, res)=>{
    console.log(req.body);
    res.status(201).send(`<h1> POST! ${req.body[0]} </h1>`);
});


app.put("/api", (req, res)=>{
    res.json({atributo: "<h1> PUT </h1>"});
});

app.delete("/api", (req, res)=>{
    res.json({atributo: "<h1> DELETE </h1>"});
});


app.listen( process.env.PORT || 4000, ()=>{
    console.log("Servidor activo", process.env.PORT || 4000);
})

app.use((req, res)=>{
    res.send("<h1> ERROR: ruta no encontrada</h1>");
})
