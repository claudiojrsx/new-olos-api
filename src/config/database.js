// config/database.js
import dotenv from "dotenv";
import path from "path";
import sql from "mssql";

// Carregar as variáveis de ambiente do arquivo .env
const currentDir = process.cwd();
dotenv.config({ path: path.resolve(currentDir, ".env") });

const config = {
	user: process.env.USER,
	password: process.env.PASSWORD,
	server: process.env.SERVER,
	port: parseInt(process.env.PORT),
	database: process.env.DATABASE,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		encrypt: false,
		trustServerCertificate: true,
	},
};

console.log("Configuração de banco de dados:", config);

const poolPromise = new sql.ConnectionPool(config)
	.connect()
	.then((pool) => {
		console.log("Conectado ao SQL Server");
		return pool;
	})
	.catch((err) => {
		console.error("Erro ao conectar ao SQL Server", err);
		throw err;
	});

export default poolPromise;
