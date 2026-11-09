export class Medico {
  constructor(id_medico, nome, crm, especialidade) {

    if (id_medico && id_medico <= 0) {
      throw new Error("ID inválido.");
    }

    if (!nome || nome.length < 3) {
      throw new Error("Nome deve ter pelo menos 3 caracteres.");
    }

    if (!crm) {
      throw new Error("CRM é obrigatório.");
    }

    if (!especialidade || especialidade.length < 3) {
      throw new Error("Especialidade deve ter pelo menos 3 caracteres.");
    }

    this.id_medico = id_medico || null;
    this.nome = nome;
    this.crm = crm;
    this.especialidade = especialidade;
  }

  validarId(id) {
    if (!id || id <= 0) {
      throw new Error("ID inválido.");
    }
  }
}
