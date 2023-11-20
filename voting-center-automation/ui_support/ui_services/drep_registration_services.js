//
// dRep registration services
// drep_registration_services.js
//

const dRepData = require('../../config/data/dRepData')
const DRepRegistrationPage = require('../pages/dRep_registration_page')

class DrepRegistrationService {
    //Methods
    enterDrepInfo() {
        DRepRegistrationPage.enterUserData(dRepData.name, dRepData.username, dRepData.email)
        DRepRegistrationPage.clickOnNext()
    }
    enterDrepText() {
        DRepRegistrationPage.enterProfileInfo(dRepData.dRepHeadline, dRepData.profileBio, dRepData.contributions)
        DRepRegistrationPage.clickOnNext()
    }
    enterInterests() {
        DRepRegistrationPage.selectNTagsForInterest(5)
        DRepRegistrationPage.checkIfFiveInterestTagAreSelected()
        DRepRegistrationPage.clickOnNext()
    }
    enterSocialLinks() {
        DRepRegistrationPage.enterLinkedinProfileLink(dRepData.validLinkedinProfileLink)
        DRepRegistrationPage.enterTwitterProfileLink(dRepData.validTwitterProfileLink)
        DRepRegistrationPage.enterTelegramProfileLink(dRepData.validTelegramProfileLink)
        DRepRegistrationPage.enterDiscordProfileLink(dRepData.validDiscordProfileLink)
        DRepRegistrationPage.enterGithubProfileLink(dRepData.validGithubProfileLink)
        DRepRegistrationPage.enterYoutubeProfileLink(dRepData.validYoutubeProfileLink)
        DRepRegistrationPage.clickOnNext()
    }
    agreeWithAllTerms() {
        DRepRegistrationPage.checkIAgree()
        DRepRegistrationPage.checkIAgreePrivacyPolicy()
        DRepRegistrationPage.checkIAgreeTermsAndCondition()
    }

}

module.exports = new DrepRegistrationService();
