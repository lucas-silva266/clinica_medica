import express from "express";
import { cadastrarMedico, listarMedicos, atualizarMedico, deletarMedico, buscarMedicoPorId } from "../controller/medicoController.js";

const router = express.Router();

router.post("/", cadastrarMedico);
router.get("/", listarMedicos);
router.put("/:indice", atualizarMedico);
router.delete("/:indice", deletarMedico);
router.get("/:indice", buscarMedicoPorId);


export default router;