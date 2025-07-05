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
    foreign key (cnpj_concessionaria) references concessionaria(cnpj) on delete cascade
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
    data date,
    valor decimal(20, 2) not null,
    tipo_pagamento varchar(20) not null,
    total_pago decimal(20, 2) not null,
    primary key (cpf_cliente, cpf_vendedor, placa_carro, data),
    foreign key (cpf_cliente) references cliente(cpf),
    foreign key (cpf_vendedor) references vendedor(cpf),
    foreign key (placa_carro) references carro(placa)
);