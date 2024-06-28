function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    agentLogin: urlParams.get("agentLogin"),
    agentPassword: urlParams.get("agentPassword"),
  };
}

function handleErrors(missingParams) {
  alert(`Faltam os seguintes parâmetros na URL: ${missingParams.join(", ")}`);
}

function callAuthenticatedOlos(agentLogin, agentPassword) {
  MyBundle.authenticatedOlos(agentLogin, agentPassword);
}

// ... outras funções que precisam de parâmetros da URL

const params = getQueryParams();

// Chamadas condicionais para cada função
if (params.agentLogin && params.agentPassword) {
  callAuthenticatedOlos(params.agentLogin, params.agentPassword);
} else {
  handleErrors(["agentLogin", "agentPassword"]);
}

if (params.outroParametro) {
  outraFuncao(params.outroParametro);
} else {
  handleErrors(["outroParametro"]);
}
