module.exports = ({ env }) => ({
  migrations: {
    enabled: true,
    config: {
      autoStart: true,
      migrationFolderPath: "database/migrations",
    },
  },
  sentry: {
    enabled: true,
    config: {
      dsn: env("SENTRY_DSN")
    },
  }
});
