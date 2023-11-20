const HomePage = require('../../../ui_support/pages/home_page')
const NufiWalletService = require('../../../ui_support//ui_services/nufi_wallet_services')
const nufiWalletData = require('../../../config/data/nufiWalletData')
const ChallendgesPage = require('../../../ui_support/pages/challenges_page')

describe('Check Challenges page voting flow for Active user -> regression', () => {
    it('Connect wallet as Active user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseActiveVoter)
        NufiWalletService.connectToNufi()
    });
    it('Click on Challenges page and then on first Challenge in table ', () => {
        HomePage.clickOnChallendgesButton()
        ChallendgesPage.clickOnFirstChallengeInTable()
    });
    it('Click on Yes button on Proposal that already has vote', () => {
        ChallendgesPage.clickOnProposalThumbsUpButton()
    });
    it('Check already voted on this Proposal text', () => {
        ChallendgesPage.checkAlreadyVotedText()
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
})

describe('Check Challenges page voting flow for dRep user -> regression', () => {
    it('Connect wallet as dRep user', () => {
        HomePage.openApp()
        NufiWalletService.restoreOldWallet(nufiWalletData.nufiWalletSeedPhraseDRep)
        NufiWalletService.connectToNufi()
    });
    it('Click on Challenges page and then on first Challenge in table ', () => {
        HomePage.clickOnChallendgesButton()
        ChallendgesPage.clickOnFirstChallengeInTable()
    });
    it('Click on No button on first Proposal', () => {
        ChallendgesPage.clickOnProposalThumbsDownButton()
    });
    it('Check already voted on this Proposal text', () => {
        ChallendgesPage.checkAlreadyVotedText()
    });
    it('Reload session', () => {
        browser.reloadSession()
    });
})