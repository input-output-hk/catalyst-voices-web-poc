const axios = require('axios').default;
const urls = require('../config/data/apiUrls').Urls;
const auth = require('./auth');
const https = require('https');

class Api {

    constructor(){
        axios.defaults.baseURL = urls.getBaseUrl();
    }

    static async build () {
        return new Api();
    }

    static async login (url, data) {
        return await auth.axios_no_authorization.post(url, data);
    }

    static async create (url, data) {
        return await axios.post(url, data);
    }

    static async update (url, id, data) {
        return await axios.put(urls.parametrizedUrl(url, id), data);
    }

    static async getAll (url) {
        return await axios.get(url)
    };

    static async getSingle (url, id) {
        return await axios.get(urls.parametrizedUrl(url, id))
    }

    static async delete (url, id) {
        return await axios.delete(urls.parametrizedUrl(url, id))
    }

    static async put (url, data) {
        return await axios.put(url, data);
    }
}

class Dreps extends Api {

    static async build() {
        await super.build();
    }

    static async register (drep) {
        return await super.create(urls.dreps(), { data: drep });
    }

    static async update (id, drep) {
        return await super.update(urls.dreps(), id, { data: drep });
    }

    static async getAll () {
        return await super.getAll(urls.dreps());
    };

    static async getSingle (entity) {
        return await super.getSingle(urls.dreps(), entity);
    }

    static async delete (id) {
        return await super.delete(urls.dreps(), id);
    }
}

class Voters extends Api {
    
    static async build() {
        await super.build();
    }

    static async register (voter) {
        return super.create(urls.voters(), voter);
    }

    static async update (id, voter) {
        return await super.update(urls.voters(), id, { data: voter });
    };

    static async getAll () {
        return await super.getAll(urls.voters());
    };

    static async getSingle (id) {
        return await super.getSingle(urls.voters(), id);
    }

    static async delete (id) {
        return await super.delete(urls.voters(), id);
    }
}

class Delegations extends Api {

    static async build() {
        await super.build();
    }

    static async create (delegation) {
        return super.create(urls.delegations(), { data: delegation });
    }

    static async update (id, delegation) {
        return await super.update(urls.delegations(), id, { data: delegation });
    };

    static async getAll () {
        return await super.getAll(urls.delegations());
    };

    static async getSingle (id) {
        return await super.getSingle(urls.delegations(), id);
    }

    static async delete (id) {
        return await super.delete(urls.delegations(), id);
    }
}

class PrivacyPolicies extends Api {

    static async build() {
        await super.build();
    }

    static async create (privacyPolicy) {
        return super.create(urls.privacyPolicy(), { data: privacyPolicy });
    }

    static async update (id, privacyPolicy) {
        return await super.update(urls.privacyPolicy(), id, { data: privacyPolicy });
    };

    static async getAll () {
        return await super.getAll(urls.privacyPolicy());
    };

    static async getSingle (id) {
        return await super.getSingle(urls.privacyPolicy(), id);
    }

    static async delete (id) {
        return await super.delete(urls.privacyPolicy(), id);
    }
}

class DrepPrivacyPolicies extends Api {

    static async build() {
        await super.build();
    }

    static async create (drepPrivacyPolicy) {
        return super.create(urls.drepPrivacyPolicy(), { data: drepPrivacyPolicy });
    }

    static async update (id, drepPrivacyPolicy) {
        return await super.update(urls.drepPrivacyPolicy(), id, { data: drepPrivacyPolicy });
    };

    static async getAll () {
        return await super.getAll(urls.drepPrivacyPolicy());
    };

    static async getSingle (id) {
        return await super.getSingle(urls.drepPrivacyPolicy(), id);
    }

    static async delete (id) {
        return await super.delete(urls.drepPrivacyPolicy(), id);
    }
}

class TermsAndConditions extends Api {

    static async build() {
        await super.build();
    }

    static async create (termsAndConditions) {
        return super.create(urls.termsAndConditions(), { data: termsAndConditions });
    }

    static async update (id, termsAndConditions) {
        return await super.update(urls.termsAndConditions(), id, { data: termsAndConditions });
    };

    static async getAll () {
        return await super.getAll(urls.termsAndConditions());
    };

    static async getSingle (id) {
        return await super.getSingle(urls.termsAndConditions(), id);
    }

    static async delete (id) {
        return await super.delete(urls.termsAndConditions(), id);
    }
}

class DrepTosPolicies extends Api {

    static async build() {
        await super.build();
    }

    static async create (drepTosPolicy) {
        return super.create(urls.drepTosPolicy(), { data: drepTosPolicy });
    }

    static async update (id, drepTosPolicy) {
        return await super.update(urls.drepTosPolicy(), id, { data: drepTosPolicy });
    };

    static async getAll () {
        return await super.getAll(urls.drepTosPolicy());
    };

    static async getSingle (id) {
        return await super.getSingle(urls.drepTosPolicy(), id);
    }

    static async delete (id) {
        return await super.delete(urls.drepTosPolicy(), id);
    }
}

class Transactions extends Api {

    static async build() {
        await super.build();
    }

    static async create (transaction) {
        return super.create(urls.transactions(), { data: transaction });
    }

    static async update (id, transaction) {
        return await super.update(urls.transactions(), id, { data: transaction });
    };

    static async getAll () {
        return await super.getAll(urls.transactions());
    };

    static async getSingle (id) {
        return await super.getSingle(urls.transactions(), id);
    }

    static async delete (id) {
        return await super.delete(urls.transactions(), id);
    }
}

class User extends Api {
    
    static async build() {
        await super.build();
    }

    static async login (user) {
        return super.login(urls.loginLocalUser(), user);
    }    
}

class Settings extends Api {
    
    static async build() {
        await super.build();
    }

    static async createSetting(setting){
        return super.put(urls.putSetting(), { data: setting })
    }
}

module.exports = {
    Dreps,
    Voters,
    Delegations,
    PrivacyPolicies,
    DrepPrivacyPolicies,
    TermsAndConditions,
    DrepTosPolicies,
    Transactions,
    User,
    Settings
}