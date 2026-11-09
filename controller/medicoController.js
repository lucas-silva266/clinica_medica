import { Medico } from "../model/Medico.js";
import { cadastrar, listar, deletar, atualizar, buscarPorId } from "../repository/medicoRepository.js";

export async function cadastrarMedico(req, res) {
    try {
        const { nome, crm, especialidade } = req.body;

        if (nome === undefined || crm === undefined || especialidade === undefined) {
            return res.status(400).json({ mensagem: "Nome, CRM e Especialidade são obrigatórios." });
        }

        const medico = new Medico(null, nome, crm, especialidade);

        const id = await cadastrar(medico);

        res.status(201).json({ id_medico: id });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao cadastrar médico.", detalhe: erro.message });
    }
}

export async function listarMedicos(req, res) {
    try {
        const medicos = await listar();

        return res.status(200).json(medicos);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao listar médicos." });
    }
}

export async function buscarMedicoPorId(req, res) {
    try {
        const id = Number(req.params.id);

        new Medico().validarId(id);

        const medico = await buscarPorId(id);

        if (!medico || medico.length === 0) {
            return res.status(404).json({
                mensagem: "Médico não encontrado"
            });
        }

        res.status(200).json(medico);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao buscar médico por ID.", detalhe: erro.message });
    }
}

export async function atualizarMedico(req, res) {
    try {
        const id = Number(req.params.id);

        new Medico().validarId(id);

        const medico = await buscarPorId(id);

        if (!medico || medico.length === 0) {
            return res.status(404).json({
                mensagem: "Médico não encontrado"
            });
        }

        const { nome, crm, especialidade } = req.body;

        if (nome !== undefined) {
            medico.nome = nome;
        }

        if (crm !== undefined) {
            medico.crm = crm;
        }

        if (especialidade !== undefined) {
            medico.especialidade = especialidade;
        }

        new Medico(id, medico.nome, medico.crm, medico.especialidade);

        const resultado = await atualizar(id, medico);

        if (resultado <= 0) {
            return res.status(400).json({ mensagem: "Nenhuma informação atualizada no banco de dados." });
        }

        return res.status(200).json({ mensagem: "Médico atualizado com sucesso." });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao atualizar médico.", detalhe: erro.message });
    }
}

export async function deletarMedico(req, res) {
    try {
        const id = Number(req.params.id);

        new Medico().validarId(id);

        const medico = await buscarPorId(id);

        if (!medico || medico.length === 0) {
            return res.status(404).json({
                mensagem: "Médico não encontrado"
            });
        }

        const resultado = await deletar(id);

        if (resultado <= 0) {
            return res.status(400).json({ mensagem: "Nenhum médico foi deletado do banco de dados." });
        }

        res.status(200).json({
            mensagem: "Médico deletado com sucesso"
        });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao deletar médico.", detalhe: erro.message });
    }
}
