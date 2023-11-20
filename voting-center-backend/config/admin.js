module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  //url: `${env("PUBLIC_URL")}/admin`,
  watchIgnoreFiles: [
      '**/config/sync/**',
    ]
});
