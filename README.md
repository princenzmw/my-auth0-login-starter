
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
   git clone https://github.com/your-username/auth0-login-starter.git
   cd auth0-login-starter
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
├── index.html          # Main HTML with favicon
├── styles.css          # Modern CSS with accessibility
├── script.js           # Robust JS with error handling
├── auth_config.json    # User config (ignored by git)
├── auth_config.example.json  # Template config
├── package.json        # Enhanced metadata
├── README.md           # Comprehensive docs
├── LICENSE             # MIT license
├── favicon.svg         # Custom favicon
└── .gitignore          # Clean exclusions
```

## Configuration Details

Ensure your Auth0 application is configured with:
- **Allowed Callback URLs**: `http://localhost:3000`
- **Allowed Logout URLs**: `http://localhost:3000`
- **Allowed Web Origins**: `http://localhost:3000`

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
