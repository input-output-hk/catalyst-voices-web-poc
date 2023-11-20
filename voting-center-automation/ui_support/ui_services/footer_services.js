//
// footer services
// footer_services.js
//

const { strictEqual } = require("assert");

class FooterService {
    //Methods
    checkNewWindowUrlAndClose(newWindowUrl) {
        let windowIDs = browser.getWindowHandles()
        browser.switchToWindow(windowIDs[2])
        strictEqual((browser.getUrl().includes(newWindowUrl)), true)
        browser.closeWindow();
        browser.switchWindow('/')
    }
}

module.exports = new FooterService();
