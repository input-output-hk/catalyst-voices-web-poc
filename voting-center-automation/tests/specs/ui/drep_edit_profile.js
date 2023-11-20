const HomePage = require('../../../ui_support/pages/home_page')
const DashboardPage = require('../../../ui_support/pages/dashboard_page')
const NufiWalletService = require('../../../ui_support/ui_services/nufi_wallet_services')
const EditProfileService = require('../../../ui_support/ui_services/drep_edit_profile_services')
const nufiWalletData = require('../../../config/data/nufiWalletData')
const dRepData = require('../../../config/data/dRepData')
const PublicProfilePage = require('../../../ui_support/pages/public_profile_page')

describe('Check Dashboard page for dRep user -> regression', () => {
    it('Connect wallet as dRep user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseDRepEditProfil)
        NufiWalletService.connectToNufi()
    });
    it('Assert Dashboard page for dRep user', () => {   
        //TODO: Remove clickSkip() when FE fix issue 
        HomePage.clickSkipOrLast()
        DashboardPage.checkUserInfo(dRepData.drepUserEditDashboardTitle)
    });
    it('Check public profile page as dRep user', () => {
        HomePage.clickOnPublicProfileButton()
        //TODO: Remove clickSkip() when FE fix issue 
        HomePage.clickSkip()
    });
    it('Edit basic information on public profile page', () => {
        EditProfileService.editDrepBasicInfo()
        PublicProfilePage.checkDRepBasicInfoAfterEdit()
    });
    it('Edit Biography on public profile page', () => {
        EditProfileService.editDrepBiography()
        PublicProfilePage.checkDRepBiographyAfterEdit()
    });
    it('Edit Socials on public profile page', () => {
        EditProfileService.editSocialLinks()
        PublicProfilePage.checkSocialLinksAfterEdit()
    });
    it('Edit Expertise / Interests on public profile page', () => {
        PublicProfilePage.chechTagsBeforeAndAfterEdit()
    });
})