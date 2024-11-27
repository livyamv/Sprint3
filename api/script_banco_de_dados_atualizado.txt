create database reservas_salas;

use reservas_salas;

create table usuario(
    id_usuario int auto_increment primary key,
    email varchar(255) not null unique,
    senha varchar(255) not null,
    nome_usuario varchar(255) not null    
);

create table salas(
    id_salas int auto_increment primary key,
    descricao_sala varchar(255) not null,
    nome_sala varchar(255) not null unique,
    capacidade varchar(255) not null
);

create table agendamentos(
    id_agendamentos int auto_increment primary key,
    fk_id_usuario int not null,
    foreign key (fk_id_usuario) references usuario (id_usuario),
    fk_id_sala int not null,
    foreign key (fk_id_sala) references salas (id_salas),
    descricao_agend varchar(255) not null,
    inicio_periodo DATETIME not null,
    fim_periodo DATETIME not null
);

INSERT INTO salas (`nome_sala`, `descricao_sala`, `capacidade`) VALUES 
('A1', 'CONVERSORES', 16),
('A2', 'ELETRÔNICA', 16), 
('A3', 'CLP', 16), ('A4', 'AUTOMAÇÃO', 20), 
('A5', 'METROLOGIA', 16), 
('A6', 'PNEUMÁTICA/HIDRÁULICA', 20),  
('B2', 'SALA DE AULA', 32), 
('B3', 'SALA DE AULA', 32), 
('B5', 'SALA DE AULA', 40), 
('B6', 'SALA DE AULA', 32), 
('B7', 'SALA DE AULA', 32), 
('B8', 'LAB. INFORMÁTICA', 20), 
('B9', 'LAB. INFORMÁTICA', 16), 
('B10', 'LAB. INFORMÁTICA', 16), 
('B11', 'LAB. INFORMÁTICA', 40), 
('B12', 'LAB. INFORMÁTICA', 40),
('C1', 'SALA DE AULA', 24), 
('C2', 'LAB. DE INFORMÁTICA', 32), 
('C3', 'SALA DE MODELAGEM VESTUÁRIO', 20), 
('C4', 'SALA DE MODELAGEM VESTUÁRIO', 20), 
('C5', 'SALA DE AULA', 16), 
('D1', 'SALA MODELAGEM', 16), 
('D2', 'SALA DE MODELAGEM', 20), 
('D3', 'SALA DE AULA', 16), 
('D4', 'SALA DE CRIAÇÃO', 18); 