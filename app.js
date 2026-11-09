import 'dotenv/config';
import express from "express";
import medicoRoutes from "./routes/medicoRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";

const app = express();

app.use(express.json());

app.use("/medico", medicoRoutes);
app.use("/paciente", pacienteRoutes);
app.use("/consulta", consultaRoutes);

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, "127.0.0.1", () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);  
});