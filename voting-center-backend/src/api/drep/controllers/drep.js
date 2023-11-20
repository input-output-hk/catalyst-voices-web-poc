"use strict";
const { getMetrics, capitalizeFirstLetter } = require("../../../utils/index");
const Filter = require("bad-words");
const CryptoJS = require("crypto-js");
const filter = new Filter();

//const { getMetrics } = require("../../../utils");
const { createCoreController } = require("@strapi/strapi").factories;

const onlyNumbers = (str) => /^[0-9]+$/.test(str);
const onlyEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const secretKey = process.env.API_TOKEN_SALT.toString(CryptoJS.enc.Utf8);

const getVoterWalletAddress = async (strapi, key) => {
  const { results: voter } = await strapi.service("api::voter.voter").find({
    filters: {
      voting_key: {
        $eq: key,
      },
    },
  });

  return voter[0]?.wallet_address;
};

const checkTypeOfParams = (data, isEmail, query) => {
  if (isEmail) {
    return {
      ...query,
      filters: {
        is_approved: true,
        email: data,
        ...query.filters,
      },
    };
  } else {
    if (data.length < 60) {
      return {
        ...query,
        filters: {
          is_approved: true,
          username: data,
          ...query.filters,
        },
      };
    } else {
      return {
        ...query,
        filters: {
          voting_key: data,
          ...query.filters,
        },
      };
    }
  }
};

module.exports = createCoreController("api::drep.drep", ({ strapi }) => ({
  async find(ctx) {
    const customQuery = {
      ...ctx.query,
      filters: {
        is_approved: true,
        ...ctx.query.filters,
      },
    };

    ctx.query = customQuery;

    let { data, meta } = await super.find(ctx);

    data.forEach((entity) => {
      const fieldValue = entity?.attributes?.email.toString();
      entity.attributes.email = CryptoJS.AES.decrypt(
        fieldValue,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
    });

    return { data, meta };
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    if (!onlyNumbers(id)) {
      let customQuery = checkTypeOfParams(id, onlyEmail(id), ctx.query);
      ctx.query = customQuery;
      const { data, meta } = await super.find(ctx);
      const wallet_address = await getVoterWalletAddress(
        strapi,
        data[0]?.attributes.voting_key
      );
      const metrics = await getMetrics(data[0]?.attributes.voting_key);

      if (data.length < 1) {
        return ctx.notFound();
      }

      const fieldValue = data[0]?.attributes?.email.toString();
      const decryptedEmail = CryptoJS.AES.decrypt(
        fieldValue,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
      if (metrics) {
        const { voter_info, ...otherAttributes } = metrics;

        const serilizedData = {
          data: {
            ...data[0],
            attributes: {
              ...data[0]?.attributes,
              email: decryptedEmail,
              wallet_address,
              voter_info: {
                ...voter_info,
                ...otherAttributes,
              },
            },
          },
        };

        return serilizedData;
      } else {
        const serilizedData = {
          data: {
            ...data[0],
            attributes: {
              ...data[0]?.attributes,
              email: decryptedEmail,
              wallet_address,
              voter_info: null,
            },
          },
        };

        return serilizedData;
      }
    } else {
      const { query } = ctx;
      const entity = await strapi.service("api::drep.drep").findOne(id, query);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      const wallet_address = await getVoterWalletAddress(
        strapi,
        sanitizedEntity?.voting_key
      );

      const metrics = await getMetrics(sanitizedEntity?.voting_key);

      if (!sanitizedEntity) {
        return this.transformResponse(sanitizedEntity);
      }

      if (metrics) {
        const { voter_info, ...otherAttributes } = metrics;

        return this.transformResponse({
          ...sanitizedEntity,
          wallet_address,
          voter_info: {
            ...voter_info,
            ...otherAttributes,
          },
        });
      } else {
        return this.transformResponse({
          ...sanitizedEntity,
          wallet_address,
          voter_info: null,
        });
      }
    }
  },
  async create(ctx) {
    const { data } = ctx.request.body;
    let { email, ...drepData } = data;

    const { dRep_registration_open, is_drep_approval_automated } =
      await strapi.entityService.findMany("api::setting.setting");

    if (dRep_registration_open === true) {
      const encryptedEmailValue = CryptoJS.AES.encrypt(
        email.toString(),
        secretKey
      ).toString();

      let drep;
      if (is_drep_approval_automated !== true) {
        drep = await strapi.entityService.create("api::drep.drep", {
          data: {
            ...drepData,
            name: capitalizeFirstLetter(drepData?.name),
            email: encryptedEmailValue,
            is_approved: false,
          },
        });
      } else {
        if (
          (drepData?.profile_bio
            ? drepData?.profile_bio === filter.clean(drepData?.profile_bio)
              ? true
              : false
            : true) &&
          (drepData?.contribution
            ? drepData?.contribution === filter.clean(drepData?.contribution)
              ? true
              : false
            : true) &&
          (drepData?.headline
            ? drepData?.headline === filter.clean(drepData?.headline)
              ? true
              : false
            : true) &&
          (drepData?.name
            ? drepData?.name === filter.clean(drepData?.name)
              ? true
              : false
            : true) &&
          (drepData?.username
            ? drepData?.username === filter.clean(drepData?.username)
              ? true
              : false
            : true)
        ) {
          drep = await strapi.entityService.create("api::drep.drep", {
            data: {
              ...drepData,
              name: capitalizeFirstLetter(drepData?.name),
              email: encryptedEmailValue,
              is_approved: true,
            },
          });
        } else {
          ctx.status = 451;
          ctx.body = "Unavailable For Legal Reasons.";
          return {
            error: "Unavailable For Legal Reasons.",
          };
        }
      }
      if (drep) {
        let drepAttributes = Object.keys(drep)
          .filter((key) => key !== "id")
          .reduce((obj, key) => {
            obj[key] = drep[key];
            return obj;
          }, {});

        const drepRes = {
          data: {
            id: drep.id,
            attributes: drepAttributes,
          },
        };

        return drepRes;
      }
    } else {
      return ctx.send({ message: "Registration is closed" }, 405);
    }
  },
  async update(ctx) {
    const { id } = ctx?.params;
    const requestBody = ctx?.request?.body?.data;
    const { voter_info, email, ...requestBodyAttributes } = requestBody;
    const encryptedEmailValue = CryptoJS.AES.encrypt(
      email.toString(),
      secretKey
    ).toString();

    const updatedDrep = await strapi.entityService.update(
      "api::drep.drep",
      id,
      {
        data: {
          ...requestBodyAttributes,
          name: capitalizeFirstLetter(requestBodyAttributes?.name),
          email: encryptedEmailValue,
        },
      }
    );

    const { email: updatedEmail, ...otherAttributes } = updatedDrep;

    const newEmail = CryptoJS.AES.decrypt(updatedEmail, secretKey).toString(
      CryptoJS.enc.Utf8
    );

    return this.transformResponse({ email: newEmail, ...otherAttributes });
  },
}));
