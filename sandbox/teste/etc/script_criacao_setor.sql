CREATE TABLE setor (
idsetor BIGINT( 20 ) NOT NULL AUTO_INCREMENT PRIMARY KEY,
descricao VARCHAR( 100 ) NOT NULL,
sigla VARCHAR( 5 ) NOT NULL,
ativo TINYINT( 4 ) NOT NULL
);
ALTER TABLE setor ADD INDEX (descricao);
ALTER TABLE setor ADD INDEX (sigla);

INSERT INTO setor (idsetor, descricao, sigla, ativo) VALUES
(1, 'Administrativo', 'ADM', 1),
(2, 'Financeiro', 'FIN', 0),
(3, 'Laboratorio', 'LAB', 1),
(4, 'TESTE DE INSERÇÃO', 'TESTE', 1),
(5, 'COMERCIAL', 'COM', 1),
(6, 'FonoAudiologia', 'FON', 1),
(7, 'Suporte', 'SUP', 1),
(8, 'INFORMATICA', 'INF', 1),
(9, 'TESTE1', 'T', 0);