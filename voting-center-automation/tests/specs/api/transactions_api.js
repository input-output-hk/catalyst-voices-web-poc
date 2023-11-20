const expect = require('chai').expect;
const faker = require('../../../config/data/faker').Faker;
const helper = require('../../../api_support/helpers');
const transactions = require('../../../api_support/api').Transactions;

var testContext = {
    transaction: faker.transaction(),
    transactionId: null
};

before(async () => {
    await transactions.build();
    await transactions.create(testContext.transaction)
        .then((response) => {
            testContext.transactionId = helper.getEntityId(response);
        })
    .catch((error) => {helper.assertNoError(error)});
})

describe('Transactions API tests', () => {

    it('Create transaction test.', async () => {
        var transaction = faker.transaction();
        await transactions.create(transaction)
            .then((response) => {
                expect(response).to.be.a.validTransaction(transaction);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Update transaction test.', async () => {
        await transactions.update(testContext.transactionId, testContext.transaction)
            .then((response) => {
                expect(response).to.be.a.validTransaction(testContext.transaction);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get all transaction test.', async () => {
        await transactions.getAll()
            .then((response) => {
                expect(response).to.be.a.listOfTransactions();
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Get single transaction test.', async () => {
        await transactions.getSingle(testContext.transactionId)
            .then((response) => {
                expect(response).to.be.a.validTransaction(testContext.transaction);
            })
        .catch((error) => {helper.assertNoError(error)});
    });

    it('Delete transaction test.', async () => {
        await transactions.delete(testContext.transactionId)
            .then((response) => {
                expect(response).to.be.a.validTransaction(testContext.transaction);
            })
        .catch((error) => {helper.assertNoError(error)});
    });
});