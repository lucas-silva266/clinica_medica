import conexao from "../database/conexao.js";

export async function cadastrar(paciente) {
    const sql = 'INSERT INTO pacientes(nome, cpf, data_nascimento) VALUES (?, ?, ?)';
    
    const [resultado] = await conexao.execute(
        sql, [
            paciente.nome,
            paciente.cpf,
            paciente.data_nascimento
        ]
    );

    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM pacientes ORDER BY id_paciente';
    const [resultado] = await conexao.execute(sql);

    return resultado;
}

export async function buscarPorId(id) {
    const sql = 'SELECT * FROM pacientes WHERE id_paciente = ?';
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado[0] || null;
}

export async function atualizar(id, paciente) {
    const sql = 'UPDATE pacientes SET nome = ?, cpf = ?, data_nascimento = ? WHERE id_paciente = ?';

    const [resultado] = await conexao.execute(
        sql, [
            paciente.nome,
            paciente.cpf,
            paciente.data_nascimento,
            id
        ]
    );

    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM pacientes WHERE id_paciente = ?';
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado.affectedRows;
}
