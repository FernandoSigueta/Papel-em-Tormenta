const database = require("../database/config");

function buscarPorEmail(email) {
    const instrucaoSql = `
        SELECT id, nome, email, senha_hash
        FROM usuarios
        WHERE email = ?;
    `;
    return database.executar(instrucaoSql, [email]);
}

function cadastrar(nome, email, senhaHash) {
    const instrucaoSql = `
        INSERT INTO usuarios (nome, email, senha_hash)
        VALUES (?, ?, ?);
    `;
    return database.executar(instrucaoSql, [nome, email, senhaHash]);
}

function buscarDadosPublicosPorId(id) {
    const instrucaoSql = `
        SELECT id, nome, email
        FROM usuarios
        WHERE id = ?;
    `;
    return database.executar(instrucaoSql, [id]);
}

module.exports = { buscarPorEmail, cadastrar, buscarDadosPublicosPorId };
