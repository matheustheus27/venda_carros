-- Criação de Tabelas

create table if not exists cliente (
    cpf varchar(11) primary key,
    nome varchar(100) not null,
    telefone varchar(20),
    email varchar(30) not null,
    endereco varchar(100) not null
);

create table if not exists concessionaria (
    cnpj varchar(14) primary key,
    nome varchar(100) not null,
    telefone varchar(20),
    endereco varchar(100) not null
);

create table if not exists vendedor (
    cpf varchar(11) primary key,
    nome varchar(100) not null,
    telefone varchar(20),
    email varchar(30) not null,
    cnpj_concessionaria varchar(14) not null,
    total_vendas INT DEFAULT 0,
    foreign key (cnpj_concessionaria) references concessionaria(cnpj) 
);

create table if not exists carro (
    placa varchar(7) primary key,
    marca varchar(20) not null,
    modelo varchar(20) not null,
    ano int not null,
    cor varchar(20) not null,
    quilometragem decimal(20, 2) not null,
    preco decimal(15, 2) not null,
    status varchar(20) not null,
    cnpj_concessionaria varchar(14) not null,
    foreign key (cnpj_concessionaria) references concessionaria(cnpj)
);

create table if not exists venda (
    cpf_cliente varchar(11),
    cpf_vendedor varchar(11),
    placa_carro varchar(7),
    cnpj_concessionaria varchar(14) not null,
    data date,
    valor decimal(20, 2) not null,
    tipo_pagamento varchar(20) not null,
    total_pago decimal(20, 2) not null,
    primary key (cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data),
    foreign key (cpf_cliente) references cliente(cpf) on delete cascade,
    foreign key (cpf_vendedor) references vendedor(cpf) on delete cascade,
    foreign key (placa_carro) references carro(placa) on delete cascade,
    foreign key (cnpj_concessionaria) references concessionaria(cnpj) on delete cascade
);

create table if not exists log_precos_carro (
    id INT auto_increment primary key,
    placa_carro varchar(7),
    preco_antigo decimal(15,2),
    preco_novo decimal(15,2),
    usuario_alteracao varchar(100),
    data_alteracao timestamp default CURRENT_TIMESTAMP
);

DELIMITER //

-- Trigger 1: TR_ATUALIZAR_STATUS_CARRO_APOS_VENDA
-- Atualiza o status do carro para 'Vendido' após uma venda
DROP TRIGGER IF EXISTS tr_atualizar_status_carro_apos_venda;
CREATE TRIGGER tr_atualizar_status_carro_apos_venda
AFTER INSERT ON venda
FOR EACH ROW
BEGIN
    UPDATE carro
    SET status = 'Vendido'
    WHERE placa = NEW.placa_carro;
END //

-- Trigger 2: TR_REGISTRAR_LOG_ALTERACAO_PRECO_CARRO
-- Registra cada alteração no preço de um carro na tabela de log
DROP TRIGGER IF EXISTS tr_registrar_log_alteracao_preco_carro;
CREATE TRIGGER tr_registrar_log_alteracao_preco_carro
AFTER UPDATE ON carro
FOR EACH ROW
BEGIN
    IF OLD.preco <> NEW.preco THEN
        INSERT INTO log_precos_carro (placa_carro, preco_antigo, preco_novo, usuario_alteracao)
        VALUES (OLD.placa, OLD.preco, NEW.preco, USER());
    END IF;
END //

-- Trigger 3: TR_VERIFICAR_DISPONIBILIDADE_CARRO_ANTES_VENDA
-- Impede a venda de um carro que não esteja 'Disponível'
DROP TRIGGER IF EXISTS tr_verificar_disponibilidade_carro_antes_venda;
CREATE TRIGGER tr_verificar_disponibilidade_carro_antes_venda
BEFORE INSERT ON venda
FOR EACH ROW
BEGIN
    DECLARE v_status_carro VARCHAR(20);
    DECLARE v_error_message VARCHAR(255);

    SELECT status INTO v_status_carro
    FROM carro
    WHERE placa = NEW.placa_carro;

    IF v_status_carro <> 'Disponivel' THEN
        SET v_error_message = CONCAT(
            'Não é possível vender um carro com status "', v_status_carro, '". ',
            'O carro deve estar "Disponivel".'
        );
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = v_error_message;
    END IF;
END //

-- Trigger 4: TR_INCREMENTAR_NUMERO_VENDAS_VENDEDOR
-- Incrementa o total de vendas do vendedor após cada venda
DROP TRIGGER IF EXISTS tr_incrementar_numero_vendas_vendedor;
CREATE TRIGGER tr_incrementar_numero_vendas_vendedor
AFTER INSERT ON venda
FOR EACH ROW
BEGIN
    UPDATE vendedor
    SET total_vendas = IFNULL(total_vendas, 0) + 1
    WHERE cpf = NEW.cpf_vendedor;
END //

