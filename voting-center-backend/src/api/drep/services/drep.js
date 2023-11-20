"use strict";

/**
 * drep service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::drep.drep");
