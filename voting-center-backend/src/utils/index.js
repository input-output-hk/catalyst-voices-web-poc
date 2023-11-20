const axios = require("axios");

const getMetrics = async (voting_key) => {
  try {
    const { data } = await axios(
      `${process.env.CATALYST_CORE_API_URL}/api/v1/registration/voter/0x${voting_key}`
    );
    return data;
  } catch (error) {
    return null;
  }
};

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

module.exports = { getMetrics, capitalizeFirstLetter };
