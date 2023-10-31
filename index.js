import express from "express";

const app = express();

app.get("", (req, res)=>{
    res.json({atributo: "<h1> Hola! </h1>"});
});

app.get("/api", (req, res)=>{
    res.send("<h1> Hola 2! </h1>");
});

app.get("/api/:id", (req, res)=>{
    console.log(req.params);
    res.send(`<h1> Hola 3! ${req.params.id}</h1>`);
});



app.listen(4000, ()=>{
    console.log("Servidor activo");
})

app.use((req, res)=>{
    res.send("<h1> ERROR: ruta no encontrada</h1>");
})
