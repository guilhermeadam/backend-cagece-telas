const express = require("express");

const routes = express.Router();

const ControleFluxoController = require("./controllers/ControleFluxoController");
const ControleCargaController = require("./controllers/ControleCargaController");

/**CONTROLE DE FLUXO */
routes.get("/gestao-sei/controle_fluxo", ControleFluxoController.indexControleFluxo);
routes.get("/gestao-sei/controle_fluxo/ativo_inativo", ControleFluxoController.indexAtivoInativo);
routes.get("/gestao-sei/controle_fluxo/tipo_carga", ControleFluxoController.indexTipoCarga);
routes.get("/gestao-sei/controle_fluxo/par_seq_parametro", ControleFluxoController.indexParSeqParametro);
routes.get("/gestao-sei/controle_fluxo/indicator_ativo_inativo", ControleFluxoController.indexIndicatorAtivosInativos);
routes.post("/gestao-sei/controle_fluxo/update_ativo_inativo", ControleFluxoController.updateAtivoInativo);

/**CONTROLE DE CARGA */
routes.get("/gestao-sei/controle_carga", ControleCargaController.indexControleCarga);
routes.get("/gestao-sei/controle_carga/datamart", ControleCargaController.indexDatamart);
routes.get("/gestao-sei/controle_carga/parametro", ControleCargaController.indexParametro);
routes.get("/gestao-sei/controle_carga/processo", ControleCargaController.indexProcesso);
routes.get("/gestao-sei/controle_carga/tipo_carga", ControleCargaController.indexTipoCarga);


module.exports = routes;
