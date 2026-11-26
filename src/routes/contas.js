const express = require("express");
const contaController = require("../controllers/contaController");

const router = express.Router();

router.post("/cadastrar", (req, res, next) => {
    contaController.cadastrar(req, res, next).catch(next);
});

router.post("/autenticar", (req, res, next) => {
    contaController.autenticar(req, res, next).catch(next);
});

router.get("/sessao", (req, res, next) => {
    contaController.sessaoAtual(req, res).catch(next);
});

router.post("/sair", contaController.sair);

module.exports = router;
