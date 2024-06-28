import { createOlos, OlosAgentWS, olosOn } from "@olostecnologia/olosagentsdk";

const MyBundle = (function () {
  const agentWS = new OlosAgentWS();

  const addrs = {
    wsAgentCmd: "http://204.199.43.30:8082/WebAPIAgentControl/AgentCommand/",
    wsAgentEvt: "http://204.199.43.30:8082/WebAPIAgentControl/AgentEvent/",
    WsAgentCloud: "http://204.199.43.30:8082/WebAPIAgentControl/CloudAgent/",
    wsMailingCmd: "http://204.199.43.30:8082/WebAPIMailingControl/MailingCommand/",
    wsAgentConfig: "http://204.199.43.30:8082/WebAPIConfiguration/AgentConfig/",
    wsVoiceSupport: "http://204.199.43.30:8082/WsVoiceSupportIntegration/WsVoiceSupportIntegration.asmx",
    WebAPIAgentControl: "http://204.199.43.30:8082/WebAPIAgentControl/",
    wsSoftphone: "http://204.199.43.30:8082/WebAPISoftphone/Softphone/",
    wsMcx: "http://204.199.43.30:8082/WsMcx/wsmcx/Mcx/",
    wsRecordingRetrieve: "http://204.199.43.30:8082/WebApiRecordingRetrieve/RecordTextComm/",
  };

  const auth = {
    user: "api_token",
    password: "olos@123",
    clientID: "e9b9383e437b4bf284553c2f8af3ea82",
    clientSecret: "MCZ0mUMHJp7ZL0bTGbY_FS8jQqhpH9mHFDmPP9jd8TQ",
  };

  const jsLogger = true;

  function authenticatedOlos(agentLogin, agentPassword) {
    createOlos(addrs, auth, jsLogger);

    agentWS.agentAuthentication(agentLogin, agentPassword, (callback) => {
      console.log(`Usuário autenticado com ID: ${callback}`);

      olosOn("PassCode", (payload) => {
        console.log("Evento PassCode ouvido:", payload);
      });

      olosOn("LoginCampaign", (payload) => {
        console.log("Evento LoginCampaign ouvido:", payload);
      });

      olosOn("Screenpop", (payload) => {
        console.log("Evento Screenpop ouvido:", payload);
      });
    });
  }

  return {
    authenticatedOlos,
  };
})();

export default MyBundle;