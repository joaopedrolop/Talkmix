//implementação das bibliotecas 
const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const bodyParser = require('body-parser');

configurar a conexão com o banco de dados Mysql
const db = mysql.createConnections({
    host: 'localhost',
    user: 'phpmyadmin',
    password: '123456789' ,
    database: 'mydb'
});

