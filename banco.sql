CREATE DATABASE clinica_medica;

USE clinica_medica;

CREATE TABLE medicos(
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL CHECK (CHAR_LENGTH(nome) >= 3), 
    crm VARCHAR(6) NOT NULL UNIQUE,
    especialidade VARCHAR(100) NOT NULL CHECK (CHAR_LENGTH(especialidade) >= 3) 
);

CREATE TABLE pacientes(
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL CHECK (CHAR_LENGTH(nome) >= 3),
    cpf VARCHAR(11) NOT NULL UNIQUE CHECK (char_length(cpf) = 11),
    data_nascimento DATE NOT NULL
);

CREATE TABLE consultas(
    id_consulta INT AUTO_INCREMENT PRIMARY KEY,
    data_hora DATETIME NOT NULL,
    motivo TEXT NOT NULL CHECK (CHAR_LENGTH(motivo) >= 5),
    status_consulta ENUM('rascunho', 'agendada', 'concluida', 'cancelada') NOT NULL,
    fk_id_medico INT NULL,
    fk_id_paciente INT NULL,
    FOREIGN KEY (fk_id_medico) REFERENCES medicos(id_medico) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (fk_id_paciente) REFERENCES pacientes(id_paciente) ON DELETE SET NULL ON UPDATE CASCADE
);