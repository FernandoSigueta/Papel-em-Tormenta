const contaModel = require("../models/contaModel");
const { criarHash, verificarHash } = require("../utils/senha");

function validarCredenciais(email, senha) {
    return typeof email === "string"
        && email.length <= 150
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        && typeof senha === "string"
        && senha.length >= 8
        && senha.length <= 128;
}

function iniciarSessao(req, res, usuario, status, next) {
    req.session.regenerate((erro) => {
        if (erro) {
            return next(erro);
        }

        req.session.usuarioId = usuario.id;
        req.session.usuarioNome = usuario.nome;
        req.session.save((erroAoSalvar) => {
            if (erroAoSalvar) {
                return next(erroAoSalvar);
            }
            res.status(status).json({
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        });
    });
}

async function cadastrar(req, res, next) {
    const { nome, email, senha } = req.body || {};
    const nomeNormalizado = typeof nome === "string" ? nome.trim() : "";
    const emailNormalizado = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (nomeNormalizado.length < 3 || nomeNormalizado.length > 100 || !validarCredenciais(emailNormalizado, senha)) {
        return res.status(400).json({
            mensagem: "Informe nome, e-mail válido e senha com 8 a 128 caracteres."
        });
    }

    const senhaHash = await criarHash(senha);
    let resultado;
    try {
        resultado = await contaModel.cadastrar(nomeNormalizado, emailNormalizado, senhaHash);
    } catch (erro) {
        if (erro.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ mensagem: "Este e-mail já está cadastrado." });
        }
        return next(erro);
    }

    iniciarSessao(req, res, {
        id: resultado.insertId,
        nome: nomeNormalizado,
        email: emailNormalizado
    }, 201, next);
}

async function autenticar(req, res, next) {
    const { email, senha } = req.body || {};
    const emailNormalizado = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!validarCredenciais(emailNormalizado, senha)) {
        return res.status(400).json({ mensagem: "E-mail ou senha inválidos." });
    }

    const usuarios = await contaModel.buscarPorEmail(emailNormalizado);
    const usuario = usuarios[0];
    if (!usuario || !await verificarHash(senha, usuario.senha_hash)) {
        return res.status(401).json({ mensagem: "E-mail ou senha inválidos." });
    }

    iniciarSessao(req, res, usuario, 200, next);
}

async function sessaoAtual(req, res) {
    if (!req.session.usuarioId) {
        return res.status(401).json({ mensagem: "É necessário entrar na conta." });
    }

    const usuarios = await contaModel.buscarDadosPublicosPorId(req.session.usuarioId);
    if (usuarios.length === 0) {
        return res.status(401).json({ mensagem: "A conta desta sessão não existe mais." });
    }
    res.status(200).json({ usuario: usuarios[0] });
}

function sair(req, res, next) {
    req.session.destroy((erro) => {
        if (erro) {
            return next(erro);
        }
        res.clearCookie("tormenta.sid", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production" || process.env.AMBIENTE_PROCESSO === "producao"
        });
        res.status(204).end();
    });
}

module.exports = { cadastrar, autenticar, sessaoAtual, sair };
