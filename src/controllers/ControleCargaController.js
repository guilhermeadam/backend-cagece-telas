const connection = require("../database/connection");

module.exports = {
  async indexControleCarga(request, response) {
    const controleCarga = await connection("vw_competencia")
      .withSchema("controle")
      .select(
          connection.raw(`UPPER(vw_competencia.modulo) AS modulo`)
        , "datamart"
        , "parametro"
        , connection.raw(`UPPER(vw_competencia.processo) AS processo`)
        , "competencia"
        , "encerramento_cobranca"
        , "encerramento_faturamento"
        , connection.raw(`TO_CHAR(vw_competencia.data_carga, 'DD/MM/YYYY') AS data_carga`)
        , connection.raw(`TO_CHAR(vw_competencia.data_fim_carga, 'DD/MM/YYYY') AS data_fim_carga`)
        , connection.raw(`TRIM(vw_competencia.car_seq_carga) AS car_seq_carga`)
        , "tipo_carga"
        , "executando"
        , connection.raw(`vw_competencia.codigo_processo ::INTEGER`)
        , connection.raw(`vw_competencia.dependencia ::INTEGER`)
        , connection.raw(`vw_competencia.intervalo_dependencia ::INTEGER`)
        , "execucao_por_dependencia"
      )

    return response.json(controleCarga);
  },

  async indexDatamart(request, response) {
    const datamart = await connection("vw_competencia").withSchema("controle")
      .distinct()
      .select(
          "datamart AS text"
        , "datamart AS value"
      )

    return response.json(datamart)
  },

  async indexParametro(request, response) {
    const parametro = await connection("vw_competencia").withSchema("controle")
      .distinct()
      .select(
          "parametro AS text"
        , "parametro AS value"
      )

    return response.json(parametro)
  },

  async indexProcesso(request, response) {
    const processo = await connection("vw_competencia").withSchema("controle")
      .distinct()
      .select(
          connection.raw(`UPPER(vw_competencia.processo) AS text`)
        , connection.raw(`UPPER(vw_competencia.processo) AS value`)
      )
    
    return response.json(processo)
  },

  async indexTipoCarga(request, response) {
    const tipoCarga = await connection("vw_competencia").withSchema("controle")
      .distinct()
      .select(
          "tipo_carga AS text"
        , "tipo_carga AS value"
      )

    return response.json(tipoCarga)
  }
};
