//
// Delegation page
// delegation_page.js
//

const BasePage = require("./base_page");
const { strictEqual } = require("assert");

class DelegationPage extends BasePage {
    // Selectors
    get search_Field() { return $('//input[@placeholder="Search by name, voting key, tag..."]') }
    get sort_Dropdown() { return $('(//button[@id="dropdown-basic"])[2]') }
    get sortAToZ_Option() { return $('//p[text()="Name (A-Z)"]') }
    get sortZTaA_Option() { return $('//p[text()="Name (Z-A)"]') }
    get firstDRepInTable_Option() { return $('(//div[@class="mt-2 ms-0 row"])[1]') }
    get selectDrep_Button() { return $('//button[text()="Select"]') }
    get deselectDrep_Button() { return $('//button[text()="Deselect"]') }
    get menageDelegation_Button() { return $('(//h5[text()="Manage delegation"]/..)[2]') }
    get deleteDelegation_Button() { return $('(//h5[text()="Delete delegation"]/..)[2]') }
    get smartContractsSearchShortcut_Button() { return $('//div[contains(@class,"tag")]/button[text()="Smart contracts"]') }
    get governanceSearchShortcut_Button() { return $('//div[contains(@class,"tag")]/button[text()="Governance"]') }
    get gamingSearchShortcut_Button() { return $('//div[contains(@class,"tag")]/button[text()="Gaming"]') }
    //Methods
    checkIfYouAreOnDelegationPage() {
        strictEqual((browser.getUrl().includes('/delegations')), true)
    }
}

module.exports = new DelegationPage();
