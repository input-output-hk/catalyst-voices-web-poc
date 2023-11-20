const HomePage = require('../../../ui_support/pages/home_page')
const FooterService = require('../../../ui_support/ui_services/footer_services')
const NufiWalletService = require('../../../ui_support/ui_services/nufi_wallet_services')
const nufiWalletData = require('../../../config/data/nufiWalletData')
const url = require('../../../config/url')
const dRepData = require('../../../config/data/dRepData')
const DashboardPage = require('../../../ui_support/pages/dashboard_page')

describe('Footer redirection for Active user -> regression', () => {
    it('Connect wallet as Active user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
        NufiWalletService.connectToNufi()
        DashboardPage.checkIfYouAreLogged(dRepData.activeUserDashboardTitle, dRepData.activeUserAddress)
    });
    it('Click and Check Follow us Footer as Active user', () => {
        HomePage.clickOnTelegramButton()
        FooterService.checkNewWindowUrlAndClose(url.telegramUrl)
        HomePage.clickOnTwitterButton()
        FooterService.checkNewWindowUrlAndClose(url.twitterUrl)
        HomePage.clickOnYouTubeButton()
        FooterService.checkNewWindowUrlAndClose(url.youtubeUrl)
        HomePage.clickOnDiscordButton()
        FooterService.checkNewWindowUrlAndClose(url.discordUrl)
    });
    it('Click and Check Project Catalyst Voting Footer as Active user', () => {
        HomePage.clickOnDelegationFooterButton()
        HomePage.checkUrl(url.delegationUrl)
        HomePage.clickOnRegisterAsDrepFooterButton()
        HomePage.checkUrl(url.dRepRegistrationUrl)
        HomePage.clickOnChallengesFooterButton()
        HomePage.checkUrl(url.challengeUrl)
        HomePage.clickOnHomeFooterButton()
        HomePage.checkUrl(url.homeUrl)
        HomePage.clickOnDashboardFooterButton()
        HomePage.checkUrl(url.dashboardUrl)
    });
    it('Click and Check Other Resources Footer as Active user', () => {
        HomePage.clickOnProjectcatalystIoFooterButton()
        FooterService.checkNewWindowUrlAndClose(url.projectCatalystIo)
        HomePage.clickOnCardanoORGFooterButton()
        FooterService.checkNewWindowUrlAndClose(url.cardanoOrg)
        HomePage.clickOnCardanoFoundationFooterButton()
        FooterService.checkNewWindowUrlAndClose(url.cardanoFoundation)
        HomePage.clickOnEssentialCardanoFooterButton()
        FooterService.checkNewWindowUrlAndClose(url.essentialCardano)
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
})






