const express = require("express");
const questionarioController = require("../controllers/questionarioController");

const router = express.Router();

router.use(questionarioController.exigirAutenticacao);

router.put("/respostas", (req, res, next) => {
    questionarioController.salvarRespostas(req, res).catch(next);
});

router.get("/respostas", (req, res, next) => {
    questionarioController.buscarRespostas(req, res).catch(next);
});

module.exports = router;
