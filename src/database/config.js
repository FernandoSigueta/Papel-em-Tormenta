const mysql = require("mysql2/promise");

const config = {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "ficha_tormenta",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(config);

function validarAmbiente() {
    if (!["producao", "desenvolvimento"].includes(process.env.AMBIENTE_PROCESSO)) {
        throw new Error("Defina AMBIENTE_PROCESSO como producao ou desenvolvimento.");
    }
}

async function executar(instrucao, parametros = []) {
    validarAmbiente();
    const [resultados] = await pool.execute(instrucao, parametros);
    return resultados;
}

async function executarTransacao(operacoes) {
    validarAmbiente();
    const conexao = await pool.getConnection();
    try {
        await conexao.beginTransaction();
        const executarNaTransacao = async (instrucao, parametros = []) => {
            const [resultado] = await conexao.execute(instrucao, parametros);
            return resultado;
        };
        const resultado = await operacoes(executarNaTransacao);
        await conexao.commit();
        return resultado;
    } catch (erro) {
        try {
            await conexao.rollback();
        } catch (erroRollback) {
            console.error("Falha ao desfazer a transacao do banco de dados.", erroRollback);
        }
        throw erro;
    } finally {
        conexao.release();
    }
}

module.exports = { executar, executarTransacao, config };