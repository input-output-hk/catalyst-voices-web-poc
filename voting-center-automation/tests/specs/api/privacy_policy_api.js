const expect = require('chai').expect;
const faker = require('../../../config/data/faker').Faker;
const helper = require('../../../api_support/helpers');
const privacyPolicies = require('../../../api_support/api').PrivacyPolicies;

var testContext = {
    privacyPolicy: faker.privacyPolicy(),
    privacyPolicyId: null
};

before(async () => {
    await privacyPolicies.build();
    await privacyPolicies.create(testContext.privacyPolicy)
        .then((response) => {
            testContext.privacyPolicyId = helper.getEntityId(response);
        })
    .catch((error) => {helper.assertNoError(error)});
})

describe('Privac policy API tests', () => {

    it('Create privacy policy test.', async () => {
        var privacyPolicy = faker.privacyPolicy();
        await privacyPolicies.create(privacyPolicy)
            .then((response) => {
                expect(response).to.be.a.validPrivacyPolicy(privacyPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Create privacy policy negative test. Privacy policy should be unique', async () => {
        await privacyPolicies.create(testContext.privacyPolicy)
            .catch((error) => {
                expect(error.response).to.a.haveInvalidFields("privacy_policy");
            });
    });

    it('Update privacy policy test.', async () => {
        await privacyPolicies.update(testContext.privacyPolicyId, testContext.privacyPolicy)
            .then((response) => {
                expect(response).to.be.a.validPrivacyPolicy(testContext.privacyPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get all privacy policies test.', async () => {
        await privacyPolicies.getAll()
            .then((response) => {
                expect(response).to.be.a.listOfPrivacyPolices();
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get single privacy policy test.', async () => {
        await privacyPolicies.getSingle(testContext.privacyPolicyId)
            .then((response) => {
                expect(response).to.be.a.validPrivacyPolicy(testContext.privacyPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Delete privacy policy test.', async () => {
        await privacyPolicies.delete(testContext.privacyPolicyId)
            .then((response) => {
                expect(response).to.be.a.validPrivacyPolicy(testContext.privacyPolicy);
            })
        .catch((error) => {helper.assertNoError(error)});
    });
});