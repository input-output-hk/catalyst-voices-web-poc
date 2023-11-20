const { faker } = require('@faker-js/faker');
const { createHash } = require('crypto');
const { bech32 } = require('bech32');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Filter = require('bad-words');
const constants = require('./constants')

class Faker {

    static #fileToBase64(relativePath){
        return fs.readFileSync(path.join(__dirname, relativePath), { encoding: 'base64' });
    }

    static #getVotingKey(){
        return crypto.randomBytes(64).toString('base64url')
    }

    static drep(){
        const filter = new Filter();
        const votingKey = this.#getVotingKey();
        const fakerFirstName = faker.person.firstName();
        const fakerLastName = faker.person.lastName();
        const firstName = !filter.isProfane(fakerFirstName) ? fakerFirstName : constants.testFirstName;
        const lastName = !filter.isProfane(fakerLastName) ? fakerLastName : constants.testLastName;
        return {
            voting_key: votingKey,
            encoded_voting_key: bech32.encode('cvote_vk', votingKey, 128),
            username: faker.internet.userName({ firstName, lastName }),
            name: `${firstName} ${lastName}`,
            headline: faker.helpers.fake(`${faker.company.name()} & ${faker.company.name()}`),
            profile_bio: faker.person.jobTitle(),
            contribution: faker.company.catchPhrase(),
            avatar: this.#fileToBase64('/assets/drepAvatar.png'),
            email: faker.internet.email(),
            hide_email: false,
            is_approved: true,
            socials: {
                facebook: faker.internet.url(),
                instagram: faker.internet.url()
            },
            tags: [faker.word.noun(), faker.word.noun()]
        };
    }

    static voter(){
        const votingKey = this.#getVotingKey();
        return {
            voting_key: votingKey,
            encoded_voting_key: bech32.encode('cvote_vk', votingKey, 128),
            wallet_address: faker.string.alpha(41),
            is_passive: true,
            is_disconnected: false,
            transaction_hash: createHash('sha256').update('test').digest('hex'),
            transaction_metadata: {
                txHash: faker.string.alpha(64),
                signature: faker.string.alpha(128),
                certificate: {
                    nonce: 13014583,
                    purpose: 0,
                    stakingPub: faker.string.alpha(64),
                    delegations: [
                        {
                            weight_percent: 1,
                            votingKey: faker.string.alpha(64)
                        }
                    ],
                    rewardAddress: `stake_test ${faker.string.alpha(54)}`
                }
            }
        };
    }

    static delegation() {
        return {
            voter_id: 1,
            drep_id: 2,
            weight_percent: faker.number.int({ min: 1, max: 100}),
            transaction_hash: faker.string.alpha(41)
        };
    }

    static privacyPolicy(){
        return { 
            privacy_policy: faker.lorem.sentences(1)
        };
    }

    static drepPrivacyPolicy(){
        return {
            drep_id: 1,
            privacy_policy_id: 1,
            accepted_at: Date.now()
        };
    }

    static termsAndConditions(){
        return {
            terms_and_conditions: faker.lorem.sentences(1)
        };
    }

    static drepTosPolicy(){
        return {
            drep_id: 1,
            tos_id: 1,
            accepted_at: Date.now()
        };
    }

    static transaction(){
        return {
            transaction_hash: faker.string.alpha(64),
            transaction_metadata: {
              data: null
            },
            submitted_at: Date.now(),
            finalized_at: Date.now()
        }
    }

    static invalidUser(){
        return {
            identifier: faker.internet.userName(),
            password: faker.internet.password()
        }
    }

    static setting(){
        return {
            dRep_registration_open: true,
            is_drep_approval_automated: true
        }
    }
}

module.exports = {
    Faker
}