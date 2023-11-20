"use strict";
const { createCoreController } = require("@strapi/strapi").factories;
const { getMetrics } = require("../../../utils");

module.exports = createCoreController("api::voter.voter", ({ strapi }) => ({
  async create(ctx) {
    const { transaction_hash, transaction_metadata, ...voterData } =
      ctx.request.body;

    const voter = await strapi.entityService.create("api::voter.voter", {
      data: {
        ...voterData,
        is_disconnected: false,
        transaction_hash,
      },
    });

    const transaction = await strapi.entityService.create(
      "api::transaction.transaction",
      {
        data: {
          transaction_hash,
          transaction_metadata,
          is_successful: null,
        },
      }
    );

    return { voter, transaction };
  },
  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);
    const metrics = await getMetrics(data?.attributes.voting_key);
    if (metrics) {
      const { voter_info, ...otherAttributes } = metrics;
      const serilizedData = {
        ...data,
        attributes: {
          ...data?.attributes,
          voter_info: {
            ...voter_info,
            ...otherAttributes,
          },
        },
      };
      return serilizedData;
    } else {
      const serilizedData = {
        ...data,
        attributes: {
          ...data?.attributes,
          voter_info: null,
        },
      };
      return serilizedData;
    }
  },
}));
