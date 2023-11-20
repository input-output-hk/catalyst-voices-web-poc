const expect = require('chai').expect;
const faker = require('../../../config/data/faker').Faker;
const helper = require('../../../api_support/helpers');
const termsAndConditions = require('../../../api_support/api').TermsAndConditions;

var testContext = {
    termsAndConditions: faker.termsAndConditions(),
    termsAndConditionsId: null,
    termsAndConditionsName: null
};

before(async () => {
    await termsAndConditions.build();
    await termsAndConditions.create(testContext.termsAndConditions)
        .then((response) => {
            testContext.termsAndConditionsId = helper.getEntityId(response);
            testContext.termsAndConditionsName = helper.getTermsAndConditionsName(response)
        })
    .catch((error) => {helper.assertNoError(error)});
})

describe('terms and conditions API tests', () => {

    it('Create terms and conditions test.', async () => {
        var termAndCondition = faker.termsAndConditions();
        await termsAndConditions.create(termAndCondition)
            .then((response) => {
                expect(response).to.be.a.validTermsAndConditions(termAndCondition);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Create terms and conditions negative test. Name should be unique', async () => {
        await termsAndConditions.create(testContext.termsAndConditions)
            .catch((error) => {
                expect(error.response).to.a.haveInvalidFields("terms_and_conditions");
            });
    });

    it('Update terms and conditions test.', async () => {
        await termsAndConditions.update(testContext.termsAndConditionsId, testContext.termsAndConditions)
            .then((response) => {
                expect(response).to.be.a.validTermsAndConditions(testContext.termsAndConditions);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get all terms and conditions test.', async () => {
        await termsAndConditions.getAll()
            .then((response) => {
                expect(response).to.be.a.listOfTermsAndConditions();
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get single terms and conditions test.', async () => {
        await termsAndConditions.getSingle(testContext.termsAndConditionsId)
            .then((response) => {
                expect(response).to.be.a.validTermsAndConditions(testContext.termsAndConditions);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Delete terms and conditions test.', async () => {
        await termsAndConditions.delete(testContext.termsAndConditionsId)
            .then((response) => {
                expect(response).to.be.a.validTermsAndConditions(testContext.termsAndConditions);
            })
        .catch((error) => {helper.assertNoError(error)});
    });
});