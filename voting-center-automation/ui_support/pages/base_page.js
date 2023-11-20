/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
const urls = require('../../config/url')
const ENV = process.env.ENV
const { strictEqual } = require("assert");

module.exports = class BasePage {
    get loader() { return $('//div[@class="spinner-overlay"]') }
    get next_Button() { return $('//button[@type="button" and @title="Next"]') }
    get last_Button() { return $('//button[@type="button" and @title="Last"]') }
    get introductionTextPopUp() { return $('(//div[@class="react-joyride__tooltip"]/div)[1]') }
    get skip_Button() { return $('//button[@title="Skip"]') }
    get close_Button() { return $('//button[@title="Close"]') }

    checkIntroductionText(array) {
        for (let i = 0; i < array.length; i++) {
            strictEqual(this.getText(this.introductionTextPopUp), array[i])
            browser.pause(1000)
            if (i == array.length - 1) {
                this.clickLast()
            } else {
                this.clickNext()
            }
        }
    }
    clickSkipOrLast() {
        browser.pause(2000)
        if (this.last_Button.isDisplayed()) {
            this.clickLast()
        } else if (this.skip_Button.isDisplayed()) {
            this.clickSkip()
        }
    }
    clickSkip() {
        browser.pause(2000)
        this.click(this.skip_Button)
    }
    clickNext() {
        this.click(this.next_Button)
    }
    clickLast() {
        this.click(this.last_Button)
    }
    clickClose() {
        this.click(this.close_Button)
    }
    click(element) {
        element.waitForDisplayed()
        element.click()
    }
    setValue(element, text) {
        element.waitForDisplayed()
        element.setValue(text)
    }
    getText(element) {
        element.waitForDisplayed()
        return element.getText()
    }
    getValue(element) {
        element.waitForDisplayed()
        return element.getValue()
    }
    getBorderColorHexCSSProperty(element) {
        element.waitForDisplayed()
        return element.getCSSProperty('border-color').parsed.hex
    }
    //This function is waiting for the loader to  disappear, and a pause is added to prevent flakiness of the test
    waitForLoader() {
        while (this.loader.isDisplayed()) {
            browser.pause(100)
        }
    }
    openApp() {
        switch (ENV) {
            case 'local':
                browser.url(urls.localFE);
                break;
            case 'dryrun':
                browser.url(urls.dryrunFE);
                break;
            case 'dev':
                browser.url(urls.devFE);
                break;
            case 'qa':
                browser.url(urls.qaFE);
                break;
        }
    }
    checkUrl(pageUrl) {
        strictEqual((browser.getUrl().includes(pageUrl)), true)
    }
}
