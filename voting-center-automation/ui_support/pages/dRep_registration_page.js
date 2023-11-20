//
// dRep registration page
// dRep_registration_page.js
//

const BasePage = require("./base_page");
const { strictEqual } = require("assert");
const dRepData = require("../../config/data/dRepData");

class DRepRegistrationPage extends BasePage {
    // Selectors
    get name_Field() { return $('//input[@placeholder="e.g Peggy Gou"]') }
    get username_Field() { return $('//input[@placeholder="e.g peggygou"]') }
    get email_Field() { return $('//input[@placeholder="e.g. peggygou@example.com"]') }
    get next_Button() { return $('//h5[text()="Next"]/..') }
    get dRepHeadline_Filed() { return $('//textarea[@id="firstTextarea"]') }
    get profileBio_Field() { return $('//textarea[@id="secondTextarea"]') }
    get contributionsToCardano_FIeld() { return $('//textarea[@id="thirdTextarea"]') }
    get skip_Button() { return $('//h5[text()="Skip"]/..') }
    get iAgree_Checkbox() { return $('//input[@id="agree"]') }
    get iAgreePrivacyPolicy_Checkbox() { return $('//input[@id="pos"]') }
    get iAgreeTermsAndCondition_Checkbox() { return $('//input[@id="tos"]') }
    get complete_Button() { return $('//h5[text()="Complete"]/..') }
    get reviewApplicationMessage_Text() { return $('//h2[@class="drep-heading text-center"]') }
    get message_Text() { return $('//*[@class="message-text"]')}
    get linkedinUsername_Field() { return $('//input[@placeholder="Linkedin username"]')}
    get twitterUsername_Field() { return $('//input[@placeholder="Twitter username"]')}
    get telegramUsername_Field() { return $('//input[@placeholder="Telegram username"]')}
    get discordUsername_Field() { return $('//input[@placeholder="Discord username"]')}
    get githubUsername_Field() { return $('//input[@placeholder="Github username"]')}
    get youtubeUsername_Field() { return $('//input[@placeholder="Youtube username"]')}
    get yes_Button() { return $('//h5[text()="Yes, cancel"]')}
    //Methods
    clickOnNext() {
        this.click(this.next_Button)
    }
    checkIfNextButtonIsDisabled() {
        strictEqual(this.next_Button.isEnabled(), false)
    }
    checkIfCompleteButtonIsDisabled() {
        strictEqual(this.complete_Button.isClickable(), false)
    }
    checkIfNextButtonIsClickable(boolean) {
        strictEqual(this.next_Button.isClickable(), boolean)
    }
    clickOnSkip() {
        this.click(this.skip_Button)
    }
    clickOnComplete() {
        this.click(this.complete_Button)
    }
    enterUserData(name, username, email) {
        this.setValue(this.name_Field, name)
        this.setValue(this.username_Field, username)
        this.setValue(this.email_Field, email)
    }
    checkIfBasicInfoIsInvalid() {
        strictEqual(this.getText(this.message_Text), 'Please fill the highlighted fields')
        strictEqual(this.getBorderColorHexCSSProperty(this.name_Field), dRepData.redHexColor)
        strictEqual(this.getBorderColorHexCSSProperty(this.email_Field), dRepData.redHexColor)
    }
    enterProfileInfo(dRepHeadline, profileBio, contributions) {
        this.setValue(this.dRepHeadline_Filed, dRepHeadline)
        this.setValue(this.profileBio_Field, profileBio)
        this.setValue(this.contributionsToCardano_FIeld, contributions)
    }
    checkIAgree() {
        this.click(this.iAgree_Checkbox)
    }
    checkIAgreeTermsAndCondition() {
        this.click(this.iAgreeTermsAndCondition_Checkbox)
    }
    checkIAgreePrivacyPolicy() {
        this.click(this.iAgreePrivacyPolicy_Checkbox)
    }
    checkIfDRepApplicationIsSubmitted() {
        strictEqual(this.getText(this.reviewApplicationMessage_Text), 'We are reviewing your application')
    }
    selectNTagsForInterest(n) {
        for (let i = 1; i <= n ; i++) {
            this.click($('//button[contains(@class,"tag")][' + i + ']'))
        }
    }
    checkIfFiveInterestTagAreSelected() {
        strictEqual(this.getText(this.message_Text), 'You have selected the maximum number of tags. Please deselect if you wish to choose another.')
    }
    enterLinkedinProfileLink(link) {
        this.setValue(this.linkedinUsername_Field, link )
    }
    enterTwitterProfileLink(link) {
        this.setValue(this.twitterUsername_Field,link)
    }
    enterDiscordProfileLink(link) {
        this.setValue(this.discordUsername_Field, link)
    }
    enterTelegramProfileLink(link) {
        this.setValue(this.telegramUsername_Field, link)
    }
    enterGithubProfileLink(link) {
        this.setValue(this.githubUsername_Field, link)
    }
    enterYoutubeProfileLink(link) {
        this.setValue(this.youtubeUsername_Field, link)
    }
    clickOnYes() {
        this.click(this.yes_Button)
    }
    checkAlreadyRegistredText() {
        strictEqual(this.getText($('//div[@class="modal-title h4"]')), 'Already registered!')
        this.click($('//h5[text()="Close"]'))
    }

}

module.exports = new DRepRegistrationPage();
