const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

// Set API key
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

module.exports = apiInstance;
