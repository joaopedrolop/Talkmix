//implementação das bibliotecas
const express = require("express");
const mysql = require("mysql2/promise");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const PORT = 8000;
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
});

// middleware
function autenticarToken(req, res, next) {
  const autHeader = req.header("Authorization");
  const token = autHeader && autHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, usuario) => {
    if (error) {
      return res.status(403).json({ error: "Token invalido" });
    }

    req.usuario = usuario;
    next();
  });
}

//Rota para o registro
app.post("/auth/register", async (req, res) => {
  try {
    const { Nome, Sobrenome, Email, Senha } = req.body;

    console.log(Nome, Sobrenome);

    if (!Nome || !Sobrenome || !Email || !Senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const [rows] = await pool.query("SELECT ID FROM usuario WHERE Email = ?", [
      Email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const senha_hash = await bcrypt.hash(Senha, 10);

    await pool.query(
      "INSERT INTO usuario (Nome, Sobrenome, Email, Senha) VALUE (?, ?, ?, ?)",
      [Nome, Sobrenome, Email, senha_hash]
    );

    res.status(201).json({ message: "Usuario criado co sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao registrar usuario" });
  }
});

// Rota para o login
app.post("/auth/login", async (req, res) => {
  try {
    const { Email, Senha } = req.body;

    const [rows] = await pool.query("SELECT * FROM  usuario WHERE Email = ?", [
      Email,
    ]);
    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuario não cadastrado" });
    }

    const usuario = rows[0];

    const senhaValida = await bcrypt.compare(Senha, usuario.Senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { ID: usuario.ID, Email: usuario.Email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login bem sucedido", token });
  } catch {
    console.log(error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

// rota perfil
app.get("/auth/profile", autenticarToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT Nome, Email FROM usuario WHERE ID = ?",
      [req.usuario.ID]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario não encontrado." });
    }

    res.json({ usuario: rows[0] });
  } catch {
    console.log(error);
    res.status(500).json({ error: " Erro ao buscar dados do Usuário" });
  }
});

async function conexaoBd() {
  try {
    const conn = await pool.getConnection();
    console.log("conexão com Mysql bem sucedida");
    conn.release();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

app.get("/auth/library", autenticarToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT Titulo FROM livros");

    if (rows.length === 0) {
      return res.status(404).json({ error: "Livro não encontardo" });
    }

    res.json({ livro: rows });
  } catch {
    // console.log(error);
    res.status(500).json({ error: " Erro ao buscar dados do Livro" });
  }
});

//Rota para vizualizar os livros
app.get("/auth/book", autenticarToken, async (req, res) => {
  console.log("GET /auth/book");
  try {
    const [rows] = await pool.query("SELECT * FROM livros WHERE ID = ?", [
      req.body.ID,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "livro não encontrado." });
    }

    res.json({ livros: rows });
  } catch {
    // console.log(error);
    res.status(500).json({ error: " Erro ao buscar dados do livro" });
  }
});

conexaoBd();

// iniciar o banco de dados
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
