const HomePage = require('../../../ui_support/pages/home_page')
const NufiWalletService = require('../../../ui_support/ui_services/nufi_wallet_services')
const DashboardPage = require('../../../ui_support/pages/dashboard_page')
const nufiWalletData = require('../../../config/data/nufiWalletData')
const DRepsPage = require('../../../ui_support/pages/dReps_page')
const DRepRegistrationPage = require('../../../ui_support/pages/dRep_registration_page')
const PublicProfilePage = require('../../../ui_support/pages/public_profile_page')
const dRepData = require('../../../config/data/dRepData')
const DrepRegistrationService = require('../../../ui_support/ui_services/drep_registration_services')
const ChallendgesPage = require('../../../ui_support/pages/challenges_page')

describe('SMOKE test Active user -> smoke', () => {
    it('Connect wallet as Active user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
        NufiWalletService.connectToNufi()
        DashboardPage.checkIfYouAreLogged(dRepData.activeUserDashboardTitle, dRepData.activeUserAddress)
    });
    it('Check Home page as Active user', () => {
        HomePage.clickOnHomeButton()
        HomePage.checkActiveUserCardsTitlesAndText()
    });
    it('Check dRep registration as Active user', () => {
        HomePage.clickOnBecomeDRep()
        DrepRegistrationService.enterDrepInfo()
        DrepRegistrationService.enterDrepText()
        DrepRegistrationService.enterInterests()
        DrepRegistrationService.enterSocialLinks()
        DrepRegistrationService.agreeWithAllTerms()
        HomePage.clickOnLogo()
        DRepRegistrationPage.clickOnYes()
    });
    it('Check Delegation page as Active user', () => {
        HomePage.clickOnDReps()
        DRepsPage.searchForDRep(dRepData.searchDRepByName)
        DRepsPage.checkSearchResultByName()
        DRepsPage.searchForDRep(dRepData.searchDRepByTag)
        DRepsPage.checkSearchResultByTag()
        DRepsPage.searchForDRep(dRepData.searchDRepByInvalidInput)
        DRepsPage.checkSearchNoResultMessage()
    });
    it('Check Challendges page as Active user', () => {
        HomePage.clickOnChallendgesButton()
        ChallendgesPage.checkUserInfo(dRepData.activeUserChallendgesTitle)
        ChallendgesPage.searchForChallendges(dRepData.searchChallendgesName)
        ChallendgesPage.checkSearchResultByChallendgesName()
        ChallendgesPage.searchForChallendges(dRepData.searchDRepByInvalidInput)
        ChallendgesPage.checkSearchNoResultMessage()
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
});

describe('SMOKE test Passive user -> smoke', () => {
    it('Connect wallet as Passive user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhrasePassiveVoter)
        NufiWalletService.connectToNufi()
        DashboardPage.checkIfYouAreLogged(dRepData.passiveUserDashboardTitle, dRepData.passiveUserAddress)
    });
    it('Check Home page as Passive user', () => {
        HomePage.clickOnHomeButton()
        HomePage.checkPassiveUserCardsTitlesAndText()
    });
    it('Check dRep registration as Passive user', () => {
        HomePage.clickOnBecomeDRep()
        DrepRegistrationService.enterDrepInfo()
        DrepRegistrationService.enterDrepText()
        DrepRegistrationService.enterInterests()
        DrepRegistrationService.enterSocialLinks()
        DrepRegistrationService.agreeWithAllTerms()
        HomePage.clickOnLogo()
        DRepRegistrationPage.clickOnYes()
    });
    it('Check Delegation page as Passive user', () => {
        HomePage.clickOnDReps()
        DRepsPage.searchForDRep(dRepData.searchDRepByName)
        DRepsPage.checkSearchResultByName()
        DRepsPage.searchForDRep(dRepData.searchDRepByTag)
        DRepsPage.checkSearchResultByTag()
        DRepsPage.searchForDRep(dRepData.searchDRepByInvalidInput)
        DRepsPage.checkSearchNoResultMessage()
    });
    it('Check Challendges page as Passive user', () => {
        HomePage.clickOnChallendgesButton()
        ChallendgesPage.checkUserInfo(dRepData.passiveUserChallendgesTitle)
        ChallendgesPage.searchForChallendges(dRepData.searchChallendgesName)
        ChallendgesPage.checkSearchResultByChallendgesName()
        ChallendgesPage.searchForChallendges(dRepData.searchDRepByInvalidInput)
        ChallendgesPage.checkSearchNoResultMessage()
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
});

describe('SMOKE test dRep user -> smoke', () => {
    it('Connect wallet as dRep user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseDRep)
        NufiWalletService.connectToNufi()
        DashboardPage.checkIfYouAreLogged(dRepData.drepUserDashboardTitle, dRepData.dRepAddress)
    });
    it('Check Home page as dRep user', () => {
        HomePage.clickOnHomeButton()
        HomePage.checkDrepUserCardsTitlesAndText()
    });
    it('Check Delegation page as dRep user', () => {
        HomePage.clickOnDReps()
        DRepsPage.searchForDRep(dRepData.searchDRepByName)
        DRepsPage.checkSearchResultByName()
        DRepsPage.searchForDRep(dRepData.searchDRepByTag)
        DRepsPage.checkSearchResultByTag()
        DRepsPage.searchForDRep(dRepData.searchDRepByInvalidInput)
        DRepsPage.checkSearchNoResultMessage()
    });
    it('Check public profile page as dRep user', () => {
        HomePage.clickOnPublicProfileButton()
        PublicProfilePage.checkDrepData()
    });
    it('Check Challendges page as dRep user', () => {
        HomePage.clickOnChallendgesButton()
        ChallendgesPage.checkUserInfo(dRepData.drepUserChallendgesTitle)
        ChallendgesPage.searchForChallendges(dRepData.searchChallendgesName)
        ChallendgesPage.checkSearchResultByChallendgesName()
        ChallendgesPage.searchForChallendges(dRepData.searchDRepByInvalidInput)
        ChallendgesPage.checkSearchNoResultMessage()
    });
});
