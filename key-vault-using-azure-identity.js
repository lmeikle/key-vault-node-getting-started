const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

let secret = ''

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  /**
   * tenantId: 'a147b7f5-1a1e-43b5-b0c7-283151da8bb6', // from https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Properties
   * clientId = "16fcb00f-bf93-40aa-b18f-23009d5ef1b5"; // from https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Overview/quickStartType//sourceType/Microsoft_AAD_IAM/appId/16fcb00f-bf93-40aa-b18f-23009d5ef1b5/objectId/a031cc3e-6270-40fe-bf95-707a4815e1bc/isMSAApp//defaultBlade/Overview/appSignInAudience/AzureADMyOrg/servicePrincipalCreated/true
   * clientSecret = "peEGxr-V8PyH2.d~G4e-iDL9~Lsr34ULja"; // value of secret I created here https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Credentials/appId/16fcb00f-bf93-40aa-b18f-23009d5ef1b5/isMSAApp/
   */

  const credential = new DefaultAzureCredential();
  const url = process.env["KEYVAULT_URI"] || "https://laura-dev-keyvault.vault.azure.net/";
  const client = new SecretClient(url, credential);

  // Create a secret
  /*const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;
  const result = await client.setSecret(secretName, "MySecretValue");
  console.log("result: ", result);

  // Read the secret we created
  const secret = await client.getSecret(secretName);
  console.log("secret: ", secret);

  // Update the secret with different attributes
  const updatedSecret = await client.updateSecretProperties(secretName, result.properties.version, {
    enabled: false
  });
  console.log("updated secret: ", updatedSecret);

  // Delete the secret
  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(secretName);*/

  secret = await client.getSecret('my-test-secret');
  console.log("secret: ", secret);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});

function getSecret() {
  return secret
}

module.exports = getSecret;
