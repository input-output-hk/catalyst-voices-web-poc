"use strict";

/**
 *  drep-tos-policy controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::drep-tos-policy.drep-tos-policy",
  ({ strapi }) => ({
    async create(ctx) {
      const { data } = ctx.request.body;

      const drep = await strapi.entityService.findOne(
        "api::drep.drep",
        data?.drep_id
      );

      if (drep) {
        const tos = await strapi.entityService.findOne(
          "api::terms-and-condition.terms-and-condition",
          data?.tos_id
        );

        if (tos) {
          const entry = await strapi.entityService.create(
            "api::drep-tos-policy.drep-tos-policy",
            {
              data: {
                ...data,
              },
            }
          );
          return this.transformResponse(entry);
        } else {
          ctx.status = 400;
          ctx.body =
            "The terms and condition under this tos_id does not exist.";
        }
      } else {
        ctx.status = 400;
        ctx.body = "The dRep under this drep_id does not exist.";
      }
    },
  })
);
