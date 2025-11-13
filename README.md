
# Auth0 Login Starter (Vanilla JS)

A polished, framework-free sample that implements **Auth0 Universal Login** using the **Auth0 SPA SDK**. Features a modern UI with login/logout functionality and user profile display. Perfect for hackathons, demos, or as a starting point for Auth0 integrations.

## Features

- 🔐 **Secure Authentication**: Auth0 Universal Login with redirect flow
- 🎨 **Modern UI**: Glassmorphism design with responsive layout
- 👤 **User Profile**: Display user information after login
- 🚀 **Easy Setup**: Minimal configuration required
- 📱 **Mobile Friendly**: Responsive design for all devices
- ⚡ **Fast**: No build process, runs directly in browser
- 🛡️ **Error Handling**: Graceful error messages for configuration issues

## Prerequisites

- **Node.js** (version 14 or higher) - for running the development server
- **Auth0 Account** - with a configured Single Page Application (SPA)
- Basic knowledge of JavaScript and web development

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/princenzmw/my-auth0-login-starter.git
   cd my-auth0-login-starter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Auth0:**
   - Copy the example config file:
     ```bash
     cp auth_config.example.json auth_config.json
     ```
   - Edit `auth_config.json` and add your Auth0 domain and client ID:
     ```json
     {
       "domain": "your-auth0-domain.auth0.com",
       "clientId": "your-client-id"
     }
     ```

## Running the Project

Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Usage

1. Open `http://localhost:3000` in your browser
2. Click "Log in" to authenticate with Auth0
3. After login, view your user profile information
4. Click "Log out" to end the session

## Project Structure
```
auth0-login-starter/
├── index.html                  # Main HTML with favicon
├── styles.css                  # CSS styles (accessibility + responsive)
├── script.js                   # JavaScript logic (Auth0 integration + UI)
├── api/
│   └── config.js               # Vercel serverless endpoint that exposes runtime config
├── auth_config.json            # Local config (ignored by git) — copy from example
├── auth_config.example.json    # Template config to copy for local development
├── package.json                # Project metadata & scripts
├── README.md                   # This file
├── LICENSE                     # MIT license
├── favicon.svg                 # SVG favicon
└── .gitignore                  # Files to ignore in git
```

## Configuration Details

Ensure your Auth0 application is configured with:
- **Allowed Callback URLs**: `http://localhost:3000`
- **Allowed Logout URLs**: `http://localhost:3000`
- **Allowed Web Origins**: `http://localhost:3000`

## Deployment

I deployed my app  so that I won't always need to run it on localhost. You can access it [here](https://auth0-login-ashy.vercel.app/). You can also do the same. Below is the example of hosting it using `Vercel`

### Vercel
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. In project settings, add environment variables:
   - `AUTH0_DOMAIN`: Your Auth0 domain (e.g., `your-app.auth0.com`)
   - `AUTH0_CLIENT_ID`: Your Auth0 client ID
5. Redeploy the project (go to deployments and redeploy)
6. Update your Auth0 application settings with the Vercel domain:
   - **Allowed Callback URLs**: `https://your-vercel-domain.vercel.app`
   - **Allowed Logout URLs**: `https://your-vercel-domain.vercel.app`
   - **Allowed Web Origins**: `https://your-vercel-domain.vercel.app`

### Verifying the runtime config (quick checks)

- After deployment, open this URL in your browser:

  `https://your-vercel-domain.vercel.app/api/config`

  You should see JSON like:

  ```json
  { "ok": true, "domain": "princenzmw.us.auth0.com", "clientId": "UG4q..." }
  ```

- If `ok` is false or `domain`/`clientId` are empty strings:
  - Confirm the environment variable names are EXACT (`AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`) and set for the correct environment (Production/Preview).
  - Redeploy the site (Vercel automatically re-deploys when env vars change, but you can manually redeploy).

- If `/api/config` returns the correct values but login still fails:
  - Check your Auth0 Application settings and ensure the Vercel domain is listed in **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**.
  - Inspect the browser console and network tab for requests to `/api/config` and the Auth0 authorize URL.

## Technologies Used

- **Auth0 SPA SDK** - For authentication
- **Vanilla JavaScript** - No frameworks
- **CSS** - Modern styling with CSS variables
- **HTML** - Semantic markup

## Author

[Prince NZAMUWE](https://github.com/princenzmw)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## References

- [Auth0 SPA SDK Documentation](https://github.com/auth0/auth0-spa-js)
- [Auth0 Vanilla JS Quickstart](https://dev.auth0.com/docs/quickstart/spa/vanillajs)
