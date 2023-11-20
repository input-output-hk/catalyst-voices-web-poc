// 
// Custom expect helper
//

const chai = require('chai');
const constants = require('../config/data/constants');
const faker = require('../config/data/faker').Faker;
const expect = require('chai').expect;

let isArray = (a) => {
    return (!!a) && (a.constructor === Array);
};

let getRespAttributes = (objData) => {
    if(objData === undefined) return;
    if(isArray(objData)){
        return objData[0].attributes;
    }
    if(objData.hasOwnProperty('attributes')){
        return objData.attributes;
    }
    return objData;
}

let getErrorsPaths = (errors) => {
    let paths = [];
    errors.forEach(el => paths.push(el.path[0]));
    return paths;
}

var assertNoError = (error) => {
    const util = require('util');
    console.log(util.inspect(error));   
    console.log(util.inspect(error.response));   
    console.log(util.inspect(error.response.data.error.details));
    expect(true, error).to.equal(false);
};

var getEntityId = (response) => {
    return response.data.data.id;
}

var getVoterId = (response) => {
    return response.data.voter.id;
}

var getTermsAndConditionsName = (response) => {
    return response.data.data.attributes.name;
}

chai.use((_chai) => {

    _chai.Assertion.addMethod('validDrep', function(expected) {
        var obj = this._obj;
        var respAttributes = getRespAttributes(obj.data.data) ?? obj;
        this.assert(
            obj.status === 200,
            faker.drep().hasOwnProperty(respAttributes),
            respAttributes.voting_key === expected.voting_key,
            respAttributes.username === expected.username,
            respAttributes.email === expected.email
        )
    }); 

    _chai.Assertion.addMethod('validVoter', function(expected) {
        var obj = this._obj;
        var respAttributes = getRespAttributes(obj.data);
        this.assert(
            obj.status === 200,
            faker.voter().hasOwnProperty(respAttributes),
            respAttributes.voting_key === expected.voting_key,
            respAttributes.wallet_address === expected.wallet_address,
            respAttributes.is_passive === expected.is_passive,
            respAttributes.is_disconnected === expected.is_disconnected
        )
    });

    _chai.Assertion.addMethod('validDelegation', function(expected) {
        var obj = this._obj;
        var respAttributes = getRespAttributes(obj.data.data);
        this.assert(
            obj.status === 200,
            faker.delegation().hasOwnProperty(respAttributes),
            respAttributes.weight_percent === expected.weight_percent,
            respAttributes.createdAt !== null,
            respAttributes.updatedAt !== null,
            respAttributes.publishedAt !== null
        )
    });

    _chai.Assertion.addMethod('validTermsAndConditions', function(expected) {
        var obj = this._obj;
        var respAttributes = getRespAttributes(obj.data.data);
        this.assert(
            obj.status === 200,
            faker.termsAndConditions().hasOwnProperty(respAttributes),
            respAttributes.terms_and_conditions === expected.terms_and_conditions
        )
    });

    _chai.Assertion.addMethod('validPrivacyPolicy', function(expected) {
        var obj = this._obj;
        var respAttributes = getRespAttributes(obj.data.data);
        this.assert(
            obj.status === 200,
            faker.privacyPolicy().hasOwnProperty(respAttributes),
            respAttributes.privacy_policy === expected.privacy_policy
        )
    });

    _chai.Assertion.addMethod('validDrepPrivacyPolicy', function(expected) {
        var obj = this._obj;
        var respAttributes = getRespAttributes(obj.data.data);
        this.assert(
            obj.status === 200,
            faker.drepPrivacyPolicy().hasOwnProperty(respAttributes),
            new Date(respAttributes.accepted_at).toUTCString() === new Date(expected.accepted_at).toUTCString()
        )
    });

    _chai.Assertion.addMethod('validDrepTosPolicy', function(expected) {
        var obj = this._obj;
        var respAttributes = getRespAttributes(obj.data.data);
        this.assert(
            obj.status === 200,
            faker.drepTosPolicy().hasOwnProperty(respAttributes),
            new Date(respAttributes.accepted_at).toUTCString() === new Date(expected.accepted_at).toUTCString()
        )
    });

    _chai.Assertion.addMethod('validTransaction', function(expected) {
        var obj = this._obj;
        var respAttributes = getRespAttributes(obj.data.data);
        this.assert(
            obj.status === 200,
            faker.transaction().hasOwnProperty(respAttributes),
            respAttributes.transaction_hash === expected.transaction_hash,
            new Date(respAttributes.finalized_at).toUTCString() === new Date(expected.finalized_at).toUTCString()
        )
    });

    _chai.Assertion.addMethod('validUser', function(expected) {
        var obj = this._obj;
        var user = obj.data;
        this.assert(
            obj.status === 200,
            user.jwt !== null,
            user.username === expected.username,
            user.email === expected.email
        )
    });

    _chai.Assertion.addMethod('invalidUser', function(expected) {
        var obj = this._obj;
        var error = obj.data.error;
        this.assert(
            obj.status === 500,
            error.name === constants.messages.validationError,
            error.message === constants.messages.invalidUser
        )
    });

    _chai.Assertion.addMethod('listOfDelegations', function() {
        var obj = this._obj;
        var delegations = obj.data.data;
        this.assert(
            obj.status === 200,
            delegations instanceof Array,
            delegations.every((i) => faker.delegation().hasOwnProperty(i))
        )
    });

    _chai.Assertion.addMethod('listOfDrepPrivacyPolicies', function() {
        var obj = this._obj;
        var drepPrivacyPolicy = obj.data.data;
        this.assert(
            obj.status === 200,
            drepPrivacyPolicy instanceof Array,
            drepPrivacyPolicy.every((i) => faker.drepPrivacyPolicy().hasOwnProperty(i))
        )
    });

    _chai.Assertion.addMethod('listOfDrepTosPolicies', function() {
        var obj = this._obj;
        var drepTosPolicy = obj.data.data;
        this.assert(
            obj.status === 200,
            drepTosPolicy instanceof Array,
            drepTosPolicy.every((i) => faker.drepTosPolicy().hasOwnProperty(i))
        )
    });

    _chai.Assertion.addMethod('listOfDreps', function() {
        var obj = this._obj;
        var dreps = obj.data.data;
        this.assert(
            obj.status === 200,
            dreps instanceof Array,
            dreps.every((i) => faker.drep().hasOwnProperty(i))
        )
    });

    _chai.Assertion.addMethod('listOfPrivacyPolices', function() {
        var obj = this._obj;
        var privacyPolicies = obj.data.data;
        this.assert(
            obj.status === 200,
            privacyPolicies instanceof Array,
            privacyPolicies.every((i) => faker.privacyPolicy().hasOwnProperty(i))
        )
    });

    _chai.Assertion.addMethod('listOfTermsAndConditions', function() {
        var obj = this._obj;
        var termsAndConditions = obj.data.data;
        this.assert(
            obj.status === 200,
            termsAndConditions instanceof Array,
            termsAndConditions.every((i) => faker.termsAndConditions().hasOwnProperty(i))
        )
    });

    _chai.Assertion.addMethod('listOfTransactions', function() {
        var obj = this._obj;
        var transactions = obj.data.data;
        this.assert(
            obj.status === 200,
            transactions instanceof Array,
            transactions.every((i) => faker.transaction().hasOwnProperty(i))
        )
    });

    _chai.Assertion.addMethod('listOfVoters', function() {
        var obj = this._obj;
        var voters = obj.data.data;
        this.assert(
            obj.status === 200,
            voters instanceof Array,
            voters.every((i) => faker.voter().hasOwnProperty(i))
        )
    });

    _chai.Assertion.addMethod('haveInvalidFields', function(...args) {
        var errorObj = this._obj;
        var errors = errorObj.data.error.details.errors;
        var errorPaths = getErrorsPaths(errors);
        this.assert(
            errorObj.status === 400,
        )
        args.forEach(element => {
            this.assert(errorPaths.includes(element));
        });
        errors.forEach(element => {
            this.assert(element.message === constants.messages.uniqueValidationError)
            this.assert(element.name === constants.messages.validationError)
        })
    })
})

module.exports = {
    assertNoError,
    getEntityId,
    getVoterId,
    getTermsAndConditionsName
}