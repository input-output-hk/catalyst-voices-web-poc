module.exports = {
  routes: [
    {
      method: "POST",
      path: "/blockfrost/transactions",
      handler: "blockfrost.transactions",
      config: {
        auth: false,
      },
    },
  ],
};
