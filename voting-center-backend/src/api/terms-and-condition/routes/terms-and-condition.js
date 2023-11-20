"use strict";

/**
 * terms-and-condition router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter(
  "api::terms-and-condition.terms-and-condition",
  {
    config: {
      find: {
        auth: false,
      },
      findOne: {
        auth: false,
      },
      count: {
        auth: false,
      },
      search: {
        auth: false,
      },
      create: {
        auth: false,
      },
      update: {
        auth: false,
      },
      delete: {
        auth: false,
      },
    },
  }
);
