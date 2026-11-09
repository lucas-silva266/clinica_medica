import conexao from "../database/conexao.js";

export async function cadastrar(medico) {
    const sql = 'INSERT INTO medicos(nome, crm, especialidade) VALUES (?, ?, ?)';
    
    const [resultado] = await conexao.execute(
        sql, [
            medico.nome,
            medico.crm,
            medico.especialidade
        ]
    );

    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM medicos ORDER BY id_medico';
    const [resultado] = await conexao.execute(sql);

    return resultado;
}

export async function buscarPorId(id) {
    const sql = 'SELECT * FROM medicos WHERE id_medico = ?';
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado[0] || null;
}

export async function atualizar(id, medico) {
    const sql = 'UPDATE medicos SET nome = ?, crm = ?, especialidade = ? WHERE id_medico = ?';

    const [resultado] = await conexao.execute(
        sql, [
            medico.nome,
            medico.crm,
            medico.especialidade,
            id
        ]
    );

    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM medicos WHERE id_medico = ?';
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado.affectedRows;
}
