DROP DATABASE IF EXISTS tienda_db;
CREATE DATABASE IF NOT EXISTS tienda_db;

USE tienda_db;

CREATE TABLE IF NOT EXISTS producto (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    precio INT(10) DEFAULT NULL,
    imagen VARCHAR(400) DEFAULT NULL,
    PRIMARY KEY(id)
);

DESCRIBE producto;

INSERT INTO producto(nombre, precio, imagen) VALUES(
    "pringles", 1610, "https://carrefourar.vtexassets.com/arquivos/ids/308360-800-auto?v=638144015796400000&width=800&height=auto&aspect=true"
);

SELECT * FROM producto;