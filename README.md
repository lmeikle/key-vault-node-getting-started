# Quickstart: Set and retrieve a secret from Azure Key Vault using a Node Web App (App Service)

Scaffold express app quickly using 'npx express-generator myExpressApp'

https://docs.microsoft.com/en-gb/samples/azure-samples/key-vault-node-getting-started/quickstart-set-and-retrieve-a-secret-from-azure-key-vault-using-a-node-web-app/

https://medium.com/@ayanfecrown/azure-key-vault-node-js-step-by-step-tutorial-af131a78e220

Deploying using local git:
	https://docs.microsoft.com/en-us/azure/app-service/deploy-local-git
	Get credititals to push from Azure 
	(How to clear if enter them wrong https://stackoverflow.com/questions/15381198/remove-credentials-from-git)
	
	git remote rm origin
	git remote add origin https://github.com/lmeikle/key-vault-node-getting-started.git
	git push -u origin master

	git remote add azure https://laura-dev-app-service.scm.azurewebsites.net:443/laura-dev-app-service.git
	git push azure master

Setup the auth stuff:<br>
	https://medium.com/@ayanfecrown/azure-key-vault-node-js-step-by-step-tutorial-af131a78e220
	
Deployed to:<br>
https://laura-dev-app-service.azurewebsites.net

To view the secret hit this page:
https://laura-dev-app-service.azurewebsites.net/keyvault

To resolve deployment errors:<br>
It seems that if you set these environment variables in you App Service Settings, everything runs smoothly. You just have to use versions that match.
WEBSITE_NODE_DEFAULT_VERSION=12
WEBSITE_NPM_DEFAULT_VERSION=6
