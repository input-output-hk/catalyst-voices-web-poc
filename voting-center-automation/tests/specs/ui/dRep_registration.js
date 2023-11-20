const HomePage = require('../../../ui_support/pages/home_page')
const DRepsPage = require('../../../ui_support/pages/dReps_page')
const DRepRegistrationPage = require('../../../ui_support/pages/dRep_registration_page')
const dRepData = require('../../../config/data/dRepData')
const NufiWalletService = require('../../../ui_support/ui_services/nufi_wallet_services')
const nufiWalletData = require('../../../config/data/nufiWalletData')

describe('dRep registration -> regression', () => {
    it('Open app', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
        NufiWalletService.connectToNufi()
        HomePage.clickSkipOrLast()
    });
    it('Click on become a dRep on Home page', () => {
        HomePage.clickOnBecomeDRep()
    });
    it('Enter User Info', () => {
        DRepRegistrationPage.enterUserData(dRepData.name, dRepData.username, dRepData.email)
        DRepRegistrationPage.clickOnNext()
    });
    it('Enter Profile Info', () => {
        DRepRegistrationPage.enterProfileInfo(dRepData.dRepHeadline, dRepData.profileBio, dRepData.contributions)
        DRepRegistrationPage.clickOnNext()
    });
    it('Select five tags for Interests', () => {
        DRepRegistrationPage.selectNTagsForInterest(5)
        DRepRegistrationPage.checkIfFiveInterestTagAreSelected()
        DRepRegistrationPage.clickOnNext()
    });
    it('Enter Socials links', () => {
        DRepRegistrationPage.enterLinkedinProfileLink(dRepData.validLinkedinProfileLink)
        DRepRegistrationPage.enterTwitterProfileLink(dRepData.validTwitterProfileLink)
        DRepRegistrationPage.enterTelegramProfileLink(dRepData.validTelegramProfileLink)
        DRepRegistrationPage.enterDiscordProfileLink(dRepData.validDiscordProfileLink)
        DRepRegistrationPage.enterGithubProfileLink(dRepData.validGithubProfileLink)
        DRepRegistrationPage.enterYoutubeProfileLink(dRepData.validYoutubeProfileLink)
        DRepRegistrationPage.clickOnNext()
    });
    it('Check all I Agree checkbox', () => {
        DRepRegistrationPage.checkIAgree()
        DRepRegistrationPage.checkIAgreePrivacyPolicy()
        DRepRegistrationPage.checkIAgreeTermsAndCondition()
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
});
describe('dRep registration with skipped Interests and Socials -> regression', () => {
    it('Open app', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
        NufiWalletService.connectToNufi()
        HomePage.clickSkipOrLast()
    });
    it('Click on become a dRep on Home page', () => {
        HomePage.clickOnBecomeDRep()
    });
    it('Enter User Info', () => {
        DRepRegistrationPage.enterUserData(dRepData.name, dRepData.username, dRepData.email)
        DRepRegistrationPage.clickOnNext()
    });
    it('Enter Profile Info', () => {
        DRepRegistrationPage.enterProfileInfo(dRepData.dRepHeadline, dRepData.profileBio, dRepData.contributions)
        DRepRegistrationPage.clickOnNext()
    });
    it('Skip Interests', () => {
        DRepRegistrationPage.clickOnNext()
    });
    it('Skip Socials', () => {
        DRepRegistrationPage.clickOnNext()
    });
    it('Check all I Agree checkbox', () => {
        DRepRegistrationPage.checkIAgree()
        DRepRegistrationPage.checkIAgreePrivacyPolicy()
        DRepRegistrationPage.checkIAgreeTermsAndCondition()
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
});
describe('dRep registration negative scenarios -> regression', () => {
    it('Open app', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
        NufiWalletService.connectToNufi()
        HomePage.clickSkipOrLast()
    });
    it('Click on become a dRep on Home page', () => {
        HomePage.clickOnBecomeDRep()
    });
    it('Enter invalid User Info', () => {
        DRepRegistrationPage.enterUserData(dRepData.invalidName, dRepData.invalidUsername, dRepData.invalidEmail)
        DRepRegistrationPage.checkIfBasicInfoIsInvalid()
        DRepRegistrationPage.enterUserData(dRepData.name, dRepData.username, dRepData.email)
        DRepRegistrationPage.clickOnNext()
    });
    it('Enter Invalid Profile Info', () => {
        DRepRegistrationPage.enterProfileInfo(dRepData.invalidDRepHeadline, dRepData.invalidProfileBio, dRepData.invalidContributions)
        DRepRegistrationPage.checkIfNextButtonIsClickable(false)
        DRepRegistrationPage.enterProfileInfo(dRepData.dRepHeadline, dRepData.profileBio, dRepData.contributions)
        DRepRegistrationPage.clickOnNext()
    });
    it('Skip Interests', () => {
        DRepRegistrationPage.clickOnNext()
    });
    it('Enter invalid Socials links', () => {
        DRepRegistrationPage.enterLinkedinProfileLink(dRepData.invalidSocialLink)
        DRepRegistrationPage.enterTwitterProfileLink(dRepData.invalidSocialLink)
        DRepRegistrationPage.enterTelegramProfileLink(dRepData.invalidSocialLink)
        DRepRegistrationPage.enterDiscordProfileLink(dRepData.invalidSocialLink)
        DRepRegistrationPage.enterGithubProfileLink(dRepData.invalidSocialLink)
        DRepRegistrationPage.enterYoutubeProfileLink(dRepData.invalidSocialLink)
        DRepRegistrationPage.checkIfNextButtonIsClickable(false)
        DRepRegistrationPage.enterLinkedinProfileLink(dRepData.validLinkedinProfileLink)
        DRepRegistrationPage.enterTwitterProfileLink(dRepData.validTwitterProfileLink)
        DRepRegistrationPage.enterTelegramProfileLink(dRepData.validTelegramProfileLink)
        DRepRegistrationPage.enterDiscordProfileLink(dRepData.validDiscordProfileLink)
        DRepRegistrationPage.enterGithubProfileLink(dRepData.validGithubProfileLink)
        DRepRegistrationPage.enterYoutubeProfileLink(dRepData.validYoutubeProfileLink)
        DRepRegistrationPage.clickOnNext()
    });
    it('Check all I Agree checkbox', () => {
        DRepRegistrationPage.checkIfCompleteButtonIsDisabled()
        DRepRegistrationPage.checkIAgree()
        DRepRegistrationPage.checkIAgreePrivacyPolicy()
        DRepRegistrationPage.checkIAgreeTermsAndCondition()
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
});

