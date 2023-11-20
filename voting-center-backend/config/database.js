const path = require("path");
const fs = require("fs");

function getSSL() {
  if (process.env.hasOwnProperty("DATABASE_SSL")) {
    return process.env["DATABASE_SSL"] === "true";
  }
  if (process.env.hasOwnProperty("DATABASE_SSL_SELF")) {
    return {
      rejectUnauthorized: process.env["DATABASE_SSL_SELF"] === "true",
    };
  }
  if (process.env.hasOwnProperty("DATABASE_SSL_CA_PATH")) {
    ca = fs.readFileSync(process.env["DATABASE_SSL_CA_PATH"]);
    return {
      ca,
      // TODO: fix me
      // [2022-08-22 11:44:07.211] error: unable to get issuer certificate
      // Error: unable to get issuer certificate
      //     at TLSSocket.onConnectSecure (node:_tls_wrap:1532:34)
      //     at TLSSocket.emit (node:events:527:28)
      //     at TLSSocket.emit (node:domain:475:12)
      //     at TLSSocket._finishInit (node:_tls_wrap:946:8)
      //     at TLSWrap.ssl.onhandshakedone (node:_tls_wrap:727:12)
      rejectUnauthorized: false
    };
  }
  return false;
}

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST"),
      port: env.int("DATABASE_PORT"),
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USERNAME"),
      password: env("DATABASE_PASSWORD", "postgres"),
      ssl: getSSL(),
    },
  },
});
