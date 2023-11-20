//
// Nufi wallet services
// nufi_wallet_services.js
//

const nufiWalletData = require('../../config/data/nufiWalletData')
const NufiWalletPage = require('../pages/nufi_wallet_page')
const HomePage = require('../pages/home_page')

class NufiWalletService {
       //Methods
    openNufiPage() {
        //Open new window to go to chrome extensions
        browser.newWindow('')
        browser.url('chrome://extensions/')
        //DOM have shadow-root so we execute script to get Nufi wallet extension HTML
        const el = browser.executeScript("return document.querySelector('body extensions-manager').shadowRoot.querySelector('#items-list').shadowRoot.querySelector('#container').querySelector('div.items-container').querySelector('extensions-item')", [])
        //Get extension HTML so we can get extension ID 
        const id = $(el).getHTML().split('"')[1]
        //Open extension mainPopup using ID from previous step
        browser.url('chrome-extension://' + id + '/index.html')
    }
    createNewNufiWallet() {
        this.openNufiPage()
        NufiWalletPage.clickOnNewWallet()
        NufiWalletPage.clikcOnIDontHaveWallet()
        NufiWalletPage.confirmCheckbox()
        NufiWalletPage.enterPassword()
        NufiWalletPage.getSeedPhrase()
        NufiWalletPage.enterSeedPhrase()
        NufiWalletPage.clikcOnConfirm()
        NufiWalletPage.clikcOnGoToWallet()
        browser.closeWindow()
        browser.switchWindow('Project')
    }
    restoreOldWallet(userSeedPhrases) {
        this.openNufiPage()
        NufiWalletPage.clickOnRestoreWallet()
        NufiWalletPage.enterSeedPhraseForRestoreWallet(userSeedPhrases)
        NufiWalletPage.confirmCheckbox()
        NufiWalletPage.enterWalletNameAndPassword()
        NufiWalletPage.clickOnRecover()
        NufiWalletPage.clikcOnGoToWallet()
        browser.closeWindow()
        browser.switchWindow('Project')
    }
    connectToNufi() {
        HomePage.clickOnConnectWallet()
        HomePage.clickOnNufiWallet()
        //Pause is added because new tab is opened and it needs ew seconds to load
        browser.pause(3000)
        browser.switchWindow("NuFi")
        NufiWalletPage.enterPasswordForLogin(nufiWalletData.nufiPassword)
        NufiWalletPage.clickOnConnect()
        NufiWalletPage.clickOnConnect()
        browser.switchWindow('Project')
    }
    disconnectFromNufi() {
        HomePage.clickOnProfileButton()
        HomePage.clickOnDisconnect()
    }
}

module.exports = new NufiWalletService();
