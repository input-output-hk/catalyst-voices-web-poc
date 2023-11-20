"use strict";

/**
 *  delegation controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::delegation.delegation",
  ({ strapi }) => ({
    async create(ctx) {
      const { data } = ctx.request.body;

      const drep = await strapi.entityService.findOne(
        "api::drep.drep",
        data?.drep_id
      );

      if (drep) {
        const voter = await strapi.entityService.findOne(
          "api::voter.voter",
          data?.voter_id
        );

        if (voter) {
          const entry = await strapi.entityService.create(
            "api::delegation.delegation",
            {
              data: {
                ...data,
              },
            }
          );
          return this.transformResponse(entry);
        } else {
          ctx.status = 400;
          ctx.body = "The voter under this voter_id does not exist.";
        }
      } else {
        ctx.status = 400;
        ctx.body = "The dRep under this drep_id does not exist.";
      }
    },
  })
);
