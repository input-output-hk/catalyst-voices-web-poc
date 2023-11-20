"use strict";

/**
 * setting router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::setting.setting", {
  config: {
    find: {
      auth: false,
    },
    update: {
      auth: false,
    },
  },
});
