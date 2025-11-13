try {
  let config = null;

  // Try runtime config from Vercel serverless endpoint first
  try {
    const resApi = await fetch('/api/config');
    if (resApi.ok) {
      const apiCfg = await resApi.json();
      if (apiCfg && apiCfg.domain && apiCfg.clientId) {
        config = apiCfg;
      }
    }
  } catch (e) {
    // ignore network errors and fall back
    console.debug('No /api/config endpoint available or request failed, falling back to local config.');
  }

  // If no runtime config, try window.AUTH_CONFIG (legacy) then local file
  const looksLikePlaceholder = (v) => {
    if (!v || typeof v !== 'string') return true;
    const lower = v.toLowerCase();
    // common placeholder patterns we used during development
    if (v.includes('__') || lower.includes('auth0_domain') || lower.includes('auth0_client') || v === 'AUTH0_DOMAIN' || v === 'AUTH0_CLIENT_ID') return true;
    // clearly invalid values
    if (v.trim() === '' || v.startsWith('__') || v === 'AUTH0_DOMAIN') return true;
    return false;
  };

  if (!config) {
    if (window.AUTH_CONFIG && !looksLikePlaceholder(window.AUTH_CONFIG.domain) && !looksLikePlaceholder(window.AUTH_CONFIG.clientId)) {
      config = window.AUTH_CONFIG;
    } else {
      const res = await fetch('/auth_config.json');
      if (!res.ok) {
        throw new Error('Failed to load auth_config.json. Please ensure the file exists and is properly configured.');
      }
      config = await res.json();
    }
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
        const avatarEl = document.getElementById('avatar');
        avatarEl.src = user.picture || '';
        avatarEl.alt = user.name || 'User avatar';
        document.getElementById('name').textContent = user.name || 'N/A';
        document.getElementById('email').textContent = user.email || 'N/A';
        document.getElementById('nickname').textContent = user.nickname || 'N/A';
        document.getElementById('email-verified').textContent = user.email_verified ? 'Yes' : 'No';
        document.getElementById('updated-at').textContent = new Date(user.updated_at).toLocaleString();
        document.getElementById('sub').textContent = user.sub || 'N/A';
        // Move focus to logout for accessibility
        logoutBtn.focus();
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
        <p style="color: #666;">If you're running on Vercel, ensure environment variables <code>AUTH0_DOMAIN</code> and <code>AUTH0_CLIENT_ID</code> are set, then redeploy. You can also check <code>/api/config</code> on your deployment.</p>
      </div>
    </div>
  `;
}