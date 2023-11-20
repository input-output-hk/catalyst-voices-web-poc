const HomePage = require('../../../ui_support/pages/home_page')
const NufiWalletService = require('../../../ui_support/ui_services/nufi_wallet_services')
const DashboardPage = require('../../../ui_support/pages/dashboard_page')
const nufiWalletData = require('../../../config/data/nufiWalletData')
const DRepsPage = require('../../../ui_support/pages/dReps_page')
const dRepData = require('../../../config/data/dRepData')

describe('Delegation Page as Passive user -> regression', () => {
    it('Connect wallet as Passive user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhrasePassiveVoter)
        NufiWalletService.connectToNufi()
        DashboardPage.checkIfYouAreLogged(dRepData.passiveUserDashboardTitle, dRepData.passiveUserAddress)
    });
    it('Search for dRep by name', () => {
        HomePage.clickOnDReps()
        DRepsPage.searchForDRep(dRepData.searchDRepByName)
        DRepsPage.checkSearchResultByName()
    });
    it('Search for dRep by tag', () => {
        DRepsPage.searchForDRep(dRepData.searchDRepByTag)
        DRepsPage.checkSearchResultByTag()
    });
    it('Search for dRep invalid scenario', () => {
        DRepsPage.searchForDRep(dRepData.searchDRepByInvalidInput)
        DRepsPage.checkSearchNoResultMessage()
    });
    it('Search for dRep by sortcut tags', () => {
        DRepsPage.searchForDRep('')
        DRepsPage.clickGamingTag()
        DRepsPage.clickBitcoinTag()
        DRepsPage.checkSearchResultByName()
        DRepsPage.clickGamingTag()
        DRepsPage.clickBitcoinTag()
        DRepsPage.countDRepNumber()
    });
    it('Sort dReps by name (A-Z)', () => {
        DRepsPage.clickOnSortDropdown()
        DRepsPage.clickSortAToZ()
        browser.pause(500)
        DRepsPage.isSorted('ASC')
    });
    it('Sort dReps by name (Z-A)', () => {
        DRepsPage.clickOnSortDropdown()
        DRepsPage.clickSortZToA()
        browser.pause(500)
        DRepsPage.isSorted('DESC')
    });
    it('DRep delegation overdelegate', () => {
        DRepsPage.clickOnConfirmDelegation()
        DRepsPage.enterFirstDRepPercentageToDelegate(99)
        DRepsPage.checkOverDelegatedStatus()
    });
    it('DRep delegation underdelegate', () => {
        DRepsPage.enterFirstDRepPercentageToDelegate(1)
        DRepsPage.checkUnderDelegatedStatus()
        DRepsPage.clickCancelButton()
    });
    it('DRep delegation select deselect dRep', () => {
        DRepsPage.selectDeselectDRep(dRepData.selecDeselectDRepName)
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
});

