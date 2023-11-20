const HomePage = require('../../../ui_support/pages/home_page')
const DRepsPage = require('../../../ui_support/pages/dReps_page')
const dRepData = require('../../../config/data/dRepData')

describe('Search for dReps by name -> regression', () => {
    it('Open app', () => {
        HomePage.openApp()
    });
    it('Go to dReps page', () => {
        HomePage.clickOnDReps()
    });
    it('Search dReps by name', () => {
        DRepsPage.searchForDRep(dRepData.searchDRepByName)
    });
    it('I should see dReps with searched name', () => {
        DRepsPage.checkSearchResultByName()
    }); 
});
describe('Search for dReps by tag -> regression', () => {
    it('Open app', () => {
        HomePage.openApp()
    });
    it('Go to dReps page', () => {
        HomePage.clickOnDReps()
    });
    it('Search dReps by tag', () => {
        DRepsPage.searchForDRep(dRepData.searchDRepByTag)
    });
    it('I should see dReps with searched tag', () => {
        DRepsPage.checkSearchResultByTag()
    }); 
});
//This part is commented because in mocked data multiple users have same Voting key but it should be unique 
// describe('Search for dReps by Voting key -> regression', () => {
//     it('Open app', () => {
//         HomePage.openApp()
//     });
//     it('Go to dReps page', () => {
//         HomePage.clickOnDReps()
//     });
//     it('Search dReps by Voting key', () => {
//         DRepsPage.searchForDRep(dRepData.searchDRepByVotingKey)
//     });
//     it('I should see dReps with searched Voting key', () => {
//         //TODO:Write assertions to check if search is working when mocked data is correct
//     }); 
// });
describe('Search for dReps negative scenario -> regression', () => {
    it('Open app', () => {
        HomePage.openApp()
    });
    it('Go to dReps page', () => {
        HomePage.clickOnDReps()
    });
    it('Search dReps by invalid search input', () => {
        DRepsPage.searchForDRep(dRepData.searchDRepByInvalidInput)
    });
    it('I should see no search result message', () => {
        DRepsPage.checkSearchNoResultMessage()
    }); 
});

