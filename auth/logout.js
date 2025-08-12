import { authConfig } from './auth-config.js';

const auth0Client = await createAuth0Client({
    domain: authConfig.domain,
    client_id: authConfig.clientId,
    redirect_uri: window.location.origin
});

// Uitloggen
auth0Client.logout({
    returnTo: window.location.origin
});
