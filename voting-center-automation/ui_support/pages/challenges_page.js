//
// Challenges page
// challenges_page.js
//

const BasePage = require("./base_page");
const { strictEqual } = require("assert");
const dRepData = require("../../config/data/dRepData");

class ChallengesPage extends BasePage {
    // Selectors
    get userRoleHeader_Text() { return $('//h2[@class="dreps-challenges-header"]') }
    get search_Field() { return $('//input[@class="form-control"]') }
    get firstChallengeInTable_Card() { return $('//a[@href="/challenges/1"]') }
    get back_Button() { return $('//p[text()="Back"]') }
    get selectedChallengeTitle_Text() { return $('//h2[@class="header"]') }
    get detailedViewFirstChallenge_Button() { return $('(//h5[@class="mb-0"])[1]') }
    get voteYey_Button() { return $('//h5[text()="Yey"]') }
    get oteNey_Button() { return $('//h5[text()="Ney"]') }
    get firstChallengeInTableName_Text() { return $('//div[text()="DAOs <3 Cardano"]') }
    get firstProposalInTableName_Text() { return $('(//p[@class="proposal-number"])[1]') }
    get proposalThumbsUp_Button() { return $('(//h5[text()="Yes"])[1]') }
    get proposalThumbsDown_Button() { return $('(//h5[text()="No"])[1]') }
    //Methods
    checkUserInfo(user) {
        strictEqual(this.getText(this.userRoleHeader_Text), user)
        if (user == dRepData.activeUserChallendgesTitle) {
            strictEqual(this.getText($('(//div[@class="row"])[17]')), 'You can register to vote in the next Fund.\nProject Catalyst is currently between funding rounds, with the next Fund coming soon.')
        } else if (user == dRepData.passiveUserChallendgesTitle) {
            browser.pause(200)
            strictEqual(this.getText($('(//div[@class="row"])[4]')), 'View delegation transaction\nVoting power\n--\nWallet status\nDelegated')
            strictEqual(this.getText($('(//div[@class="wrapper col"])[2]')), 'Voting delegation\nYour total voting power is --\n100%\nStatus\nReady to delegate\nDelegate(s)\n10\nConfirm delegations')
        } else {
            strictEqual(this.getText($('(//div[@class="row"])[16]')), '')
            strictEqual(this.getText($('(//div[@class="modal-body"])[2]')), 'LN\nLungile Nuur\n@lungilenuur\nCopy profile vanity URL\nBut I was obliged to act by the agency of a friend, who was upon the spot, and present at the opening of the will.')
        }
    }
    searchForChallendges(searchParam) {
        this.setValue(this.search_Field, searchParam)
    }
    checkSearchResultByChallendgesName() {
        strictEqual(this.getText(this.firstChallengeInTableName_Text).includes(dRepData.searchChallendgesName), true)
    }
    checkSearchNoResultMessage() {
        strictEqual(this.getText($('//div[contains(@class,"no-result")]/h3')), 'No search results found')
    }
    clickOnManageDelegationButton() {
        this.click($('(//h5[text()="Confirm delegations"])[2]'))
    }
    clickOnViewProfileButton() {
        this.clickSkip()
        this.click($('(//p[@class="card-button-text mb-0"])[2]'))
    }
    clickOnFirstChallengeInTable() {
        this.click(this.firstChallengeInTableName_Text)
    }
    clickOnProposalThumbsUpButton(){
        this.click(this.proposalThumbsUp_Button)
    }
    clickOnProposalThumbsDownButton(){
        this.click(this.proposalThumbsDown_Button)
    }
    checkAlreadyVotedText() {
        strictEqual(this.getText($('//h3[@class="message-text"]')), 'Your vote for this proposal has already been recorded. Unfortunately, re-voting is not permitted!')
    }
}

module.exports = new ChallengesPage();
