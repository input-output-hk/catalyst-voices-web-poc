const HomePage = require('../../../ui_support/pages/home_page')
const NufiWalletService = require('../../../ui_support/ui_services/nufi_wallet_services')
const DashboardPage = require('../../../ui_support/pages/dashboard_page')
const nufiWalletData = require('../../../config/data/nufiWalletData')
const DelegationPage = require('../../../ui_support/pages/delegation_page')
const PublicProfilePage = require('../../../ui_support/pages/public_profile_page')
const dRepData = require('../../../config/data/dRepData')
const ChallendgesPage = require('../../../ui_support/pages/challenges_page')

describe('Challendges page view as Active user -> regression', () => {
    it('Connect wallet as Active user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
        NufiWalletService.connectToNufi()
        DashboardPage.checkIfYouAreLogged(dRepData.activeUserDashboardTitle, dRepData.activeUserAddress)
    });
    it('Check Challendges page as Active user', () => {
        HomePage.clickOnChallendgesButton()
        ChallendgesPage.checkUserInfo(dRepData.activeUserChallendgesTitle)
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
});

describe('Challendges page view as Passive user -> regression', () => {
    it('Connect wallet as Passive user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhrasePassiveVoter)
        NufiWalletService.connectToNufi()
        DashboardPage.checkIfYouAreLogged(dRepData.passiveUserDashboardTitle, dRepData.passiveUserAddress)
    });
    it('Check Challendges page as Passive user', () => {
        HomePage.clickOnChallendgesButton()
        ChallendgesPage.checkUserInfo(dRepData.passiveUserChallendgesTitle)
    });
    it('Manage Delegation button should redirect to Delegation Page for Passive user', () => {
        ChallendgesPage.clickOnManageDelegationButton()
        DelegationPage.checkIfYouAreOnDelegationPage()
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
});

describe('Challendges page view as dRep user -> regression', () => {
    it('Connect wallet as dRep user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseDRep)
        NufiWalletService.connectToNufi()
        DashboardPage.checkIfYouAreLogged(dRepData.drepUserDashboardTitle, dRepData.dRepAddress)
    });
    it('Check Challendges page as dRep user', () => {
        HomePage.clickOnChallendgesButton()
        ChallendgesPage.checkUserInfo(dRepData.drepUserChallendgesTitle)
    });
});