import express from "express";
import { cadastrarPaciente, listarPacientes, atualizarPaciente, deletarPaciente, buscarPacientePorId } from "../controller/pacienteController.js";

const router = express.Router();

router.post("/", cadastrarPaciente);
router.get("/", listarPacientes);
router.put("/:indice", atualizarPaciente);
router.delete("/:indice", deletarPaciente);
router.get("/:indice", buscarPacientePorId);


export default router;