import sql from "mssql";
import poolPromise from "../config/database.js";
import path from "path";
import dotenv from "dotenv";

import { chromium } from "playwright";
import { fileURLToPath } from "url";

const currentDir = process.cwd();
dotenv.config({ path: path.resolve(currentDir, ".env") });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "../../", "public");

class AuthController {
  async auth(req, res) {
    try {
      const { agentLogin, agentPassword } = req.query;

      if (!agentLogin || !agentPassword) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      // Consultar o banco de dados para verificar as credenciais
      const pool = await poolPromise;
      const request = pool.request();

      const result = await request
        .input("agentLogin", sql.NVarChar, agentLogin)
        .input("agentPassword", sql.NVarChar, agentPassword)
        .query(
          "SELECT * FROM Users WHERE agentLogin = @agentLogin AND agentPassword = @agentPassword"
        );

      if (result.recordset.length > 0) {
        const user = result.recordset[0];

        res.status(200).json({
          agentLogin: user.agentLogin,
          agentPassword: user.agentPassword,
        });

        console.log("Iniciando o navegador...");

        const browser = await chromium.launch({
          headless: false,
          executablePath: process.env.BROWSER_PATH,
        });
        console.log("Olos iniciado com sucesso!");
        const page = await browser.newPage();
        const filePath = path.join(publicPath, "index.html");
        console.log("Navegando para:", `file://${filePath}`);
        await page.goto(`${process.env.SERVER_URL}:${process.env.SERVER_PORT}`);

        const credentials = {
          agentLogin: user.agentLogin,
          agentPassword: user.agentPassword,
        };

        await page.evaluate((creds) => {
          callAuthenticatedOlos(creds.agentLogin, creds.agentPassword);
        }, credentials);
      } else {
        res.status(401).json({ error: "Credenciais inválidas" });
      }
    } catch (err) {
      console.error("Erro ao autenticar:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default AuthController;
