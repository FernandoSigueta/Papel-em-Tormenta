const test = require("node:test");
const assert = require("node:assert/strict");
const { criarHash, verificarHash } = require("./senha");

test("hash de senha pode ser validado sem armazenar a senha original", async () => {
    const senha = "senha-de-teste-segura";
    const hash = await criarHash(senha);

    assert.notEqual(hash, senha);
    assert.equal(await verificarHash(senha, hash), true);
    assert.equal(await verificarHash("outra-senha", hash), false);
});

test("hash malformado não valida a senha", async () => {
    assert.equal(await verificarHash("senha-de-teste-segura", "hash-invalido"), false);
});
