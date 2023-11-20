const expect = require('chai').expect;
const faker = require('../../../config/data/faker').Faker;
const helper = require('../../../api_support/helpers');
const dreps = require('../../../api_support/api').Dreps;
const settings = require('../../../api_support/api').Settings;
const contextDrep = faker.drep();

var testContext = {
    drep: contextDrep,
    drepId: null
};

before(async () => {
    await settings.createSetting(faker.setting())
        .catch((error) => {helper.assertNoError(error)});
    await dreps.build();
    await dreps.register(testContext.drep)
        .then((response) => {
            testContext.drepId = helper.getEntityId(response);
        })
        .catch((error) => {helper.assertNoError(error);});
})

describe('Dreps API tests', () => {
    
    it('Register drep test.', async () => {
        var drep = faker.drep();
        await dreps.register(drep)
            .then((response) => {
                expect(response).to.be.a.validDrep(drep);
            })
            .catch((error) => {helper.assertNoError(error);});
    });

    it('Register drep negative test. Public voting key and Username should be unique', async () => {
        await dreps.register(testContext.drep)
            .catch((error) => {
                expect(error.response).to.a.haveInvalidFields("voting_key", "username");
            });
    });

    it('Update drep test.', async () => {
        var drep = faker.drep();
        var drepId;
        await dreps.register(drep)
            .then((response) => {
                drepId = helper.getEntityId(response);
                expect(response).to.be.a.validDrep(drep);
            })
            .catch((error) => {helper.assertNoError(error);});

        await dreps.update(drepId, drep)
            .then((response) => {
                expect(response).to.be.a.validDrep(drep);
            })
            .catch((error) => {helper.assertNoError(error);});
    });

    it('Get all dReps test.', async () => {
        await dreps.getAll()
            .then((response) => {
                expect(response).to.be.a.listOfDreps();
            })
        .catch((error) => {helper.assertNoError(error);});
    });

    it('Get drep by id test.', async () => {
        await dreps.getSingle(testContext.drepId)
            .then((response) => {
                expect(response).to.be.a.validDrep(testContext.drep);
            })
        .catch((error) => {helper.assertNoError(error);});
    });

    it('Get drep by username test.', async () => {
        await dreps.getSingle(contextDrep.username)
            .then((response) => {
                expect(response).to.be.a.validDrep(contextDrep);
            })
        .catch((error) => {helper.assertNoError(error);});
    });

    it('Get drep by public voting key test.', async () => {
        await dreps.getSingle(contextDrep.voting_key)
            .then((response) => {
                expect(response).to.be.a.validDrep(contextDrep);
            })
        .catch((error) => {helper.assertNoError(error);});
    });

    it('Delete drep test.', async () => {
        await dreps.delete(testContext.drepId)
            .then((response) => {
                expect(response).to.be.a.validDrep(testContext.drep);
            })
        .catch((error) => {helper.assertNoError(error);});
    });
});