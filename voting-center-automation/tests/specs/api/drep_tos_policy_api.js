const expect = require('chai').expect;
const faker = require('../../../config/data/faker').Faker;
const helper = require('../../../api_support/helpers');
const dreps = require('../../../api_support/api').Dreps;
const termsAndConditions = require('../../../api_support/api').TermsAndConditions;
const drepTosPolicies = require('../../../api_support/api').DrepTosPolicies;
const settings = require('../../../api_support/api').Settings;

var testContext = {
    drepTosPolicy: faker.drepTosPolicy(),
    drepTosPolicyId: null
};

before(async () => {
    await settings.createSetting(faker.setting())
        .catch((error) => {helper.assertNoError(error)});
    await dreps.build();
    await termsAndConditions.build();
    await drepTosPolicies.build();

    await dreps.register(faker.drep())
        .then((response) => testContext.drepTosPolicy.drep_id = helper.getEntityId(response));
    await termsAndConditions.create(faker.termsAndConditions())
        .then((response) => testContext.drepTosPolicy.tos_id = helper.getEntityId(response));

    await drepTosPolicies.create(testContext.drepTosPolicy)
        .then((response) => {
            testContext.drepTosPolicyId = helper.getEntityId(response)
        })
    .catch((error) => {helper.assertNoError(error)});
})

describe('dRep tos API tests', () => {
    
    it('Create dRep tos policy.', async () => {
        var drepTosPolicy = faker.drepTosPolicy();
        await dreps.register(faker.drep())
            .then((response) => drepTosPolicy.drep_id = helper.getEntityId(response));
        await termsAndConditions.create(faker.termsAndConditions())
            .then((response) => drepTosPolicy.tos_id = helper.getEntityId(response));

        await drepTosPolicies.create(drepTosPolicy)
            .then((response) => {
                expect(response).to.be.a.validDrepTosPolicy(drepTosPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Update dRep tos policy policy.', async () => {
        await drepTosPolicies.update(testContext.drepTosPolicyId, testContext.drepTosPolicy)
            .then((response) => {
                expect(response).to.be.a.validDrepTosPolicy(testContext.drepTosPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get all dRep tos policy test.', async () => {
        await drepTosPolicies.getAll()
            .then((response) => {
                expect(response).to.be.a.listOfDrepTosPolicies();
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get single dRep tos policy test.', async () => {
        await drepTosPolicies.getSingle(testContext.drepTosPolicyId)
            .then((response) => {
                expect(response).to.be.a.validDrepTosPolicy(testContext.drepTosPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Delete dRep tos policy test.', async () => {
        await drepTosPolicies.delete(testContext.drepTosPolicyId)
            .then((response) => {
                expect(response).to.be.a.validDrepTosPolicy(testContext.drepTosPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });
});