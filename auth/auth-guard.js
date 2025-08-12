// auth-guard.js
const allowedRoles = {
  owner: "/dashboard/owner/",
  omega: "/dashboard/omega/",
  admin: "/dashboard/admin/",
  speler: "/dashboard/speler/"
};

(async () => {
  const auth0Client = await auth0.createAuth0Client({
    domain: "kersmc.eu.auth0.com",
    client_id: "GgvPQ4hrRY1i3nDAetOXQRFuHm5T5r7y",
    cacheLocation: "localstorage",
    useRefreshTokens: true
  });

  const isAuthenticated = await auth0Client.isAuthenticated();
  if (!isAuthenticated) {
    return window.location.href = "/auth/login";
  }

  const user = await auth0Client.getUser();
  const userRoles = user["https://kersmc.nl/roles"] || [];

  // Check if the user has any allowed role for this page
  const matchedRole = userRoles.find(role => allowedRoles[role]);
  if (matchedRole) {
    if (!window.location.pathname.startsWith(allowedRoles[matchedRole])) {
      return window.location.href = allowedRoles[matchedRole];
    }
  } else {
    // No valid role, send to login
    return window.location.href = "/auth/login";
  }
})();