-- Trigger 5: TR_VALIDAR_ANO_CARRO
-- Valida o ano de fabricação do carro
DROP TRIGGER IF EXISTS tr_validar_ano_carro;
CREATE TRIGGER tr_validar_ano_carro
BEFORE INSERT ON carro
FOR EACH ROW
BEGIN
    DECLARE v_error_message VARCHAR(255);
    
    IF NEW.ano < 1900 OR NEW.ano > YEAR(CURDATE()) + 1 THEN
        SET v_error_message = CONCAT(
            'Ano de fabricação inválido (', NEW.ano, '). Deve ser entre 1900 e o ano atual + 1.'
        );
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = v_error_message;
    END IF;
END //

DELIMITER ;

-- Populando o Banco de Dados

insert into cliente values ('94499410096', 'Carlos Angelo', '31999999999', 'carlos@teste.com', 'Rua Ouro Preto, 1067, Santo Agostinho, Belo Horizonte');
insert into cliente values ('78131353001', 'Maria Madalena', '31888888888', 'maria@teste.com', 'Rua da Bahia, 1000, Centro, Belo Horizonte');
insert into cliente values ('98607234005', 'Jorge Assis', '31999998888', 'jorge@teste.com', 'Avenida Afonso Pena, 1234, Funcionarios, Belo Horizonte');
insert into cliente values ('54291085028', 'Emilia Santiago', '31988887777', 'emilia@teste.com', 'Rua Pernambuco, 1000, Funcionarios, Belo Horizonte');
insert into cliente values ('30068217005', 'Andre Marques', '31998989898', 'andre@teste.com', 'Avenida Afonso Pena, 2300, Centro, Belo Horizonte');

insert into concessionaria values ('74343841000138', 'Auto Car BH', '3136227782', 'Rua Sapucai, 380, Floresta, Belo Horizonte');
insert into concessionaria values ('52103749000168', 'BH Car', '3136337700', 'Rua Tome de Souza, 890, Savassi, Belo Horizonte');
insert into concessionaria values ('78390978000102', 'Seminovos BH', '31972694797', 'Rua Pium-i, 1250, Sion, Belo Horizonte');
insert into concessionaria values ('67343016000178', 'Carros do Carlos', '31999887744', 'Rua Santa Rita Durao, 1100, Boa Viagem, Belo Horizonte');
insert into concessionaria values ('14756434000120', 'Siga Bem', '31977556612', 'Rua Guaicurus, 500, Centro, Belo Horizonte');

insert into vendedor values ('59264405054', 'Emerson Tertuliano', '31988775241', 'emerson@teste.com', '74343841000138', 0);
insert into vendedor values ('43494499063', 'Altair Machado', '31988775241', 'altair@teste.com', '52103749000168', 0);
insert into vendedor values ('77051489003', 'Vitor Teixeira', '31988775241', 'vitor@teste.com', '78390978000102', 0);
insert into vendedor values ('67355128043', 'Ernandes Valverde', '31988775241', 'ernandes@teste.com', '67343016000178', 0);
insert into vendedor values ('80665487029', 'Iris Abravanel', '31988775241', 'iris@teste.com', '14756434000120', 0);

insert into carro values ('AAA1234', 'Ford', 'Mustang', 2020, 'Preto', 120.55, 250000.98, 'Disponivel', '74343841000138');
insert into carro values ('BBB1234', 'Fiat', 'Uno', 2015, 'Prata', 300000, 25000.00, 'Disponivel', '74343841000138');
insert into carro values ('CCC1234', 'Chevrolet', 'Camaro', 2024, 'Amarelo', 120.55, 300000.55, 'Disponivel', '78390978000102');
insert into carro values ('DDD1234', 'Fiat', 'Marea', 2005, 'Verde', 500000.28, 15000.98, 'Disponivel', '67343016000178');
insert into carro values ('EEE1234', 'Peugeot', '208', 2018, 'Preto', 55, 20450, 'Disponivel', '14756434000120');
insert into carro values ('FFF1234', 'Peugeot', '208', 2019, 'Prata', 45, 21800, 'Disponivel', '52103749000168');
insert into carro values ('GGG1234', 'Peugeot', '208', 2018, 'Vermelho', 100, 21000, 'Disponivel', '52103749000168');

insert into venda values ('94499410096', '59264405054', 'AAA1234', '74343841000138', '2025-07-07', 250000.98, 'PIX', 245000);
insert into venda values ('98607234005', '59264405054', 'BBB1234', '74343841000138', '2024-12-23', 25000.00, 'Financiamento', 40530.25);
insert into venda values ('98607234005', '77051489003', 'CCC1234', '78390978000102', '2025-05-20', 300000.55, 'PIX', 295000);
insert into venda values ('98607234005', '80665487029', 'EEE1234', '14756434000120', '2024-04-15', 20450, 'Financiamento', 21450);
insert into venda values ('98607234005', '67355128043', 'DDD1234', '67343016000178', '2025-02-01', 15000.9, 'Financiamento', 16000.98);