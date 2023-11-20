const fetchTransaction = async (txs) => {
  const res = await fetch(`${process.env.BLOCKFROST_URL}v0/txs/${txs}`, {
    headers: {
      project_id: process.env.BLOCKFROST_KEY,
    },
  });
  const transaction = await res.json();
  return transaction;
};

const updateTransaction = async (strapi, txs, transactionStatus) => {
  const { results: transaction } = await strapi
    .service("api::transaction.transaction")
    .find({
      filters: {
        transaction_hash: txs,
      },
    });
  
  if (transaction[0].is_successful !== true) {
    const { data: updatedTransaction } = await strapi
      .service("api::transaction.transaction")
      .update(transaction[0].id, {
        data: {
          is_successful: transactionStatus,
        },
      });

    return updatedTransaction ? updatedTransaction : null;
  }
};

module.exports = {
  fetchTransaction,
  updateTransaction,
};
