const {
  fetchTransaction,
  updateTransaction,
} = require("../../../../config/cron-tasks/cron-utils");

module.exports = {
  async transactions(ctx) {
    try {
      let resolvedTransactions = [];
      const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      const { results: transactions } = await strapi
        .service("api::transaction.transaction")
        .find({
          filters: {
            createdAt: {
              $lte: new Date().toISOString(),
              $gte: new Date(yesterday).toISOString(),
            },
          },
        });

      if (transactions.length > 0) {
        for (const { transaction_hash } of transactions) {
          try {
            const transaction = await fetchTransaction(transaction_hash);
            if (!transaction.error) {
              const data = await updateTransaction(
                strapi,
                transaction_hash,
                true
              );
              resolvedTransactions.push(data);
            } else {
              await updateTransaction(strapi, transaction_hash, false);
            }
          } catch (err) {
            throw new Error(err);
          }
        }
      }

      ctx.status = 200;
    } catch (err) {
      ctx.status = 500;
      throw new Error(err);
    }
  },
};
