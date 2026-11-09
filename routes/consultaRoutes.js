import express from "express";
import { cadastrarConsulta, listarConsultas, atualizarConsulta, deletarConsulta, buscarConsultaPorId
    
 } from "../controller/consultaController.js";

const router = express.Router();

router.post("/", cadastrarConsulta);
router.get("/", listarConsultas);
router.put("/:indice", atualizarConsulta);
router.delete("/:indice", deletarConsulta);
router.get("/:indice", buscarConsultaPorId);


export default router;