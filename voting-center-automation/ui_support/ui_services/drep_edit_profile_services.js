//
// dRep edit profile services
// drep_edit_profile_services.js
//

const dRepData = require('../../config/data/dRepData')
const DRepPublicProfilePage = require('../pages/public_profile_page')

class DrepEditProfileService {
    //Methods
    editDrepBasicInfo() {
        DRepPublicProfilePage.clickEditProfileButton()
        DRepPublicProfilePage.editDRepName(dRepData.name)
        DRepPublicProfilePage.editDRepUsername(dRepData.username)
        DRepPublicProfilePage.editDRepEmail(dRepData.email)
        DRepPublicProfilePage.clickSaveChanges()
    }
    editDrepBiography() {
        DRepPublicProfilePage.clickEditProfileButton()
        DRepPublicProfilePage.clickEditDropdown()
        DRepPublicProfilePage.chooseBiographyFromDropdown()
        DRepPublicProfilePage.editDRepHeadline(dRepData.dRepHeadline)
        DRepPublicProfilePage.editDRepProfileBio(dRepData.profileBio)
        DRepPublicProfilePage.editDRepContributionToCardano(dRepData.contributions)
        DRepPublicProfilePage.clickSaveChanges()
    }
    editSocialLinks() {
        DRepPublicProfilePage.clickEditProfileButton()
        DRepPublicProfilePage.clickEditDropdown()
        DRepPublicProfilePage.chooseSocialsFromDropdown()
        DRepPublicProfilePage.editFacebookProfileLink(dRepData.validFacebookProfileLink)
        DRepPublicProfilePage.editLinkedinProfileLink(dRepData.validLinkedinProfileLink)
        DRepPublicProfilePage.editTwitterProfileLink(dRepData.validTwitterProfileLink)
        DRepPublicProfilePage.editTelegramProfileLink(dRepData.validTelegramProfileLink)
        DRepPublicProfilePage.editDiscordProfileLink(dRepData.validDiscordProfileLink)
        DRepPublicProfilePage.editGithubProfileLink(dRepData.validGithubProfileLink)
        DRepPublicProfilePage.editYoutubeProfileLink(dRepData.validYoutubeProfileLink)
        DRepPublicProfilePage.clickSaveChanges()
    }
    
}

module.exports = new DrepEditProfileService();
