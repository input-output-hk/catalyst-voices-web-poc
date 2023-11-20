const cbor = require("cbor");

module.exports = {
  async decoder(ctx) {
    const { string } = ctx.request.body;
    const decoded = cbor.decodeAll(string);
    return decoded;
  },
};
