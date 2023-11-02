DROP DATABASE IF EXISTS servicio_db;
CREATE DATABASE servicio_db;

USE servicio_db;

CREATE TABLE IF NOT EXISTS usuario(
    id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL DEFAULT "def usuario",
    email VARCHAR(30) NOT NULL DEFAULT "def email",
    dni INT(8) NOT NULL DEFAULT 0,
    saldo FLOAT NOT NULL DEFAULT 0,
    es_admin TINYINT NOT NULL DEFAULT false
);


INSERT INTO usuario(nombre, email, dni, saldo, es_admin)
    VALUES("Erick", "algo@noemail.com", 12345678, 3000, TRUE);

INSERT INTO usuario(nombre, email, dni, saldo, es_admin)
    VALUES("Otro usuario", "algo@noemail.com", 12345678, 1000, FALSE);

SELECT * FROM usuario;
