//
// Public profile page
// public_profile_page.js
//

const BasePage = require("./base_page");
const { strictEqual } = require("assert");
const dRepData = require("../../config/data/dRepData");

class PublicProfilePage extends BasePage {
    // Selectors
    get dRepName_Text() { return $('//p[@class="profile-card-profile-name"]') }
    get dRepUsername_Text() { return $('//p[@class="profile-card-profile-username"]') }
    get dRepHeadline_Text() { return $('//p[@class="profile-card-job-description"]') }
    get dRepAbout_Text() { return $('//p[@class="info-text mb-4"]') }
    get dRepContributionsToCardano_Text() { return $('//div[@class="info-content col"]//p[@class="info-text"]') }
    get editProfile_Button() { return $('//h5[text()="Edit profile"]/..') }
    get shareProfile_Button() { return $('//h5[text()="Share"]/..') }
    get copyAddress_Button() { return $('//h5[text()="Copy"]/..') }
    get email_Button() { return $('//h5[contains(text(),"@")]/..') }
    get publicAddress_Value() { return $('//p[@class="card-content-text"]') }
    get about_Text() { return $('//p[@class="info-text mb-4"]') }
    get contributionsToCardano_Text() { return $('//div[@class="info-content col"]/p[@class="info-text"]') }
    get votingPower_Value() { return $('(//p[@class="info-text"])[1]') }
    get stakedADA_Value() { return $('(//p[@class="info-text"])[2]') }
    get delegatedADA_Value() { return $('(//p[@class="info-text"])[3]') }
    get deledations_Value() { return $('(//p[@class="info-text"])[4]') }
    get editName_Field() { return $('//input[@placeholder="e.g Peggy Gou"]') }
    get editUsername_Field() { return $('//input[@aria-label="Username"]') }
    get editEmail_Field() { return $('//input[@placeholder="e.g. peggygou@example.com"]') }
    get hideProfile_Switch() { return $('//input[@id="default-switch"]') }
    get cancel_Button() { return $('//h5[text()="Cancel"]/..') }
    get saveChanges_Button() { return $('//h5[text()="Save Changes"]/..') }
    get editProfile_Dropdown() { return $('(//button[@id="dropdown-basic"])[2]') }
    get editProfileBasicInformation_Option() { return $('//p[text()="Basic information"]') }
    get editProfileBiography_Option() { return $('//p[text()="Biography"]') }
    get editProfileSocials_Option() { return $('//p[text()="Socials"]') }
    get editProfileExpertiseInterests_Option() { return $('//p[text()="Expertise / Interests"]') }
    get editDRepHeadline_Field() { return $('//textarea[@id="firstTextarea"]') }
    get editDRepProfileBio_Field() { return $('//textarea[@id="secondTextarea"]') }
    get editDRepContributionsToCardano_Field() { return $('//textarea[@id="thirdTextarea"]') }
    get facebookUsername_Field() { return $('//input[@placeholder="Facebook username"]') }
    get linkedinUsername_Field() { return $('//input[@placeholder="Linkedin username"]') }
    get twitterUsername_Field() { return $('//input[@placeholder="Twitter username"]') }
    get telegramUsername_Field() { return $('//input[@placeholder="Telegram username"]') }
    get discordUsername_Field() { return $('//input[@placeholder="Discord username"]') }
    get githubUsername_Field() { return $('//input[@placeholder="Github username"]') }
    get youtubeUsername_Field() { return $('//input[@placeholder="Youtube username"]') }
    get facebookContactInformation_Icon() { return $('//a[contains(@href,"facebook")]') }
    get twitterContactInformation_Icon() { return $('//a[contains(@href,"twitter")]') }
    get linkedinContactInformation_Icon() { return $('//a[contains(@href,"linkedin")]') }
    get discordContactInformation_Icon() { return $('//a[contains(@href,"discord")]') }
    get telegramContactInformation_Icon() { return $('//a[contains(@href,"t.me")]') }
    get youtubeContactInformation_Icon() { return $('//a[contains(@href,"youtube")]') }
    get tagName_Text() { return $('//div[@id="tags"]/button[1]') }

