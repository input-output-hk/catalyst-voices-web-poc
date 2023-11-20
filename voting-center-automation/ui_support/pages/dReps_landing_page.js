//
// dReps landing page
// dReps_landing_page.js
//

const BasePage = require("./base_page");
const { strictEqual } = require("assert");
const dRepData = require("../../config/data/dRepData");

class DRepsLandingPage extends BasePage {
    // Selectors
    get becomeADRepInCard_Button() { return $('//p[@class="card-button-text mb-0"]/..') }
    get becomeADRepInBottom_Button() { return $('//h5[@class="mb-0"]/../..') }
    get bottomPageTitle() { return $('//h2[@class="drep-heading text-center"]') }
    get bottomPageText() { return $('//h2[@class="drep-text text-center"]') }
    get cardTitlesText() { return $$('//div[@class="card-title h5"]') }
    get cardTextsText() { return $$('//div[@class="card-item-text"]') }
    //Methods
    checkCardsTitlesAndText() {
        //Checks if array is empty and if empty will fail test because selector should return array with three elements
        this.checkIfArrayIsNotEmpty(this.cardTitlesText)
        this.checkIfArrayIsNotEmpty(this.cardTextsText)
        this.cardTitlesText.forEach((element, i) => {
            strictEqual(this.getText(element), dRepData.dRepsLandingPageHeader[i])
        });
        this.cardTextsText.forEach((element, i) => {
            strictEqual(this.getText(element), dRepData.dRepsLandingPageCardText[i])
        });
    }
    checkIfArrayIsNotEmpty(array){
        if (array === undefined || array.length == 0) {
            strictEqual(false, true, 'Title is empty array, please check selector')
        }
    }
    checkIfBecomeADRepButtonArePresent() {
        strictEqual(this.getText(this.becomeADRepInCard_Button), dRepData.becomeADrepText)
        strictEqual(this.getText(this.becomeADRepInBottom_Button), dRepData.becomeADrepText)
    }
    checkBottomPageTitleAndText() {
        strictEqual(this.getText(this.bottomPageTitle), dRepData.bottomLandingPageTitle)
        strictEqual(this.getText(this.bottomPageText), dRepData.bottomLandingPageText)
    }

}

module.exports = new DRepsLandingPage();
