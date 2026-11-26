/* Script para o Projeto Individual*/

CREATE DATABASE ficha_tormenta;
USE ficha_tormenta;

-- 1. Tabela do Usuário
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
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

-- Comando para refazer o teste:
-- Se o usuario clicar em refazer teste os seguintes comandos devem ser ativados juntamente com os selects novos

DELETE FROM respostas 
	WHERE tentativa_id = (SELECT id FROM tentativas WHERE fk_usuario = 1);

DELETE FROM tentativas
	WHERE fk_usuario = 1;
    
-- A partir deste ponto é só realizar o novo insert, esses deletes serão ativados sempre que o botão gravar no site for apertado!


/* SELECT dos eixos:*/

SELECT 
    e.id AS eixo_id,
    e.codigo,
    e.nome,
    e.no_radar,
    ROUND(AVG(
        CASE 
            WHEN p.invertida = TRUE THEN (6 - r.valor) 
            ELSE r.valor 
        END
    ), 2) AS media_pontuacao
	FROM tentativas t
		JOIN respostas r ON r.tentativa_id = t.id
		JOIN perguntas p ON p.id = r.pergunta_id
		JOIN eixos e ON e.fk_eixo = p.eixo_id
			WHERE t.fk_usuario = 1
				GROUP BY e.id, e.codigo, e.nome, e.no_radar
					ORDER BY e.id;
