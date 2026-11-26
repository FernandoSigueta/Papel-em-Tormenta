require("dotenv").config();

const express = require("express");
const session = require("express-session");
const mysql = require("mysql2");
const MySQLStore = require("express-mysql-session")(session);
const path = require("path");
const database = require("./database/config");
const usuariosRouter = require("./routes/contas");
const questionarioRouter = require("./routes/questionario");

const camposObrigatorios = ["DB_HOST", "DB_DATABASE", "DB_USER", "SESSION_SECRET"];
const camposAusentes = camposObrigatorios.filter((campo) => !process.env[campo]);
if (camposAusentes.length > 0) {
    throw new Error(`Configure as variáveis obrigatórias: ${camposAusentes.join(", ")}`);
}
if (process.env.SESSION_SECRET.length < 32) {
    throw new Error("SESSION_SECRET deve ter pelo menos 32 caracteres.");
}

const app = express();
const sessionPool = mysql.createPool(database.config);
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
    schema: {
        tableName: "sessoes_web"
    }
}, sessionPool);

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use(session({
    name: "tormenta.sid",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production" || process.env.AMBIENTE_PROCESSO === "producao",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use("/api/usuarios", usuariosRouter);
app.use("/api/questionario", questionarioRouter);
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
    res.redirect("/home/index.html");
});

app.use((erro, req, res, next) => {
    console.error("Erro não tratado na API:", erro);
    if (res.headersSent) {
        return next(erro);
    }
    res.status(500).json({ mensagem: "Ocorreu um erro interno. Tente novamente." });
});

const porta = Number(process.env.PORT) || 3000;
app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}.`);
});
