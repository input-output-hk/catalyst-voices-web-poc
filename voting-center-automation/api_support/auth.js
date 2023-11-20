const axios = require("axios").default;
const helpers = require("./helpers");
const urls = require('../config/data/apiUrls').Urls;

axios.defaults.baseURL = urls.getBaseUrl();

const userAuth =  {
    email: "test@strapi.io",
    username: "test",
    lastname: "test",
    password: "Password123",
}

const userLogin = {
    identifier: userAuth.email,
    password: userAuth.password
}

/// This instance should be used for login/register attempts since it not using
// global authorization
const axios_no_authorization = axios.create({
    baseURL: urls.getBaseUrl(),
    headers: {}
  });

const registerTestActor = async () => {
    return axios_no_authorization.post(urls.registerLocalUser(), data = userAuth )
};

const loginTestActor = async () => {
    return axios_no_authorization.post(urls.loginLocalUser(), data = userLogin )
};

const UNDEFINED_TOKEN_VALUE = "undefined";

var getToken = async () => {
    var token = await loginTestActor()
        .then(function (response) {
            return response.data.jwt
        })        
        .catch(function(error) {
            console.log(error.response.status);
            return UNDEFINED_TOKEN_VALUE     
        });
    if (token === UNDEFINED_TOKEN_VALUE) {
        return await registerTestActor()
            .then(function (response) {
                return response.data.jwt
            })        
            .catch((error) => helpers.assertNoError(error));
    } else {
        return token
    }
}

/// This method cache token for all test suites, which is necessary to avoid 429 error from stapi due to too many calls to /auth
/// endpoint. Thanks for that token will be acquired only once from strapi
var token = async function sharedToken() {
    if(global.token === undefined) {
        var token = await getToken(urls.getBaseUrl());
        global.token = token; 
    } 
    return global.token;   
}

module.exports = {
    token,
    axios_no_authorization,
    userLogin
};