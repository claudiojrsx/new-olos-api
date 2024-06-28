import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
const port = 86;

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "..", "public");
const distPath = path.join(__dirname, "..", "dist");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(publicPath));
app.use("/dist", express.static(distPath));

app.use("/api", authRoutes);
app.use('/api', usuarioRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://192.168.0.9:${port}`);
});
