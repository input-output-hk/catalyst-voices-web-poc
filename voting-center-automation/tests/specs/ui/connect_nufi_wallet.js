const HomePage = require('../../../ui_support/pages/home_page')
const NufiWalletService = require('../../../ui_support//ui_services/nufi_wallet_services')
const DashboardPage = require('../../../ui_support/pages/dashboard_page')
const nufiWalletData = require('../../../config/data/nufiWalletData')
const dRepData = require('../../../config/data/dRepData')

describe('Connect/disconnect Nufi wallet -> regression', () => {
    it('Open app', () => {
        HomePage.openApp()
    });
    it('Restore Active voter Nufi wallet', () => {
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
    });
    it('Connect Nufi wallet', () => {
        NufiWalletService.connectToNufi()
    });
    it('I should be on Dashboard page', () => {
        DashboardPage.checkUserInfo(dRepData.activeUserDashboardTitle)
    });
    it('Disconnect Nufi wallet', () => {
        NufiWalletService.disconnectFromNufi()
    });
    it('I should be disconnected', () => {
        HomePage.walletIsNotConnected()
    });
});
