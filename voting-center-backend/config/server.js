const tasks = require("./cron-tasks/tasks");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("NOMAD_ALLOC_PORT_api", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  url: env("PUBLIC_URL"),
  cron: {
    enabled: true,
    tasks,
  },
});
