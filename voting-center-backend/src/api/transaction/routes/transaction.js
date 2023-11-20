"use strict";

/**
 * transaction router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::transaction.transaction", {
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
});
