const database = require("../database/config");

async function salvarRespostas(usuarioId, respostas) {
    return database.executarTransacao(async (executar) => {
        const perguntas = await executar(`
            SELECT id
            FROM perguntas
            WHERE ativa = TRUE
            ORDER BY id;
        `);
        const idsEsperados = perguntas.map((pergunta) => pergunta.id);
        const idsRecebidos = respostas.map((resposta) => resposta.pergunta_id).sort((a, b) => a - b);

        if (idsEsperados.length === 0
            || idsRecebidos.length !== idsEsperados.length
            || idsRecebidos.some((id, index) => id !== idsEsperados[index])) {
            const erro = new Error("O conjunto de perguntas ativas não corresponde às respostas enviadas.");
            erro.status = 409;
            throw erro;
        }

        const tentativa = await executar(`
            INSERT INTO tentativas (fk_usuario)
            VALUES (?)
            ON DUPLICATE KEY UPDATE
                id = LAST_INSERT_ID(id),
                dt_criacao = CURRENT_TIMESTAMP;
        `, [usuarioId]);
        const tentativaId = tentativa.insertId;

        await executar("DELETE FROM respostas WHERE tentativa_id = ?;", [tentativaId]);

        const valores = [];
        const placeholders = respostas.map((resposta) => {
            valores.push(tentativaId, resposta.pergunta_id, resposta.valor);
            return "(?, ?, ?)";
        });
        await executar(`
            INSERT INTO respostas (tentativa_id, pergunta_id, valor)
            VALUES ${placeholders.join(", ")};
        `, valores);

        return { tentativaId, total: respostas.length };
    });
}

function buscarRespostas(usuarioId) {
    const instrucaoSql = `
        SELECT
            p.id AS pergunta_id,
            e.nome AS eixo,
            p.invertida AS invertida,
            r.valor AS valor
        FROM tentativas t
        INNER JOIN respostas r ON r.tentativa_id = t.id
        INNER JOIN perguntas p ON p.id = r.pergunta_id
        INNER JOIN eixos e ON e.id = p.fk_eixo
        WHERE t.fk_usuario = ?
        ORDER BY p.id;
    `;
    return database.executar(instrucaoSql, [usuarioId]);
}

module.exports = { salvarRespostas, buscarRespostas };
