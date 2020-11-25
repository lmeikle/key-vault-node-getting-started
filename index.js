var KeyVault = require('azure-keyvault');
var AuthenticationContext = require('adal-node').AuthenticationContext;
var clientId = "16fcb00f-bf93-40aa-b18f-23009d5ef1b5"; //from https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Overview/quickStartType//sourceType/Microsoft_AAD_IAM/appId/16fcb00f-bf93-40aa-b18f-23009d5ef1b5/objectId/a031cc3e-6270-40fe-bf95-707a4815e1bc/isMSAApp//defaultBlade/Overview/appSignInAudience/AzureADMyOrg/servicePrincipalCreated/true
var clientSecret = "peEGxr-V8PyH2.d~G4e-iDL9~Lsr34ULja"; // value of secret I created here https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Credentials/appId/16fcb00f-bf93-40aa-b18f-23009d5ef1b5/isMSAApp/
var vaultUri = "https://laura-dev-keyvault.vault.azure.net/";

/**
 * In the key vault I added an access policy for this app above ie laura-meikle-dev-app
 */

// Authenticator - retrieves the access token
var authenticator = function (challenge, callback) {
    // Create a new authentication context.
    var context = new AuthenticationContext(challenge.authorization);

    // Use the context to acquire an authentication token.
    return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function (err, tokenResponse) {
        if (err) throw err;

        // Calculate the value to be set in the request's Authorization header and resume the call.
        var authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;
        return callback(null, authorizationValue);
    });
};

var credentials = new KeyVault.KeyVaultCredentials(authenticator);
var client = new KeyVault.KeyVaultClient(credentials);

/*let secretName = 'mysecret',
  value = 'myValue',
  optionsopt = {
      contentType: 'sometype',
      // tags: 'sometag',
      // secretAttributes: 'someAttributes',
      // contentType: 'sometype',
      // customHeaders: 'customHeaders'
  };
client.setSecret(vaultUri, secretName, value, optionsopt).then((results) => {
    console.log(results);
})*/

let secretName = 'my-test-secret'
let secretVersion = '' //leave this blank to get the latest version;
client.getSecret(vaultUri, secretName, secretVersion).then((result) => {
  console.log(result);
})
