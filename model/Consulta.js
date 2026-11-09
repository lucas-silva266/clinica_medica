export class Consulta {
  constructor(id_consulta, data_hora, motivo, status_consulta, fk_id_medico, fk_id_paciente) {

    if (id_consulta && id_consulta <= 0) {
      throw new Error("ID inválido.");
    }

    if (!data_hora) {
      throw new Error("Data e hora são obrigatórias.");
    }

    if (!motivo || motivo.length < 5) {
      throw new Error("Motivo deve ter pelo menos 5 caracteres.");
    }

    if (status_consulta !== 'rascunho' && 
        status_consulta !== 'agendada' && 
        status_consulta !== 'concluida' && 
        status_consulta !== 'cancelada') {
      throw new Error("Status inválido.");
    }

    this.id_consulta = id_consulta || null;
    this.data_hora = data_hora;
    this.motivo = motivo;
    this.status_consulta = status_consulta;
    this.fk_id_medico = fk_id_medico || null;
    this.fk_id_paciente = fk_id_paciente || null;
  }

  validarId(id) {
    if (!id || id <= 0) {
      throw new Error("ID inválido.");
    }
  }
}
