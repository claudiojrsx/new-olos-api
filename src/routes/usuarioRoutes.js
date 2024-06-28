// routes/usuarioRoutes.js
import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();
const usuarioController = new UsuarioController();

// Definindo as rotas para usuário
router.post("/criarUsuario", usuarioController.criar);
router.get("/buscarUsuarios", usuarioController.buscar);
router.put("/atualizarUsuario/:id", usuarioController.atualizar); // Atualizar com ID na URL
router.delete("/deletarUsuario/:id", usuarioController.deletar); // Deletar com ID na URL

export default router;
