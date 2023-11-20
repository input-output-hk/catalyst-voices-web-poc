"use strict";

/**
 * voter service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::voter.voter", ({ strapi }) => ({
  async find(...args) {
    const { results, pagination } = await super.find(...args);

    const transactions = await strapi.db
      .query("api::transaction.transaction")
      .findMany({
        select: ["id", "transaction_hash", "updatedAt"],
      });

    results.forEach((result) => {
      result.transactions = transactions.filter(
        ({ transaction_hash }) => transaction_hash === result.transaction_hash
      );
    });

    return { results, pagination };
  },
  async findOne(entityId, params = {}) {
    const results = await strapi.entityService.findOne(
      "api::voter.voter",
      entityId,
      this.getFetchParams(params)
    );

    const transactions = await strapi.db
      .query("api::transaction.transaction")
      .findMany({
        select: ["id", "transaction_hash", "updatedAt"],
        where: {
          transaction_hash: results?.transaction_hash,
        },
      });

    if (transactions.length < 1) {
      return strapi.entityService.findOne(
        "api::voter.voter",
        entityId,
        this.getFetchParams(params)
      );
    }

    results.transactions = transactions;
    return { ...results };
  },
}));
