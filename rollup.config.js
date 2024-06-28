import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

export default {
  input: "src/services/olosService.js",
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
      exports: "auto", // Exportações automáticas para CommonJS
    },
    {
      file: "dist/bundle.esm.js",
      format: "es",
      exports: "auto", // Exportações automáticas para ES Modules
    },
    {
      file: "dist/bundle.js",
      format: "iife",
      name: "MyBundle", // Nome da variável global (se necessário)
      exports: "auto", // Exportações automáticas para IIFE
      globals: {
        crypto: "Crypto"
      }
    },
  ],
  plugins: [
    resolve({
      browser: true, // Resolve módulos no ambiente de navegador
      preferBuiltins: true, // Usa os módulos internos do Node.js, se disponíveis
    }),
    commonjs(), // Converte módulos CommonJS para ES6
    json(), // Suporte para arquivos JSON
  ],
};
