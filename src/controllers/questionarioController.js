const questionarioModel = require("../models/questionarioModel");

function exigirAutenticacao(req, res, next) {
    if (!Number.isInteger(req.session.usuarioId)) {
        return res.status(401).json({ mensagem: "Entre na sua conta para acessar o questionário." });
    }
    next();
}

async function salvarRespostas(req, res) {
    const respostas = req.body && req.body.respostas;
    const validas = Array.isArray(respostas)
        && respostas.length > 0
        && respostas.every((resposta) =>
            resposta
            && Number.isInteger(resposta.pergunta_id)
            && resposta.pergunta_id > 0
            && Number.isInteger(resposta.valor)
            && resposta.valor >= 1
            && resposta.valor <= 5
        )
        && new Set(respostas.map((resposta) => resposta.pergunta_id)).size === respostas.length;

    if (!validas) {
        return res.status(400).json({
            mensagem: "Envie respostas únicas, com identificador de pergunta e nota de 1 a 5."
        });
    }

    const resultado = await questionarioModel.salvarRespostas(req.session.usuarioId, respostas);
    res.status(200).json({
        mensagem: "Respostas salvas.",
        total: resultado.total
    });
}

async function buscarRespostas(req, res) {
    const respostas = await questionarioModel.buscarRespostas(req.session.usuarioId);
    res.status(200).json({ respostas });
}

module.exports = { exigirAutenticacao, salvarRespostas, buscarRespostas };
