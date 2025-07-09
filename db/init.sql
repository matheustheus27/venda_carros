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
    SELECT status INTO v_status_carro
    FROM carro
    WHERE placa = NEW.placa_carro;

    IF v_status_carro <> 'Disponível' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = CONCAT('Não é possível vender um carro com status "', v_status_carro, '". O carro deve estar "Disponível".');
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
    IF NEW.ano < 1900 OR NEW.ano > YEAR(CURDATE()) + 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = CONCAT('Ano de fabricação inválido (', NEW.ano, '). Deve ser entre 1900 e o ano atual + 1.');
    END IF;
END //

DELIMITER ;
