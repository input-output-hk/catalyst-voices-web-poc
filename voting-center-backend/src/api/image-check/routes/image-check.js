module.exports = {
  routes: [
    {
      method: "POST",
      path: "/image-check",
      handler: "image-check.check",
      config: {
        auth: false,
      },
    },
  ],
};
