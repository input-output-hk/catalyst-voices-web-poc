const HomePage = require('../../../ui_support/pages/home_page')
const DelegationPage = require('../../../ui_support/pages/delegation_page')
const DRepsLandingPage = require('../../../ui_support/pages/dReps_landing_page');
const ChallengesPage = require('../../../ui_support/pages/challenges_page');
const NufiWalletService = require('../../../ui_support/ui_services/nufi_wallet_services')
const nufiWalletData = require('../../../config/data/nufiWalletData')
const DashboardPage = require('../../../ui_support/pages/dashboard_page');
const dRepData = require('../../../config/data/dRepData');
const DRepsPage = require('../../../ui_support/pages/dReps_page');
const PublicProfilePage = require('../../../ui_support/pages/public_profile_page')

describe('Check introduction feature', () => {
    it('Open home page', () => {
        HomePage.openApp()
    })
    it('Check introduction feature text for Home Page and click next and last button', () => {
        HomePage.checkIntroductionText(dRepData.homePageWalletNotConnectedIntroductionCards)
    });
    it('Click on Delegation Page', () => {
        HomePage.clickOnDReps()
    })
    it('Check introduction feature text for Delegation Page and click next and last button', () => {
        DelegationPage.checkIntroductionText(dRepData.delegationPageIntroductionCards)
    })
    it('Click on Challenges Page', () => {
        HomePage.clickOnChallendgesButton()
    })
    //This part is commented because introduction feature is currently not displaying for challenges page
    // it('Check introduction feature text for Challenges Page and click next and last button', () => {
    //     ChallengesPage.checkIntroductionText(dRepData.challengesPageIntroductionCards)
    // })
    it('Connect wallet as Active user and check introduction feature', () => {
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
        NufiWalletService.connectToNufi()
    })
    it('Check introduction feature text for Voting Dashboard Page and click last button', () => {
        DashboardPage.checkIntroductionText(dRepData.dashboardPageIntroductionCard)
    })
    it('Reload session', () => {
        browser.reloadSession()
    });
})
describe('Connect wallet as dRep user and check introduction feature', () => {
    it('Open home page', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseDRep)
        NufiWalletService.connectToNufi()
    })
    it('Check introduction feature text for Voting Dashboard Page and click next and last button', () => {
        DashboardPage.checkIntroductionText(dRepData.dRepDashboardPageIntroductionCards)
    })
    it('Click on Public Profile Page', () => {
        HomePage.clickOnPublicProfileButton()
    })
    it('Check introduction feature text for Public Profile Page and click next and last button', () => {
        PublicProfilePage.checkIntroductionText(dRepData.dRepPublicProfileIntroductionCards)
    })
})