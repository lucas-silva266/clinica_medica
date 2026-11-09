export class Paciente {
  constructor(id_paciente, nome, cpf, data_nascimento) {

    if (id_paciente && id_paciente <= 0) {
      throw new Error("ID inválido.");
    }

    if (!nome || nome.length < 3) {
      throw new Error("Nome deve ter pelo menos 3 caracteres.");
    }

    if (!cpf || cpf.length !== 11) {
      throw new Error("CPF deve ter exatamente 11 caracteres.");
    }

    if (!data_nascimento) {
      throw new Error("Data de nascimento é obrigatória.");
    }

    this.id_paciente = id_paciente || null;
    this.nome = nome;
    this.cpf = cpf;
    this.data_nascimento = data_nascimento;
  }

  validarId(id) {
    if (!id || id <= 0) {
      throw new Error("ID inválido.");
    }
  }
}
