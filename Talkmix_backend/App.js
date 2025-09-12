//implementação das bibliotecas
const express = require("express");
const mysql = require("mysql2/promise");
const session = require("express-session");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const PORT = 3306;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

//configurar a conexão com o banco de dados Mysql
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

// middleware
function autenticarToken(req, res, next) {
    const autHeader = req.heders["authorization"];
    const token = autHeader && autHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "token nãofornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ error: "Token invalido" });
        }

        req.user = user;
        next();
    });
}

//Rota para o registro
app.post("/auth/register", async (req, res) => {
    try {
        const { nome, sobrenome, email, senha } = req.body;

        if (!nome || !sobrenome || !email || !senha) {
            return res.status(400).json({ error: "preencha todos os campos" });
        }

        const [rows] = await createPool.query("SELECT id FROM users WHERE email = ?", [
            email,
        ]);
        if (rows.length > 0) {
            return res.status(400).json({ error: "Email já cadastrado" })
        }

        const senha_hash = await bcrypt.hash(senha, 10);

        await pool.query("INSERT INTO users (nome, sobrenome, emial, senha) VALUE (?, ?, ?, ?)", [
            nome, sobrenome, email, senha_hash
        ]);

        res.status(201).json({ message: "Usuario criado co sucesso" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao registrar usuario" })
    }
});

async function conexaoBd() {
    try {
        const conn = await pool.getConnection();
        console.log("conexão com Mysql bem sucedida")
        conn.release();
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

conexaoBd();

// iniciar o banco de dados
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
