import { authConfig } from './auth-config.js';

const auth0Client = await createAuth0Client({
    domain: authConfig.domain,
    client_id: authConfig.clientId,
    redirect_uri: authConfig.redirectUri
});

// Start loginproces
auth0Client.loginWithRedirect();