    //Methods
    checkDrepData() {
        this.clickSkipOrLast()
        strictEqual(this.getText(this.editProfile_Button), 'Edit profile');
        strictEqual(this.getText(this.shareProfile_Button), 'Share');
        strictEqual(this.getText(this.copyAddress_Button), 'Copy');
        //TODO:This is not showing on FE
        // strictEqual(this.getText(this.email_Button), 'testC@test.com');
        // strictEqual(this.getText(this.publicAddress_Value), '627510960279286b23505748ec667364475e638d9e38a8c3517953368bbadd68');
        strictEqual(this.getText(this.about_Text), 'But I was obliged to act by the agency of a friend, who was upon the spot, and present at the opening of the will.');
        strictEqual(this.getText(this.contributionsToCardano_Text), 'An ivory-faced and silvery-haired old woman opened the door');
        //TODO:This is not showing on FE
        // strictEqual(this.getText(this.votingPower_Value), '49.80');
        // strictEqual(this.getText(this.stakedADA_Value), '0.0000');
        // strictEqual(this.getText(this.delegatedADA_Value), '49.80');
        // strictEqual(this.getText(this.deledations_Value), '1');
    }
    checkIfYouAreOnPublicProfilePage() {
        strictEqual((browser.getUrl().includes('/drep')), true)
    }
    checkDRepBasicInfoAfterEdit() {
        //pause is added because it needs time on UI to change dRep basic info
        browser.pause(1000)
        strictEqual(this.getText(this.dRepName_Text), dRepData.name)
        strictEqual(this.getText(this.dRepUsername_Text), '@' + dRepData.username)
        strictEqual(this.getText(this.email_Button), dRepData.email)
    }
    checkDRepBiographyAfterEdit() {
        //pause is added because it needs time on UI to change dRep Bio
        browser.pause(1000)
        strictEqual(this.getText(this.dRepHeadline_Text), dRepData.dRepHeadline)
        strictEqual(this.getText(this.dRepAbout_Text), dRepData.profileBio)
        strictEqual(this.getText(this.dRepContributionsToCardano_Text), dRepData.contributions)
    }
    checkSocialLinksAfterEdit() {
        //pause is added because it needs time on UI to change dRep Social Links
        browser.pause(1000)
        strictEqual(this.facebookContactInformation_Icon.getAttribute('href'), dRepData.validFacebookProfileLink);
        strictEqual(this.twitterContactInformation_Icon.getAttribute('href'), dRepData.validTwitterProfileLink);
        strictEqual(this.linkedinContactInformation_Icon.getAttribute('href'), dRepData.validLinkedinProfileLink);
        strictEqual(this.telegramContactInformation_Icon.getAttribute('href'), dRepData.validTelegramProfileLink);
        strictEqual(this.discordContactInformation_Icon.getAttribute('href'), dRepData.validDiscordProfileLink);
        strictEqual(this.youtubeContactInformation_Icon.getAttribute('href'), dRepData.validYoutubeProfileLink);
    }
    chechTagsBeforeAndAfterEdit() {
        //pause is added because it needs time on UI to load
       browser.pause(1000)
       //This part save first tag name
       var tagName = this.getText(this.tagName_Text)
       //Then deselect that tag
       this.clickEditProfileButton()
       this.clickEditDropdown()
       this.chooseExpertiseInterestsFromDropdown()
       this.click($('//div[@class="d-flex flex-wrap drep-tags-wrapper"]//button[text()="' + tagName + '"]'))
       this.clickSaveChanges()
        //pause is added because it needs time on UI to change dRep Expertise/Interests
       browser.pause(1000)
       strictEqual($('//button[text()="' + tagName + '"]').isDisplayed(), false)
       //And select it again to have same tags when test is runed again
       this.clickEditProfileButton()
       this.clickEditDropdown()
       this.chooseExpertiseInterestsFromDropdown()
       this.click($('//div[@class="d-flex flex-wrap drep-tags-wrapper"]//button[text()="' + tagName + '"]'))
       this.clickSaveChanges()
       //pause is added because it needs time on UI to change dRep Expertise/Interests
       browser.pause(1000)
   }
    clickEditProfileButton() {
        this.click(this.editProfile_Button)
    }
    editDRepName(name) {
        this.setValue(this.editName_Field, name)
    }
    editDRepUsername(username) {
        this.setValue(this.editUsername_Field, username)
    }
    editDRepEmail(email) {
        this.setValue(this.editEmail_Field, email)
    }
    clickSaveChanges() {
        this.click(this.saveChanges_Button)
    }
    clickEditDropdown() {
        this.click(this.editProfile_Dropdown)
    }
    chooseBiographyFromDropdown() {
        this.click(this.editProfileBiography_Option)
    }
    chooseSocialsFromDropdown() {
        this.click(this.editProfileSocials_Option)
    }
    chooseExpertiseInterestsFromDropdown() {
        this.click(this.editProfileExpertiseInterests_Option)
    }
    editDRepHeadline(headline) {
        this.setValue(this.editDRepHeadline_Field, headline)
    }
    editDRepProfileBio(profileBio) {
        this.setValue(this.editDRepProfileBio_Field, profileBio)
    }
    editDRepContributionToCardano(contributionToCardano) {
        this.setValue(this.editDRepContributionsToCardano_Field, contributionToCardano)
    }
    editFacebookProfileLink(link) {
        this.setValue(this.facebookUsername_Field, link)
    }
    editLinkedinProfileLink(link) {
        this.setValue(this.linkedinUsername_Field, link)
    }
    editTwitterProfileLink(link) {
        this.setValue(this.twitterUsername_Field, link)
    }
    editDiscordProfileLink(link) {
        this.setValue(this.discordUsername_Field, link)
    }
    editTelegramProfileLink(link) {
        this.setValue(this.telegramUsername_Field, link)
    }
    editGithubProfileLink(link) {
        this.setValue(this.githubUsername_Field, link)
    }
    editYoutubeProfileLink(link) {
        this.setValue(this.youtubeUsername_Field, link)
    }
}

module.exports = new PublicProfilePage();
