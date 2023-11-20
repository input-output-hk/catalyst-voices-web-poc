const expect = require('chai').expect;
const faker = require('../../../config/data/faker').Faker;
const helper = require('../../../api_support/helpers');
const dreps = require('../../../api_support/api').Dreps;
const voters = require('../../../api_support/api').Voters;
const delegations = require('../../../api_support/api').Delegations;
const settings = require('../../../api_support/api').Settings;

var testContext = {
    delegation: faker.delegation(),
    delegationId: null
};

before(async () => {
    await settings.createSetting(faker.setting())
        .catch((error) => {helper.assertNoError(error)});
    await dreps.build();
    await voters.build();
    await delegations.build();

    await dreps.register(faker.drep())
        .then((response) => testContext.delegation.drep_id = helper.getEntityId(response));
    await voters.register(faker.voter())
        .then((response) => testContext.delegation.voter_id = helper.getVoterId(response));

    await delegations.create(testContext.delegation)
        .then((response) => {
            testContext.delegationId = helper.getEntityId(response);
        })
    .catch((error) => {helper.assertNoError(error)});
})

describe('Delegetions API tests', () => {

    it('Create delegation test.', async () => {
        var delegation = faker.delegation();
        await dreps.register(faker.drep())
            .then((response) => delegation.drep_id = helper.getEntityId(response));
        await voters.register(faker.voter())
            .then((response) => delegation.voter_id = helper.getVoterId(response));

        await delegations.create(delegation)
            .then((response) => {
                expect(response).to.be.a.validDelegation(delegation);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Create delegation negative test. Voter and dRep doesn\'t exist', async () => {
        await delegations.create(testContext.delegation)
            .catch((error) => {
                expect(error.response).to.a.haveInvalidFields("voter_id", "drep_id");
            });
    });

    it('Update delegation test.', async () => {
        await delegations.update(testContext.delegationId, testContext.delegation)
            .then((response) => {
                expect(response).to.be.a.validDelegation(testContext.delegation);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get all delegations test.', async () => {
        await delegations.getAll()
            .then((response) => {
                expect(response).to.be.a.listOfDelegations();
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get single delegation test.', async () => {
        await delegations.getSingle(testContext.delegationId)
            .then((response) => {
                expect(response).to.be.a.validDelegation(testContext.delegation);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Delete delegation test.', async () => {
        await delegations.delete(testContext.delegationId)
            .then((response) => {
                expect(response).to.be.a.validDelegation(testContext.delegation);
            })
        .catch((error) => {helper.assertNoError(error)});
    });
});