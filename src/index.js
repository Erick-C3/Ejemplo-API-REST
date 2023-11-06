import app from "./app.js";
import configuracion from "./configuracion.js";

app.listen( configuracion.PORT, ()=>{
    console.log("Servidor activo", configuracion.PORT);
})


