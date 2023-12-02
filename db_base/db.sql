DROP DATABASE IF EXISTS tienda_db;
CREATE DATABASE IF NOT EXISTS tienda_db;

USE tienda_db;

/* gondola */
CREATE TABLE IF NOT EXISTS producto (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    precio INT(10) DEFAULT NULL,
    imagen VARCHAR(400) DEFAULT NULL,
    cantidad INT DEFAULT 0,
    PRIMARY KEY(id)
);

INSERT INTO producto(nombre, precio, imagen, cantidad) VALUES(
    "pringles honey mustard",
    1610,
    "https://w7.pngwing.com/pngs/29/425/png-transparent-baked-potato-pringles-potato-crisps-potato-chip-flavor-cheese-food-cheese-grocery-store-thumbnail.png",
    50
);

INSERT INTO producto(nombre, precio, imagen, cantidad) VALUES(
    "pringles paprika",
    2610,
    "https://img1.freepng.es/20180627/alp/kisspng-hot-dog-pringles-paprika-potato-chip-french-fries-pringles-5b33166fb5bcc9.8572339015300747357444.jpg",
    30
);

INSERT INTO producto(nombre, precio, imagen, cantidad) VALUES(
    "pringles crema y cebolla",
    3610,
    "https://www.entuhogar.coca-cola.com.co/media/catalog/product/p/r/pringles-cremacebolla-124gr.png.png?optimize=low&fit=bounds&height=550&width=550&canvas=550:550&format=jpeg",
    120
);

CREATE TABLE IF NOT EXISTS cliente(
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS compra(
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NOT NULL,
    precio INT(10) NOT NULL,
    cantidad INT NOT NULL,
    cliente_id INT(11) NOT NULL DEFAULT = "eliminado",
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(cliente_id) REFERENCES cliente(id) ON DELETE SET DEFAULT
);



INSERT INTO cliente(nombre, email) VALUES(
    "Erick",
    "test@test.com"
);


SELECT * FROM producto;
SELECT * FROM cliente;
SELECT * FROM compra;




UPDATE producto SET nombre = "", precio = "", imagen = "" WHERE id = 3;

DELETE FROM producto WHERE id = 5;

SELECT * FROM producto;