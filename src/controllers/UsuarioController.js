import sql from "mssql";
import poolPromise from "../config/database.js";

class UsuarioController {
  async criar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      const pool = await poolPromise;
      const request = pool.request();

      const result = await request
        .input("nome", sql.NVarChar, nome)
        .input("email", sql.NVarChar, email)
        .input("senha", sql.NVarChar, senha)
        .query(
          "INSERT INTO Users (nome, email, senha) VALUES (@nome, @email, @senha)"
        );

      if (result.rowsAffected[0] === 1) {
        res.status(201).json({ message: "Usuário criado com sucesso" });
      } else {
        res.status(500).json({ error: "Erro ao criar usuário" });
      }
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async buscar(req, res) {
    try {
      const pool = await poolPromise;
      const request = pool.request();

      const result = await request.query("SELECT * FROM Users");

      res.status(200).json(result.recordset);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async atualizar(req, res) {
    try {
      const usuarioId = req.params.id; // Obtém o ID do usuário da URL
      const { nome, email, senha } = req.body; // Obtém os dados atualizados

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      const pool = await poolPromise;
      const request = pool.request();

      const result = await request
        .input("id", sql.Int, usuarioId)
        .input("nome", sql.NVarChar, nome)
        .input("email", sql.NVarChar, email)
        .input("senha", sql.NVarChar, senha) // Lembre-se de criptografar a senha
        .query(
          "UPDATE Users SET nome = @nome, email = @email, senha = @senha WHERE id = @id"
        );

      if (result.rowsAffected[0] === 1) {
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async deletar(req, res) {
    try {
      const usuarioId = req.params.id;
      const pool = await poolPromise;
      const request = pool.request();

      const result = await request
        .input("nome", sql.NVarChar, usuarioId)
        .query("DELETE FROM Users WHERE nome = @usuarioId");

      if (result.rowsAffected[0] === 1) {
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (err) {
      console.error("Erro ao deletar o usuário:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default UsuarioController;
