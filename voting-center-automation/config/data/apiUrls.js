require('dotenv').config()
const ENV = process.env.ENV;

class Urls{
    static dev = 'http://127.0.0.1:1337/api';
    static getBaseUrl = () => {
        if (ENV === 'dev') {
            return this.dev;
        }
    }
    static queryString = (paramName) => `filters[${paramName}][$eq]`;
    static parametrizedUrl = (url, entity) => `${url}/${entity}`;
    static dreps = () => "/dreps";
    static voters = () => "/voters";
    static delegations = () => "/delegations";
    static termsAndConditions = () => "/terms-and-conditions";
    static privacyPolicy = () => "/privacy-policies";
    static drepPrivacyPolicy = () => "/drep-privacy-policies";
    static drepTosPolicy = () => "/drep-tos-policies";
    static transactions = () => "/transactions";
    static registerLocalUser = () => "/auth/local/register";
    static loginLocalUser = () => "/auth/local";
    static putSetting = () => "/setting"
}

module.exports = {
    Urls
}