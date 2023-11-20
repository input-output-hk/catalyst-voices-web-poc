"use strict";

/**
 *  drep-privacy-policy controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::drep-privacy-policy.drep-privacy-policy",
  ({ strapi }) => ({
    async create(ctx) {
      const { data } = ctx.request.body;

      const drep = await strapi.entityService.findOne(
        "api::drep.drep",
        data?.drep_id
      );

      if (drep) {
        const privacyPolicy = await strapi.entityService.findOne(
          "api::privacy-policy.privacy-policy",
          data?.privacy_policy_id
        );

        if (privacyPolicy) {
          const entry = await strapi.entityService.create(
            "api::drep-privacy-policy.drep-privacy-policy",
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
            "The privacy policy under this privacy_policy_id does not exist.";
        }
      } else {
        ctx.status = 400;
        ctx.body = "The dRep under this drep_id does not exist.";
      }
    },
  })
);
