import { Paciente } from "../model/Paciente.js";
import { cadastrar, listar, deletar, atualizar, buscarPorId } from "../repository/pacienteRepository.js";

export async function cadastrarPaciente(req, res) {
    try {
        const { nome, cpf, data_nascimento } = req.body;

        if (nome === undefined || cpf === undefined || data_nascimento === undefined) {
            return res.status(400).json({ mensagem: "Nome, CPF e Data de nascimento são obrigatórios." });
        }

        const paciente = new Paciente(null, nome, cpf, data_nascimento);

        const id = await cadastrar(paciente);

        res.status(201).json({ id_paciente: id });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao cadastrar paciente.", detalhe: erro.message });
    }
}

export async function listarPacientes(req, res) {
    try {
        const pacientes = await listar();

        return res.status(200).json(pacientes);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao listar pacientes." });
    }
}

export async function buscarPacientePorId(req, res) {
    try {
        const id = Number(req.params.id);

        new Paciente().validarId(id);

        const paciente = await buscarPorId(id);

        if (!paciente || paciente.length === 0) {
            return res.status(404).json({
                mensagem: "Paciente não encontrado"
            });
        }

        res.status(200).json(paciente);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao buscar paciente por ID.", detalhe: erro.message });
    }
}

export async function atualizarPaciente(req, res) {
    try {
        const id = Number(req.params.id);

        new Paciente().validarId(id);

        const paciente = await buscarPorId(id);

        if (!paciente || paciente.length === 0) {
            return res.status(404).json({
                mensagem: "Paciente não encontrado"
            });
        }

        const { nome, cpf, data_nascimento } = req.body;

        if (nome !== undefined) {
            paciente.nome = nome;
        }

        if (cpf !== undefined) {
            paciente.cpf = cpf;
        }

        if (data_nascimento !== undefined) {
            paciente.data_nascimento = data_nascimento;
        }

        new Paciente(id, paciente.nome, paciente.cpf, paciente.data_nascimento);

        const resultado = await atualizar(id, paciente);

        if (resultado <= 0) {
            return res.status(400).json({ mensagem: "Nenhuma informação atualizada no banco de dados." });
        }

        return res.status(200).json({ mensagem: "Paciente atualizado com sucesso." });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao atualizar paciente.", detalhe: erro.message });
    }
}

export async function deletarPaciente(req, res) {
    try {
        const id = Number(req.params.id);

        new Paciente().validarId(id);

        const paciente = await buscarPorId(id);

        if (!paciente || paciente.length === 0) {
            return res.status(404).json({
                mensagem: "Paciente não encontrado"
            });
        }

        const resultado = await deletar(id);

        if (resultado <= 0) {
            return res.status(400).json({ mensagem: "Nenhum paciente foi deletado do banco de dados." });
        }

        res.status(200).json({
            mensagem: "Paciente deletado com sucesso"
        });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao deletar paciente.", detalhe: erro.message });
    }
}
