const crypto = require("crypto");
const { promisify } = require("util");

const scrypt = promisify(crypto.scrypt);
const TAMANHO_HASH = 64;

async function criarHash(senha) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = await scrypt(senha, salt, TAMANHO_HASH);
    return `${salt}:${hash.toString("hex")}`;
}

async function verificarHash(senha, hashSalvo) {
    if (typeof hashSalvo !== "string") {
        return false;
    }

    const [salt, hashHex] = hashSalvo.split(":");
    if (!salt || !hashHex || !/^[0-9a-f]+$/i.test(hashHex)) {
        return false;
    }

    const hashEsperado = Buffer.from(hashHex, "hex");
    if (hashEsperado.length !== TAMANHO_HASH) {
        return false;
    }

    const hashRecebido = await scrypt(senha, salt, TAMANHO_HASH);
    return crypto.timingSafeEqual(hashEsperado, hashRecebido);
}

module.exports = { criarHash, verificarHash };
