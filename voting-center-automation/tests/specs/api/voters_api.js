const expect = require('chai').expect;
const faker = require('../../../config/data/faker').Faker;
const helper = require('../../../api_support/helpers');
const voters = require('../../../api_support/api').Voters;
const settings = require('../../../api_support/api').Settings;

var testContext = {
    voter: faker.voter(),
    voterId: null
};

before(async () => {
    await settings.createSetting(faker.setting())
        .catch((error) => {helper.assertNoError(error)});
    await voters.build();
    await voters.register(testContext.voter)
        .then((response) => {
            testContext.voterId = helper.getVoterId(response);
        })
    .catch((error) => {helper.assertNoError(error)});
})

describe('voters API tests', () => {
    
    it('Register voter test.', async () => {
        var voter = faker.voter();
        await voters.register(voter)
            .then((response) => {
                expect(response).to.be.a.validVoter(voter);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Register voter negative test. Public wallet address, voting key should be unique', async () => {
        await voters.register(testContext.voter)
            .catch((error) => {
                expect(error.response).to.a.haveInvalidFields("wallet_address", "voting_key");
            });
    });

    it('Update voter test.', async () => {
        await voters.update(testContext.voterId, testContext.voter)
            .then((response) => {
                expect(response).to.be.a.validVoter(testContext.voter);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get all voters test.', async () => {
        await voters.getAll()
            .then((response) => {
                expect(response).to.be.a.listOfVoters();
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get voter by id test.', async () => {
        await voters.getSingle(testContext.voterId)
            .then((response) => {
                expect(response).to.be.a.validVoter(testContext.voter);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Delete voter test.', async () => {
        await voters.delete(testContext.voterId)
            .then((response) => {
                expect(response).to.be.a.validVoter(testContext.voter);
            })
        .catch((error) => {helper.assertNoError(error)});
    });
});