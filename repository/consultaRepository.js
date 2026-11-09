import conexao from "../database/conexao.js";

export async function cadastrar(consulta) {
    const sql = 'INSERT INTO consultas(data_hora, motivo, status_consulta, fk_id_medico, fk_id_paciente) VALUES (?, ?, ?, NULL, NULL)';
    const [resultado] = await conexao.execute(sql, [consulta.data_hora, consulta.motivo, consulta.status_consulta]);
    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM consultas ORDER BY id_consulta';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}

export async function buscarPorId(id) {
    const sql = `
        SELECT c.*, m.nome AS medico_nome, p.nome AS paciente_nome
        FROM consultas c
        LEFT JOIN medicos m ON c.fk_id_medico = m.id_medico
        LEFT JOIN pacientes p ON c.fk_id_paciente = p.id_paciente
        WHERE c.id_consulta = ?
    `;
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado;
}

export async function atualizar(id, consulta) {
    const sql = 'UPDATE consultas SET data_hora = ?, motivo = ?, status_consulta = ? WHERE id_consulta = ?';
    const [resultado] = await conexao.execute(sql, [consulta.data_hora, consulta.motivo, consulta.status_consulta, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM consultas WHERE id_consulta = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}

export async function alterarMedico(idConsulta, idMedico) {
    const sql = 'UPDATE consultas SET fk_id_medico = ? WHERE id_consulta = ?';
    const [resultado] = await conexao.execute(sql, [idMedico, idConsulta]);
    return resultado.affectedRows;
}

export async function alterarPaciente(idConsulta, idPaciente) {
    const sql = 'UPDATE consultas SET fk_id_paciente = ? WHERE id_consulta = ?';
    const [resultado] = await conexao.execute(sql, [idPaciente, idConsulta]);
    return resultado.affectedRows;
}
