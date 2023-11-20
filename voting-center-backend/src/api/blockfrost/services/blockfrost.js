"use strict";

/**
 * voter router.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::voter.voter");
