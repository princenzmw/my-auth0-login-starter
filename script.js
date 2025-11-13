try {
  let config;
  if (window.AUTH_CONFIG && window.AUTH_CONFIG.domain && window.AUTH_CONFIG.clientId) {
    // Production config from environment variables
    config = window.AUTH_CONFIG;
  } else {
    // Local development: fetch from auth_config.json
    const res = await fetch('/auth_config.json');
    if (!res.ok) {
      throw new Error('Failed to load auth_config.json. Please ensure the file exists and is properly configured.');
    }
    config = await res.json();
  }

  if (!config.domain || !config.clientId) {
    throw new Error('Invalid configuration: domain and clientId are required');
  }

  const auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: { redirect_uri: window.location.origin }
  });

  // Handle the redirect back from Auth0
  if (location.search.includes('code=') && location.search.includes('state=')) {
    await auth0Client.handleRedirectCallback();
    history.replaceState({}, document.title, '/');
  }

  const updateUI = async () => {
    try {
      const isAuth = await auth0Client.isAuthenticated();
      const userWrap = document.getElementById('user');
      const loginBtn = document.getElementById('btn-login');
      const logoutBtn = document.getElementById('btn-logout');

      if (isAuth) {
        const user = await auth0Client.getUser();
        userWrap.style.display = 'block';
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';

        // Populate profile info
        document.getElementById('avatar').src = user.picture || '';
        document.getElementById('name').textContent = user.name || 'N/A';
        document.getElementById('email').textContent = user.email || 'N/A';
        document.getElementById('nickname').textContent = user.nickname || 'N/A';
        document.getElementById('email-verified').textContent = user.email_verified ? 'Yes' : 'No';
        document.getElementById('updated-at').textContent = new Date(user.updated_at).toLocaleString();
        document.getElementById('sub').textContent = user.sub || 'N/A';
      } else {
        userWrap.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
      }
    } catch (error) {
      console.error('Error updating UI:', error);
      alert('An error occurred while loading the user interface. Please check the console for details.');
    }
  };

  document.getElementById('btn-login').addEventListener('click', async () => {
    try {
      await auth0Client.loginWithRedirect();
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  });

  document.getElementById('btn-logout').addEventListener('click', () => {
    try {
      auth0Client.logout({ logoutParams: { returnTo: window.location.origin } });
    } catch (error) {
      console.error('Logout error:', error);
    }
  });

  await updateUI();
} catch (error) {
  console.error('Initialization error:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif; background: #f0f0f0; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div>
        <h1 style="color: #d32f2f;">Configuration Error</h1>
        <p style="color: #666;">${error.message}</p>
        <p style="color: #666;">Please check your <code>auth_config.json</code> file and ensure it's properly configured.</p>
      </div>
    </div>
  `;
}