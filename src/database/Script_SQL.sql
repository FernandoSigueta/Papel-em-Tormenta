CREATE DATABASE IF NOT EXISTS ficha_tormenta
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE ficha_tormenta;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS eixos (
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(40) NOT NULL,
    no_radar BOOLEAN NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS perguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_eixo TINYINT UNSIGNED NOT NULL,
    texto VARCHAR(500) NOT NULL,
    invertida BOOLEAN NOT NULL DEFAULT FALSE,
    ativa BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_pergunta_eixo
        FOREIGN KEY (fk_eixo) REFERENCES eixos(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tentativas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario INT NOT NULL UNIQUE,
    dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tentativa_usuario
        FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS respostas (
    tentativa_id INT NOT NULL,
    pergunta_id INT NOT NULL,
    valor TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (tentativa_id, pergunta_id),
    CONSTRAINT ck_resposta_valor CHECK (valor BETWEEN 1 AND 5),
    CONSTRAINT fk_resposta_tentativa
        FOREIGN KEY (tentativa_id) REFERENCES tentativas(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_resposta_pergunta
        FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
) ENGINE=InnoDB;

INSERT INTO eixos (id, codigo, nome, no_radar) VALUES
    (1, 'competitividade', 'Competitividade', FALSE),
    (2, 'mecanica', 'Mecânica', TRUE),
    (3, 'interpretacao', 'Interpretação', TRUE),
    (4, 'social', 'Social', TRUE),
    (5, 'colaboracao', 'Colaboração', TRUE),
    (6, 'combate', 'Combate', TRUE),
    (7, 'estrategia', 'Estratégia', TRUE),
    (8, 'improviso', 'Improviso', FALSE),
    (9, 'exploracao', 'Exploração', TRUE),
    (10, 'narrativa', 'Narrativa', TRUE)
ON DUPLICATE KEY UPDATE
    codigo = VALUES(codigo),
    nome = VALUES(nome),
    no_radar = VALUES(no_radar);

INSERT INTO perguntas (id, fk_eixo, texto, invertida, ativa) VALUES
    (1, 1, 'Gosto de desafios em que o resultado mostra quem foi melhor.', FALSE, TRUE),
    (2, 2, 'Fico satisfeito quando encontro uma combinação de poderes que funciona muito bem.', FALSE, TRUE),
    (3, 3, 'Aceito deixar meu personagem passar por dificuldades se isso deixar a história mais interessante.', FALSE, TRUE),
    (4, 4, 'Prefiro ficar em silêncio e deixar os outros conversarem com os personagens do mundo.', TRUE, TRUE),
    (5, 5, 'Costumo abrir mão de uma vantagem minha se isso ajudar o grupo a avançar.', FALSE, TRUE),
    (6, 6, 'Gosto de escolher poderes e equipamentos pensando em como serão usados em batalha.', FALSE, TRUE),
    (7, 1, 'Me esforço para ter o melhor desempenho do grupo durante a sessão.', FALSE, TRUE),
    (8, 6, 'Acho que os combates interrompem a parte mais interessante da sessão.', TRUE, TRUE),
    (9, 7, 'Gosto de combinar um plano com o grupo antes de entrar em uma missão.', FALSE, TRUE),
    (10, 8, 'Gosto de inventar soluções criativas para problemas que não estavam previstos.', FALSE, TRUE),
    (11, 9, 'Gosto de investigar ruínas, masmorras e lugares escondidos, mesmo sem uma missão ligada a eles.', FALSE, TRUE),
    (12, 4, 'Gosto de fazer amizade com os personagens do mundo, como mercadores e moradores.', FALSE, TRUE),
    (13, 3, 'Me sinto desconfortável quando preciso falar como o meu personagem.', TRUE, TRUE),
    (14, 9, 'Prefiro seguir direto o caminho da missão a me desviar para explorar lugares.', TRUE, TRUE),
    (15, 9, 'Descobrir segredos e tesouros escondidos é uma das partes de que mais gosto em um jogo.', FALSE, TRUE),
    (16, 6, 'Enfrentar um inimigo poderoso é um dos momentos mais emocionantes do jogo.', FALSE, TRUE),
    (17, 7, 'Antes de agir, gosto de analisar todas as opções e escolher a mais eficiente.', FALSE, TRUE),
    (18, 8, 'Fico desconfortável quando preciso decidir algo sem ter um plano.', TRUE, TRUE),
    (19, 1, 'Não me importo com quem foi melhor em um desafio; o importante é a diversão do grupo.', TRUE, TRUE),
    (20, 10, 'Fico ansioso para saber o que vai acontecer na próxima parte da história.', FALSE, TRUE),
    (21, 3, 'Tomo decisões pensando no que meu personagem faria, e não no que seria mais vantajoso.', FALSE, TRUE),
    (22, 4, 'Gosto de negociar, convencer e conversar para resolver os problemas da aventura.', FALSE, TRUE),
    (23, 2, 'Regras e números me deixam entediado durante o jogo.', TRUE, TRUE),
    (24, 7, 'Planejar com antecedência tira a graça da aventura para mim.', TRUE, TRUE),
    (25, 5, 'Prefiro tomar as decisões sozinho a esperar a opinião de todo o grupo.', TRUE, TRUE),
    (26, 2, 'Ler o livro de regras e descobrir combinações de habilidades é parte da diversão para mim.', FALSE, TRUE),
    (27, 10, 'Os momentos marcantes da história de uma campanha ficam comigo por muito tempo.', FALSE, TRUE),
    (28, 8, 'Prefiro reagir ao que acontece na mesa a seguir um roteiro definido.', FALSE, TRUE),
    (29, 10, 'Os detalhes da história e do mundo me interessam pouco durante o jogo.', TRUE, TRUE),
    (30, 5, 'Gosto quando o grupo toma as decisões juntos, mesmo que demore.', FALSE, TRUE)
ON DUPLICATE KEY UPDATE
    fk_eixo = VALUES(fk_eixo),
    texto = VALUES(texto),
    invertida = VALUES(invertida),
    ativa = VALUES(ativa);

SELECT
    e.id AS eixo_id,
    e.codigo,
    e.nome,
    e.no_radar,
    ROUND(AVG(CASE WHEN p.invertida THEN 6 - r.valor ELSE r.valor END), 2) AS media_pontuacao
FROM tentativas t
INNER JOIN respostas r ON r.tentativa_id = t.id
INNER JOIN perguntas p ON p.id = r.pergunta_id
INNER JOIN eixos e ON e.id = p.fk_eixo
WHERE t.fk_usuario = 1
GROUP BY e.id, e.codigo, e.nome, e.no_radar
ORDER BY e.id;
