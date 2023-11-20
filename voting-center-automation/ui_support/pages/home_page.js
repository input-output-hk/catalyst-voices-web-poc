//
// Home page
// home_page.js
//

const BasePage = require("./base_page");
const { strictEqual } = require("assert");
const dRepData = require('../../config/data/dRepData')

class HomePage extends BasePage {
    // Selectors
    get becomeAdRep_Button() { return $('//p[text()="Register as a dRep"]/..') }
    get dRepsOption_Button() { return $('//a[@href="/delegations"]') }
    get connectWallet_Button() { return $('//button[text()="Connect Wallet"]') }
    get connectNufi_Button() { return $('//span[text()="Nufi (Preprod Testnet)"]') }
    get profileIcon_Button() { return $('//img[@class="dots"]')}
    get disconnect_Button() { return $('//li[text()="Disconnect"]')}
    get home_Button() { return $('//a[text()="Home"]')}
    get dashboard_Button() { return $('//a[@href="/dashboard"]')}
    get delegation_Button() { return $('//a[@href="/vote-delegation"]')}
    get challenges_Button() { return $('//a[@href="/challenges"]')}
    get logo_Button() { return $('(//img[@alt="Catalyst Logo"])[1]')}
    get publicProfile_Button() { return $('//a[contains(@href,"/drep")]')}
    get telegram_Button() { return $('(//div[@class="social-wrapper"])[1]')}
    get twitter_Button() { return $('(//div[@class="social-wrapper"])[2]')}
    get youTube_Button() { return $('(//div[@class="social-wrapper"])[3]')}
    get discord_Button() { return $('(//div[@class="social-wrapper"])[4]')}
    get delegationFooter_Button() { return $('//div[@class="footer mt-5 row"]//a[@href="/delegations"]')}
    get dRepRegistrationFooter_Button() { return $('//div[@class="footer mt-5 row"]//a[@href="/drep-registration"]')}
    get challengesFooter_Button() { return $('(//a[@href="/challenges"])[2]')}
    get homeFooter_Button() { return $('(//a[@href="/"])[3]')}
    get dashboardFooter_Button() { return $('(//a[@href="/dashboard"])[2]')}
    get projectCatalystFooter_Button() { return $('//a[@href="https://projectcatalyst.io/"]')}
    get cardanoORGFooter_Button() { return $('//a[@href="https://cardano.org/"]')}
    get cardanoFoundationFooter_Button() { return $('//a[@href="https://cardanofoundation.org/"]')}
    get essentialCardanoFooter_Button() { return $('//a[@href="https://www.essentialcardano.io/"]')}
    get homeFirstCardText() { return $('(//div[@class="card-item-text"])[1]')}
    get homeSecondCardText() { return $('(//div[@class="card-item-text"])[2]')}
    get homeThirdCardText() { return $('(//div[@class="card-item-text"])[3]')}
    get homeFourthCardText() { return $('(//div[@class="card-item-text"])[4]')}
    //Methods
    clickOnHomeButton() {
        this.clickSkipOrLast()
        this.click(this.home_Button)
    }
    clickOnLogo() {
        this.click(this.logo_Button)
    }
    clickOnPublicProfileButton() {
        this.click(this.publicProfile_Button)
    }
    clickOnChallendgesButton() {
        this.clickSkipOrLast()
        this.click(this.challenges_Button)
    }
    clickOnBecomeDRep() {
        this.waitForLoader()
        this.clickSkipOrLast()
        this.click(this.becomeAdRep_Button)
    }
    clickOnDReps() {
        this.clickSkipOrLast()
        this.click(this.dRepsOption_Button)
    }
    clickOnConnectWallet() {
        this.clickSkipOrLast()
        this.click(this.connectWallet_Button)
    }
    clickOnNufiWallet() {
        this.click(this.connectNufi_Button)
    }
    clickOnProfileButton() {
        this.clickLast()
        this.click(this.profileIcon_Button)
    }
    clickOnDisconnect() {
        this.click(this.disconnect_Button)
    }
    clickOnTelegramButton() {
        this.clickSkipOrLast()
        this.click(this.telegram_Button)
    }
    clickOnTwitterButton(){
        this.click(this.twitter_Button)
    }
    clickOnYouTubeButton(){
        this.click(this.youTube_Button)
    }
    clickOnDiscordButton(){
        this.click(this.discord_Button)
    }
    clickOnDelegationFooterButton() {
        this.click(this.delegationFooter_Button)
    }
    clickOnRegisterAsDrepFooterButton() {
        this.click(this.dRepRegistrationFooter_Button)
    }
    clickOnChallengesFooterButton() {
        this.clickSkipOrLast()
        this.click(this.challengesFooter_Button)
    }
    clickOnHomeFooterButton() {
        this.clickSkipOrLast()
        this.click(this.homeFooter_Button)
    }
    clickOnDashboardFooterButton() {
        this.click(this.dashboardFooter_Button)
    }
    clickOnProjectcatalystIoFooterButton(){
        this.click(this.projectCatalystFooter_Button)
    }
    clickOnCardanoORGFooterButton(){
        this.click(this.cardanoORGFooter_Button)
    }
    clickOnCardanoFoundationFooterButton(){
        this.click(this.cardanoFoundationFooter_Button)
    }
    clickOnEssentialCardanoFooterButton(){
        this.click(this.essentialCardanoFooter_Button)
    }
    walletIsNotConnected() {
        strictEqual(this.connectWallet_Button.isDisplayed(), true)
    }
    checkActiveUserCardsTitlesAndText() {
        const titles = $$('//div[@class="card-title h5"]')
        const texts = [this.homeFirstCardText, this.homeSecondCardText, this.homeThirdCardText]
        titles.forEach((element, i) => {
            strictEqual(this.getText(element), dRepData.homePageActiveHeader[i])
        });
        texts.forEach((element, i) => {
            strictEqual(this.getText(element), dRepData.homePageActiveCardText[i])
        });
    }
    checkPassiveUserCardsTitlesAndText() {
        const titles = $$('//div[@class="card-title h5"]')
        const texts = [this.homeFirstCardText, this.homeSecondCardText, this.homeThirdCardText, this.homeFourthCardText]
        titles.forEach((element, i) => {
            strictEqual(this.getText(element), dRepData.homePagePassiveHeader[i])
        });
        texts.forEach((element, i) => {
            strictEqual(this.getText(element), dRepData.homePagePassiveCardText[i])
        });
    }
    checkDrepUserCardsTitlesAndText() {
        const titles = $$('//div[@class="card-title h5"]')
        const texts = [this.homeFirstCardText]
        titles.forEach((element, i) => {
            strictEqual(this.getText(element), dRepData.homePageDrepHeader[i])
        });
        texts.forEach((element, i) => {
            strictEqual(this.getText(element), dRepData.homePageDrepCardText[i])
        });
    }
}

module.exports = new HomePage();
