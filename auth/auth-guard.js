import { authConfig } from './auth-config.js';

async function checkAuth() {
    const auth0Client = await createAuth0Client({
        domain: authConfig.domain,
        client_id: authConfig.clientId,
        redirect_uri: authConfig.redirectUri
    });

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (!isAuthenticated) {
        // Als niet ingelogd → stuur naar login
        return auth0Client.loginWithRedirect({
            redirect_uri: window.location.href
        });
    }

    // Gebruikersinfo ophalen
    const user = await auth0Client.getUser();

    // Optioneel: rol-check (zorg dat 'roles' claim in Auth0 wordt ingesteld)
    const roles = user["https://example.com/roles"] || [];
    if (!roles.includes("admin")) {
        document.body.innerHTML = "<h1>403 - Geen toegang</h1>";
        return;
    }

    // Als alles goed is, pagina tonen
    document.body.style.display = "block";
}

// Verberg pagina tot check klaar is
document.body.style.display = "none";
checkAuth();
