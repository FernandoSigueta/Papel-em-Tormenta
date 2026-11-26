/* Script para o Projeto Individual*/

CREATE DATABASE ficha_tormenta;
USE ficha_tormenta;

-- 1. Tabela do Usuário
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de eixos (os 8 do radar + 2 ocultos)
CREATE TABLE eixos (
  id TINYINT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  nome VARCHAR(40) NOT NULL,
  no_radar BOOLEAN NOT NULL -- TRUE para os 8 principais, FALSE para os 2 ocultos
);

-- 3. Banco de perguntas
CREATE TABLE perguntas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fk_eixo TINYINT NOT NULL,
  texto VARCHAR(500) NOT NULL,
  invertida BOOLEAN NOT NULL DEFAULT FALSE,
  ativa BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (fk_eixo) REFERENCES eixos(id)
);

-- 4. Armazena o resultado único de cada usuário
CREATE TABLE tentativas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fk_usuario INT NOT NULL UNIQUE,
  dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
);

-- 5. Respostas da tentativa
CREATE TABLE respostas (
  tentativa_id INT NOT NULL,
  pergunta_id INT NOT NULL,
  valor TINYINT NOT NULL,
  PRIMARY KEY (tentativa_id, pergunta_id),
  CONSTRAINT ck_valor CHECK (valor BETWEEN 1 AND 5),
  FOREIGN KEY (tentativa_id) REFERENCES tentativas(id),
  FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
);

CREATE TABLE eixo (
    idEixo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL
);

CREATE TABLE pergunta (
    idPergunta INT PRIMARY KEY AUTO_INCREMENT,
    texto VARCHAR(200) NOT NULL,
    fkEixo INT NOT NULL,
    FOREIGN KEY (fkEixo) REFERENCES eixo(idEixo)
);

-- ajuste fkUsuario conforme sua tabela de usuário
CREATE TABLE resposta (
    fkUsuario INT NOT NULL,
    fkPergunta INT NOT NULL,
    nota TINYINT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    PRIMARY KEY (fkUsuario, fkPergunta),
    FOREIGN KEY (fkPergunta) REFERENCES pergunta(idPergunta)
);

INSERT INTO eixo (nome) VALUES
('Mecânica'), ('Interpretação'), ('Combate'), ('Exploração'),
('Colaboração'), ('Estratégia'), ('Improviso'), ('Imersão');

INSERT INTO pergunta (texto, fkEixo) VALUES

('Gosto de estudar as regras para montar a build mais eficiente possível.', 1),
('Sinto prazer em combinar habilidades e itens para criar sinergias.', 1),
('Acompanho com atenção os números da ficha (bônus, dano, defesa).', 1),
('Gosto de dominar os detalhes das regras do sistema.', 1),

('Gosto de falar como o meu personagem durante a sessão.', 2),
('Tomo decisões pelo que meu personagem faria, mesmo que não seja o melhor.', 2),
('Crio personalidade, medos e defeitos para os meus personagens.', 2),
('Prefiro uma cena de interpretação marcante a uma vitória fácil.', 2),

('Os combates são a parte mais empolgante da sessão.', 3),
('Gosto de desafios difíceis em que cada turno importa.', 3),
('Prefiro resolver problemas lutando a conversando.', 3),
('Fico ansioso para descobrir qual criatura vamos enfrentar.', 3),

('Gosto de explorar cada canto de uma masmorra ou cidade.', 4),
('Fico curioso para abrir portas, baús e passagens secretas.', 4),
('Prefiro um mundo aberto a uma aventura linear.', 4),
('Gosto de investigar enigmas e mistérios.', 4),

('Gosto de montar um grupo com funções que se complementam.', 5),
('Abro mão de uma ação interessante para ajudar um aliado.', 5),
('Prefiro decidir os rumos da aventura em conjunto com o grupo.', 5),
('Me preocupo em dar espaço para todos os jogadores participarem.', 5),

('Prefiro seguir um plano detalhado a improvisar durante a sessão.', 6),
('Penso nas consequências das minhas ações várias rodadas à frente.', 6),
('Gosto de reunir informações antes de agir.', 6),
('Prefiro preparar recursos e rotas de fuga antes de um confronto.', 6),

('Gosto de inventar soluções criativas na hora.', 7),
('Me divirto quando a sessão foge do que foi planejado.', 7),
('Prefiro agir por instinto a ficar planejando.', 7),

('Gosto de ler sobre a história e a geografia do cenário.', 8),
('Me importo em manter a coerência com o mundo e as regras do cenário.', 8),
('Gosto de ambientação, descrições e trilha sonora na sessão.', 8);