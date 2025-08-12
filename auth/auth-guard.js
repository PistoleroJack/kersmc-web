(async () => {
  const auth0Client = await createAuth0Client({
    domain: "jouw-auth0-domein", // <-- zelfde AUTH0_DOMAIN als hierboven
    client_id: "GgvPQ4hrRY1i3nDAetOXQRFuHm5T5r7y",
    redirect_uri: window.location.origin + window.location.pathname
  });

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (!isAuthenticated) {
    await auth0Client.loginWithRedirect({
      redirect_uri: window.location.origin + window.location.pathname
    });
  }
})();
