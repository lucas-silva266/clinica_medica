import { Consulta } from "../model/Consulta.js";
import { Medico } from "../model/Medico.js";
import { Paciente } from "../model/Paciente.js";
import { cadastrar, listar, deletar, atualizar, buscarPorId, alterarMedico, alterarPaciente } from "../repository/consultaRepository.js";
import medicoRepository from "../repository/medicoRepository.js";
import pacienteRepository from "../repository/pacienteRepository.js";

export async function cadastrarConsulta(req, res) {
    try {
        const { data_hora, motivo, status_consulta, fk_id_medico, fk_id_paciente } = req.body;

        if (fk_id_medico !== undefined || fk_id_paciente !== undefined) {
            return res.status(400).json({ mensagem: "Não envie chaves de relacionamento no cadastro da consulta." });
        }

        if (data_hora === undefined || motivo === undefined || status_consulta === undefined) {
            return res.status(400).json({ mensagem: "Data/hora, motivo e status_consulta são obrigatórios." });
        }

        const consulta = new Consulta(null, data_hora, motivo, status_consulta, null, null);

        const id = await cadastrar(consulta);

        res.status(201).json({ id_consulta: id });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao cadastrar consulta.", detalhe: erro.message });
    }
}

export async function listarConsultas(req, res) {
    try {
        const consultas = await listar();
        return res.status(200).json(consultas);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao listar consultas." });
    }
}

export async function buscarConsultaPorId(req, res) {
    try {
        const id = Number(req.params.id);

        new Consulta().validarId(id);

        const consulta = await buscarPorId(id);

        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        res.status(200).json(consulta);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao buscar consulta por ID.", detalhe: erro.message });
    }
}

export async function atualizarConsulta(req, res) {
    try {
        const id = Number(req.params.id);

        if (req.body.fk_id_medico !== undefined || req.body.fk_id_paciente !== undefined) {
            return res.status(400).json({ mensagem: "Não é permitido alterar chaves estrangeiras nesta rota comum." });
        }

        new Consulta().validarId(id);

        const consulta = await buscarPorId(id);

        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        const { data_hora, motivo, status_consulta } = req.body;

        if (data_hora !== undefined) {
            consulta.data_hora = data_hora;
        }

        if (motivo !== undefined) {
            consulta.motivo = motivo;
        }

        if (status_consulta !== undefined) {
            consulta.status_consulta = status_consulta;
        }

        new Consulta(id, consulta.data_hora, consulta.motivo, consulta.status_consulta);

        const resultado = await atualizar(id, consulta);

        if (resultado <= 0) {
            return res.status(400).json({ mensagem: "Nenhuma informação atualizada no banco de dados." });
        }

        return res.status(200).json({ mensagem: "Consulta atualizada com sucesso." });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao atualizar consulta.", detalhe: erro.message });
    }
}

export async function deletarConsulta(req, res) {
    try {
        const id = Number(req.params.id);

        new Consulta().validarId(id);

        const consulta = await buscarPorId(id);

        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        const resultado = await deletar(id);

        if (resultado <= 0) {
            return res.status(400).json({ mensagem: "Nenhuma consulta foi deletada do banco de dados." });
        }

        res.status(200).json({ mensagem: "Consulta deletada com sucesso" });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao deletar consulta.", detalhe: erro.message });
    }
}

export async function vincularMedicoDaConsulta(req, res) {
    try {
        const idConsulta = Number(req.params.idConsulta);
        const idMedico = Number(req.params.idMedico);

        new Consulta().validarId(idConsulta);
        new Medico().validarId(idMedico);

        const consulta = await buscarPorId(idConsulta);
        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ mensagem: "Consulta não encontrada." });
        }

        const medico = await medicoRepository.buscarPorId(idMedico);
        if (!medico || medico.length === 0) {
            return res.status(404).json({ mensagem: "Médico não encontrado. ID inexistente." });
        }

        await alterarMedico(idConsulta, idMedico);
        return res.status(200).json({ mensagem: "Médico vinculado com sucesso à consulta." });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao vincular médico.", detalhe: erro.message });
    }
}

export async function removerMedicoDaConsulta(req, res) {
    try {
        const idConsulta = Number(req.params.idConsulta);

        new Consulta().validarId(idConsulta);

        const consulta = await buscarPorId(idConsulta);
        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ mensagem: "Consulta não encontrada." });
        }

        await alterarMedico(idConsulta, null);
        return res.status(200).json({ mensagem: "Vínculo com o médico removido com sucesso." });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao remover médico.", detalhe: erro.message });
    }
}

export async function vincularPacienteDaConsulta(req, res) {
    try {
        const idConsulta = Number(req.params.idConsulta);
        const idPaciente = Number(req.params.idPaciente);

        new Consulta().validarId(idConsulta);
        new Paciente().validarId(idPaciente);

        const consulta = await buscarPorId(idConsulta);
        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ mensagem: "Consulta não encontrada." });
        }

        const paciente = await pacienteRepository.buscarPorId(idPaciente);
        if (!paciente || paciente.length === 0) {
            return res.status(404).json({ mensagem: "Paciente não encontrado. ID inexistente." });
        }

        await alterarPaciente(idConsulta, idPaciente);
        return res.status(200).json({ mensagem: "Paciente vinculado com sucesso à consulta." });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao vincular paciente.", detalhe: erro.message });
    }
}

export async function removerPacienteDaConsulta(req, res) {
    try {
        const idConsulta = Number(req.params.idConsulta);

        new Consulta().validarId(idConsulta);

        const consulta = await buscarPorId(idConsulta);
        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ mensagem: "Consulta não encontrada." });
        }

        await alterarPaciente(idConsulta, null);
        return res.status(200).json({ mensagem: "Vínculo com o paciente removido com sucesso." });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao remover paciente.", detalhe: erro.message });
    }
}
