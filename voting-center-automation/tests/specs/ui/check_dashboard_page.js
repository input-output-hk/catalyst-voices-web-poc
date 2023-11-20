const HomePage = require('../../../ui_support/pages/home_page')
const DashboardPage = require('../../../ui_support/pages/dashboard_page')
const NufiWalletService = require('../../../ui_support/ui_services/nufi_wallet_services')
const nufiWalletData = require('../../../config/data/nufiWalletData')
const dRepData = require('../../../config/data/dRepData')

describe('Check Dashboard page for Active user -> regression', () => {
    it('Connect wallet as Active user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
        NufiWalletService.connectToNufi()
    });
    it('Assert Dashboard Page for Active user', () => {
        DashboardPage.checkUserInfo(dRepData.activeUserDashboardTitle)
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
})

describe('Check Dashboard page for Passive user -> regression', () => {
    it('Connect wallet as Passive user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhrasePassiveVoter)
        NufiWalletService.connectToNufi()
    });
    it('Assert Dashboard Page for Passive user', () => {
        DashboardPage.checkUserInfo(dRepData.passiveUserDashboardTitle)
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
})

describe('Check Dashboard page for dRep user -> regression', () => {
    it('Connect wallet as dRep user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseDRep)
        NufiWalletService.connectToNufi()
    });
    it('Assert Dashboard page for dRep user', () => {
        DashboardPage.checkUserInfo(dRepData.drepUserDashboardTitle)
    });
})