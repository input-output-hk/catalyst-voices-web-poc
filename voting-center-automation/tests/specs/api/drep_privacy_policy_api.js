const expect = require('chai').expect;
const faker = require('../../../config/data/faker').Faker;
const helper = require('../../../api_support/helpers');
const dreps = require('../../../api_support/api').Dreps;
const privacyPolicies = require('../../../api_support/api').PrivacyPolicies;
const drepPrivacyPolicies = require('../../../api_support/api').DrepPrivacyPolicies;
const settings = require('../../../api_support/api').Settings;

var testContext = {
    drepPrivacyPolicy: faker.drepPrivacyPolicy(),
    drepPrivacyPolicyId: null
};

before(async () => {
    await settings.createSetting(faker.setting())
        .catch((error) => {helper.assertNoError(error)});
    await dreps.build();
    await privacyPolicies.build();
    await drepPrivacyPolicies.build();

    await dreps.register(faker.drep())
        .then((response) => testContext.drepPrivacyPolicy.drep_id = helper.getEntityId(response));
    await privacyPolicies.create(faker.privacyPolicy())
        .then((response) => testContext.drepPrivacyPolicy.privacy_policy_id = helper.getEntityId(response));

    await drepPrivacyPolicies.create(testContext.drepPrivacyPolicy)
        .then((response) => {
            testContext.drepPrivacyPolicyId = helper.getEntityId(response);
        })
    .catch((error) => {helper.assertNoError(error)});
})

describe('dRep privacy policy API tests', () => {

    it('Create dRep privacy policy.', async () => {
        var drepPrivacyPolicy = faker.drepPrivacyPolicy();
        await dreps.register(faker.drep())
            .then((response) => drepPrivacyPolicy.drep_id = helper.getEntityId(response));
        await privacyPolicies.create(faker.privacyPolicy())
            .then((response) => drepPrivacyPolicy.privacy_policy_id = helper.getEntityId(response));

        await drepPrivacyPolicies.create(drepPrivacyPolicy)
            .then((response) => {
                expect(response).to.be.a.validDrepPrivacyPolicy(drepPrivacyPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Update dRep privacy policy.', async () => {
        await drepPrivacyPolicies.update(testContext.drepPrivacyPolicyId, testContext.drepPrivacyPolicy)
            .then((response) => {
                expect(response).to.be.a.validDrepPrivacyPolicy(testContext.drepPrivacyPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get all dRep privacy policies test.', async () => {
        await drepPrivacyPolicies.getAll()
            .then((response) => {
                expect(response).to.be.a.listOfDrepPrivacyPolicies();
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get single dRep privacy policy test.', async () => {
        await drepPrivacyPolicies.getSingle(testContext.drepPrivacyPolicyId)
            .then((response) => {
                expect(response).to.be.a.validDrepPrivacyPolicy(testContext.drepPrivacyPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Delete dRep privacy policy test.', async () => {
        await drepPrivacyPolicies.delete(testContext.drepPrivacyPolicyId)
            .then((response) => {
                expect(response).to.be.a.validDrepPrivacyPolicy(testContext.drepPrivacyPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });
});