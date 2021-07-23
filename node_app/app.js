const express = require('express');
require('dotenv').config;
const app = express();
const port = process.env.PORT;

global.config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
};

const mysql = require('mysql');
global.connection;
global.listaNomes = [];

function create() {

    connection = mysql.createConnection(config);
    console.log("conected db");
    const drop = "DROP TABLE IF EXISTS  pessoa ";
    connection.query(drop);
    const pre_sql = "CREATE TABLE IF NOT EXISTS pessoa\
        (id int not null auto_increment,\
        nome varchar(255) not null unique,\
        PRIMARY KEY (id)\
        ) ";

    connection.query(pre_sql, (err, results) => {
        console.log("create db");
        const sqlInsert = `INSERT INTO pessoa (nome) VALUES('RAFAEL'),("Joao"),("Wesley")`;
        connection.query(sqlInsert, function(err, results) {
            if (results) {
                const query = "select nome from pessoa";
                connection.query(query, (results.insertId), function(err, results) {
                    listaNomes = results;
                    connection.end();
                });

            }
        });

    });




}
create();

app.get('/', (req, res) => {
    const html = "<h1>Full Cycle Rocks!</h1>";
    let pessoas = "";

    if (listaNomes) {
        listaNomes.forEach((element) => {
            pessoas = pessoas + `<tr><td>${element.nome}</td></tr>`;
        });
    }
    res.send(html + `<table>${pessoas}</table>`);
})

app.listen(port);
console.log("Rodando na porta " + port);