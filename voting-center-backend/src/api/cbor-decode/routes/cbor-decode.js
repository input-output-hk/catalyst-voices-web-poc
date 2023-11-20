module.exports = {
  routes: [
    {
      method: "POST",
      path: "/cbor-decode",
      handler: "cbor-decode.decoder",
      config: {
        auth: false,
      },
    },
  ],
};
