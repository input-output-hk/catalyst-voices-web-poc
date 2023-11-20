//
// dReps page
// dReps_page.js
//

const BasePage = require("./base_page")
const { strictEqual, deepStrictEqual } = require("assert");
const dRepData = require('../../config/data/dRepData')

class DRepsPage extends BasePage {
    // Selectors
    get learnMore_Button() { return $('//div[contains(@class,"d-none")]//h5[text()="Learn more"]') }
    get search_Field() { return $('//input[@placeholder="Search by name, voting key, tag..."]') }
    get firstDRepName_Text() { return $('(//div[@class="drep-text-info col"])[1]') }
    get firstDRepTag_Text() { return $('(//div[@class="d-flex mt-2 mt-md-0"])[1]') }
    get gamingSearchTag_Button() { return $('//div[@class="tag-list-container gx-0 row"]//button[text()="Gaming"]') }
    get bitcoinSearchTag_Button() { return $('//div[@class="tag-list-container gx-0 row"]//button[text()="Bitcoin"]') }
    get leftArrow_Button() { return $('//div[@class="scroll-button scroll-button-left"]') }
    get rightArrow_Button() { return $('//div[@class="scroll-button scroll-button-right"]') }
    get sort_Dropdown() { return $('(//button[@id="dropdown-basic"])[2]') }
    get sortAToZ_Dropdown() { return $('//p[@class="m-0" and text()="Name (A-Z)"]') }
    get sortZToA_Dropdown() { return $('//p[@class="m-0" and text()="Name (Z-A)"]') }
    get confirmDelegation_Button() { return $('(//h5[text()="Confirm delegations"])[2]') }
    get firstDRepDelegationPercentage_Field() { return $('(//input[@aria-label="Username"])[1]') }
    get delegationStatus_Text() { return $('//p[text()="Status"]/following-sibling::span[@class="delegates-info-span" or @class="danger-text"]') }
    get cancel_Button() { return $('//h5[text()="Cancel"]') }
    get removeDRep_Button() { return $('//h5[text()="Remove dRep"]') }
    get dRepsList_Card() { return $$('//div[@class="mt-2 ms-0 row"]') }
    get numberOfShowingDReps_Text() { return $('//p[contains(text(),"Showing")]') }
    get dRepNamesList_Card() { return $$('//p[@class="mb-0 drep-name"]') }
    get select_Button() { return $('//p[text()="Vuaksin Pau Novic"]') }
    get close_Button() { return $('//button[@aria-label="Close"]') }
    get max10DRepsMessage_Text() { return $('//div[@class="error-notice message"]/h3') }
    //Methods
    clickOnConfirmDelegation() {
        this.click(this.confirmDelegation_Button)
    }
    clickCancelButton() {
        this.click(this.cancel_Button)
    }
    searchForDRep(searchParam) {
        this.clickSkipOrLast()
        this.setValue(this.search_Field, searchParam)
    }
    checkSearchResultByName() {
        this.waitForLoader()
        browser.pause(3000)
        strictEqual(this.getText(this.firstDRepName_Text).includes(dRepData.searchDRepByName), true)
    }
    checkSearchResultByTag() {
        browser.pause(1500)
        this.waitForLoader()
        strictEqual(this.getText(this.firstDRepTag_Text).includes(dRepData.searchDRepByTag), true)
    }
    checkSearchNoResultMessage() {
        strictEqual(this.getText($('//h3')), 'No search results found')
    }
    clickGamingTag() {
        while (!this.gamingSearchTag_Button.isClickable()) {
            this.click(this.leftArrow_Button)
        }
        this.click(this.gamingSearchTag_Button)
    }
    clickBitcoinTag() {
        while (!this.bitcoinSearchTag_Button.isClickable()) {
            this.click(this.rightArrow_Button)
        }
        this.click(this.bitcoinSearchTag_Button)
    }
    countDRepNumber() {
        this.waitForLoader()
        const count = this.dRepsList_Card.length
        let text = this.numberOfShowingDReps_Text.getText().split(' ')[1]
        strictEqual(count, +text)
    }
    clickOnSortDropdown() {
        this.click(this.sort_Dropdown)
    }
    clickSortAToZ() {
        this.click(this.sortAToZ_Dropdown)
    }
    clickSortZToA() {
        this.click(this.sortZToA_Dropdown)
    }
    isSorted(sort) {
        this.waitForLoader()
        let array = []
        const count = this.dRepNamesList_Card.length
        for (let i = 0; i < count; i++) {
            //This selector is hardcoded because in this loop we are going through all dReps in list
            let dRepName = $('(//p[@class="mb-0 drep-name"])[' + (i + 1) + ']').getText().toLowerCase().replace(/\s/g, '')
            array.push(dRepName)
        }
        const currentArray = array.slice()
        const sortedArray = array.sort()
        if (sort == "ASC") {
            deepStrictEqual(currentArray, sortedArray)
        } else if (sort == "DESC") {
            const reverse = sortedArray.reverse()
            deepStrictEqual(currentArray, reverse)
        }
    }
    enterFirstDRepPercentageToDelegate(percentage) {
        this.setValue(this.firstDRepDelegationPercentage_Field, percentage)
    }
    checkOverDelegatedStatus() {
        strictEqual(this.delegationStatus_Text.getText(), 'Over delegated')
    }
    checkUnderDelegatedStatus() {
        strictEqual(this.delegationStatus_Text.getText(), 'Under delegated')
    }
    //dRep is name of DRep that we want to select and then deselect
    selectDeselectDRep(dRep) {
        this.click($('//p[text()="' + dRep + '"]'))
        this.click(this.removeDRep_Button)
        $('//p[text()="' + dRep + '"]').moveTo()
        this.click(this.select_Button)
        this.click(this.close_Button)
    }
}

module.exports = new DRepsPage();
