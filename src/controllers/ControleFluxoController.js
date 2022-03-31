const connection = require("../database/connection");

module.exports = {

  async indexControleFluxo(request, response) {
    const controleFluxo = await connection("cof_controle_fluxo")
      .withSchema("controle")
      .select(
        "*",
        connection.raw(
          `(CASE WHEN cof_controle_fluxo.COF_FLG_ATIVO = 'S' THEN 'ATIVO' ELSE 'INATIVO' END) AS COF_FLG_ATIVO`
        )
      );

    return response.json(controleFluxo);
  },

  async indexTipoCarga(request, response) {
    const tipoCarga = await connection("cof_controle_fluxo")
      .withSchema("controle")
      .distinct()
      .orderBy("cof_tipo_carga", "asc")
      .select("cof_tipo_carga as text", "cof_tipo_carga as value");

    return response.json(tipoCarga);
  },

  async indexParSeqParametro(request, response) {
    const parSeqParametro = await connection("cof_controle_fluxo")
      .withSchema("controle")
      .distinct()
      .orderBy("par_seq_parametro", "asc")
      .select("par_seq_parametro as text", "par_seq_parametro as value");

    return response.json(parSeqParametro);
  },

  async indexAtivoInativo(request, response) {
    const ativoInativo = await connection("cof_controle_fluxo")
      .withSchema("controle")
      .distinct()
      .select(
        connection.raw(
          `(CASE WHEN cof_controle_fluxo.COF_FLG_ATIVO = 'S' THEN 'ATIVO' ELSE 'INATIVO' END) AS TEXT,
            (CASE WHEN cof_controle_fluxo.COF_FLG_ATIVO = 'S' THEN 'ATIVO' ELSE 'INATIVO' END) AS VALUE`
        )
      );

    return response.json(ativoInativo);
  },

  async updateAtivoInativo(request, response) {
    const {
      cof_seq_fluxo,
      par_seq_parametro,
      cof_tipo_carga,
      cof_flg_ativo
    } = request.body;

    const newFlgAtivoInativo = cof_flg_ativo === 'ATIVO' ? 'D' : 'S'

    await connection("cof_controle_fluxo")
      .withSchema("controle")
      .where({
        'cof_seq_fluxo': cof_seq_fluxo,
        'par_seq_parametro': par_seq_parametro,
        'cof_tipo_carga': cof_tipo_carga,
      })
      .update('cof_flg_ativo', newFlgAtivoInativo);

    return response.json({sucess: 'Registro Atualizado'});
  },

  async indexIndicatorAtivosInativos(request, response) {
    const indicatorAtivosInativos = await connection("cof_controle_fluxo").withSchema("controle")
      .select("*")
      .fromRaw(
              `(SELECT 
                INDICADOR.SITUACAO 
              ,	INDICADOR.QTD 
              ,	ROUND(((INDICADOR.QTD ::NUMERIC / INDICADOR.TOTAL ::NUMERIC) * 100),2) as PERCENTAGE
              ,	INDICADOR.TOTAL
            FROM (
            
                SELECT 
                  'INATIVOS' AS SITUACAO
                ,	COUNT(*) AS QTD
                ,	(SELECT COUNT(*) AS TOTAL FROM CONTROLE.COF_CONTROLE_FLUXO CCF )
                FROM CONTROLE.COF_CONTROLE_FLUXO CCF 
                WHERE CCF.COF_FLG_ATIVO <> 'S'
                
                UNION
                
                SELECT 
                  'ATIVOS' AS SITUACAO
                ,	COUNT(*) AS QTD
                ,	(SELECT COUNT(*) AS TOTAL FROM CONTROLE.COF_CONTROLE_FLUXO CCF )
                FROM CONTROLE.COF_CONTROLE_FLUXO CCF 
                WHERE CCF.COF_FLG_ATIVO = 'S'
            ) INDICADOR) AS I`
          )
  
    return response.json(indicatorAtivosInativos)
  }
  
};
