// Vercel Serverless function that returns Auth0 config from environment variables
module.exports = (req, res) => {
  const domain = process.env.AUTH0_DOMAIN || process.env.auth0_domain || '';
  const clientId = process.env.AUTH0_CLIENT_ID || process.env.auth0_client_id || '';
  const ok = Boolean(domain && clientId);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ ok, domain, clientId, message: ok ? 'ok' : 'Missing AUTH0_DOMAIN or AUTH0_CLIENT_ID in environment' }));
};
