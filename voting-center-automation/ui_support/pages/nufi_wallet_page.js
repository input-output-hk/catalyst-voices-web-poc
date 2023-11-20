//
// Nufi wallet page
// nufi_wallet_page.js
//

const BasePage = require("./base_page");
const nufiWalletData = require('../../config/data/nufiWalletData')

class NameWalletPage extends BasePage {
    // Selectors
    get createNewWallet_Button() { return $('//p[text()="Create New Wallet"]') }
    get restoreWallet_Button() { return $('//p[text()="Restore Wallet"]') }
    get iDontHaveWallet_Button() { return $('//button[text()="No, I don\'t have a hardware wallet"]') }
    get checkbox_Button() { return $('//input[@type="checkbox"]/..') }
    get continue_Button() { return $('//button[text()="Continue"]') }
    get password_Field() { return $('//input[@id="mui-3"]') }
    get confirmPassword_Field() { return $('//input[@id="mui-4"]') }
    get confirm_Button() { return $('//button[text()="Confirm"]') }
    get goToWallet_Button() { return $('//button[text()="Go to Wallet"]') }
    get connect_Button() { return $('//button[text()="Connect"]') }
    get recover_Button() { return $('//button[text()="Recover"]') }
       //Methods
    clickOnNewWallet() {
        this.click(this.createNewWallet_Button)
    }
    confirmCheckbox() {
        this.click(this.checkbox_Button)
        this.click(this.continue_Button)
    }
    getSeedPhrase() {
        this.click($('//input[@class="MuiSwitch-input PrivateSwitchBase-input css-1m9pwf3"]/..'))
        nufiWalletData.nufiWalletSeedPhrase = this.getValue($('//textarea[@id="mui-5"]'))
        this.click($('//button[text()="I have written it down"]'))
    }
    enterSeedPhrase() {
        this.setValue($('//textarea[@id="mui-6"]'), nufiWalletData.nufiWalletSeedPhrase)
    }
    enterPassword() {
        this.setValue(this.password_Field, nufiWalletData.nufiPassword)
        this.setValue(this.confirmPassword_Field, nufiWalletData.nufiPassword)
        this.click(this.continue_Button)
    }
    clikcOnIDontHaveWallet() {
        this.click(this.iDontHaveWallet_Button)
    }
    clikcOnConfirm() {
        this.click(this.confirm_Button)
    }
    clikcOnGoToWallet() {
        this.click(this.goToWallet_Button)
    }
    clickOnRestoreWallet() {
        this.click(this.restoreWallet_Button)
    }
    enterSeedPhraseForRestoreWallet(userSeedPhrases) {
        for (let i = 2; i <= 16; i++) {
            this.setValue($('//input[@id="mui-' + i + '"]'), userSeedPhrases[i-2])
        }
    }
    clickOnRecover() {
        this.click(this.recover_Button)
    }
    clickOnConnect() {
        this.click(this.connect_Button)
    }
    enterWalletNameAndPassword() {
        this.setValue($('//input[@id="mui-18"]'), 'Wallet_1')
        this.setValue($('//input[@id="mui-19"]'), nufiWalletData.nufiPassword)
        this.setValue($('//input[@id="mui-20"]'), nufiWalletData.nufiPassword)
    }
    enterPasswordForLogin(password) {
        this.setValue(this.confirmPassword_Field, password)
    }
}

module.exports = new NameWalletPage();
