//
// Dashboard page
// dashboard_page.js
//

const BasePage = require("./base_page");
const { strictEqual } = require("assert");
const dRepData = require("../../config/data/dRepData");

class DashboardPage extends BasePage {
    // Selectors
    get dashboardTitle_Text() { return $('//h2[@class="dreps-challenges-header"]') }
    get dashboardDelegated_Text() { return $('(//div[@class="d-flex flex-row align-items-center justify-content-between w-100 info"])[3]') }
    get dashboardPassiveManageDelegationsButton() { return $('(//button[@class="button-component btn-primary btn-md w-100 chart-button-styles d-flex align-items-center justify-content-center gx-2 btn btn-primary"])[2]') }
    get dashboardDrepViewProfileButton() { return $('(//button[@type="button"])[9]') }
    get dashboardDrepDetailedViewButton() { return $('(//h5[@class="mb-0"])[4]') }

    //Methods
    checkIfYouAreLogged(user, address) {
        browser.pause(500)
        strictEqual(this.getText(this.dashboardTitle_Text), user)
        strictEqual(this.getText($('//p[@class="address"]')), address)
    }

    checkUserInfo(user) {
        strictEqual(this.getText(this.dashboardTitle_Text), user)
        if (user == dRepData.activeUserDashboardTitle) {
            strictEqual(this.getText($('(//div[@class="row"])[2]')), 'View registration transaction\nVoting power\n--\nWallet status\nRegistered')
            strictEqual(this.getText($('(//div[@class="wrapper col"])[2]')), 'Voting delegation\nYou are currently holding 100% of your voting power.\n100%\nStatus\nNot delegated\nDelegate(s)\n0\nDelegate your voting power')
        } else if (user == dRepData.passiveUserDashboardTitle) {
            browser.pause(200)
            strictEqual(this.getText($('(//div[@class="row"])[2]')), 'View delegation transaction\nVoting power\n--\nWallet status\nDelegated')
            strictEqual(this.getText($('(//div[@class="wrapper col"])[2]')), 'Voting delegation\nYour total voting power is --\n100%\nStatus\nReady to delegate\nDelegate(s)\n10\nConfirm delegations')
        } else if (user == dRepData.drepUserEditDashboardTitle) {
            // strictEqual(this.getText($('(//div[@class="row"])[3]')), 'Staked ADA\n4.47\n4.47 ADA in wallet\nDelegated ADA\nTotal voting power')
        } else {
            strictEqual(this.getText($('(//div[@class="row"])[3]')), 'Staked ADA\n499\n499 ADA in wallet\nDelegated ADA\n4403\n10 delegations\nTotal voting power\n4902\nAvailable for voting')
            strictEqual(this.getText($('(//div[@class="modal-body"])[3]')), 'testCcc\nDetailed view\n@testCC\nCopy profile vanity URL\ntestCtestCtestCasfafx\nView profile')
        }
    }
}

module.exports = new DashboardPage();
