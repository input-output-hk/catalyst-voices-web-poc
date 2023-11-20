
const { faker } = require('@faker-js/faker');

module.exports = {

    name: faker.name.firstName(),
    invalidName: faker.random.alpha(),
    username: faker.word.noun(10),
    invalidUsername: faker.random.alpha(5),
    email: faker.internet.email().toLowerCase(),
    invalidEmail: faker.random.alpha(5),
    dRepHeadline: faker.lorem.sentence(5),
    profileBio: faker.lorem.paragraph(2),
    contributions: faker.lorem.paragraph(2),
    invalidDRepHeadline: faker.random.alpha(5),
    invalidProfileBio: faker.random.alpha(5),
    invalidContributions: faker.random.alpha(5),
    validFacebookProfileLink: 'https://www.facebook.com/' + faker.name.firstName(),
    validLinkedinProfileLink: 'https://www.linkedin.com/in/' + faker.name.firstName() + '/',
    validTwitterProfileLink: 'https://twitter.com/' + faker.name.firstName() + '',
    validDiscordProfileLink: 'https://discordapp.com/users/' + faker.datatype.number({ min: 100000000000000000, max: 999999999999999999 }) + '',
    validTelegramProfileLink: 'https://t.me/' + faker.name.firstName() + '',
    validGithubProfileLink: 'https://github.com/' + faker.name.firstName() + '',
    validYoutubeProfileLink: 'youtube.com/user/' + faker.name.firstName() + '/playlists',
    invalidSocialLink: faker.random.alpha(5),
    redHexColor: '#fd6b6b',
    dRepsLandingPageHeader: ['Vote as an expert Help grow Cardano', 'Represent your community', 'Earn rewards'],
    //dRepsLandingPageCardText explains why user should become a dRep and it is always the same
    //TODO: Replace lorem with valid text when FE change it on app
    dRepsLandingPageCardText: [
        'You can register to be a dRep. dReps are voters\' representatives and can vote on their behalf.',
        'If you are a domain expert or experienced with Project Catalyst and Cardano, register to become a dRep today.',
        'Voting on behalf of others comes with responsibility, and you can earn rewards for participating.'
    ],
    bottomLandingPageTitle: 'Ready to get started?',
    bottomLandingPageText: 'Become a dRep and support the community.',
    becomeADrepText: 'Register as a dRep',
    //Search for dRep values
    //TODO: Edit search values when test data are created
    searchDRepByName: 'Lungile Nuur',
    searchDRepByTag: 'Gaming',
    searchDRepByVotingKey: 'acbb1lx45vasdq23cu8476ulp60px6aggunztdf123fasdvdn2c4asdjyh34jz9k9xjsff923lvs0lhmwg82l7ewhwyutheek6j2asd2f3xepsd141231r',
    searchDRepByInvalidInput: faker.random.alpha(10),
    homePageActiveHeader: ['Voting Center', 'Delegate your voting power to dReps', 'Let other people delegate their voting power to you', 'You can register to vote in the next Fund.'],
    homePagePassiveHeader: ['Voting Center', 'Use your ada as voting power', 'Delegate your voting power to dReps', 'Let other people delegate their voting power to you', 'You can register to vote in the next Fund.'],
    homePageDrepHeader: ['Voting Center', 'You can register to vote in the next Fund.'],
    homePageActiveCardText: [
        'Help to grow the Cardano community by becoming an active voter, delegate your vote or even by putting yourself up there so people can delegate their voting power to you!',
        'You can delegate your voting power to Delegate Representatives (dReps) to vote on your behalf. Choose your dReps and delegate today.',
        'You can register to be a dRep. dReps are voters\' representatives and can vote on their behalf.'
    ],
    homePagePassiveCardText: [
        'Help to grow the Cardano community by becoming an active voter, delegate your vote or even by putting yourself up there so people can delegate their voting power to you!',
        'Register to vote today and use your ada as voting power across all Project Catalyst proposals.',
        'You can delegate your voting power to Delegate Representatives (dReps) to vote on your behalf. Choose your dReps and delegate today.',
        'You can register to be a dRep. dReps are voters\' representatives and can vote on their behalf.',
        'Project Catalyst is currently between funding rounds, with the next Fund coming soon.'
    ],
    homePageDrepCardText: [
        'Help to grow the Cardano community by becoming an active voter, delegate your vote or even by putting yourself up there so people can delegate their voting power to you!',
    ],
    activeUserDashboardTitle: 'Active voter dashboard',
    activeUserWalletStatus: 'View registration transaction\naddr...gp9h\nVoting power\n1234\nWallet\nStatus\nNot delegated\nYou are currently holding 100% of your voting power.',
    activeUserAddress: 'addr...gp9h',
    passiveUserDashboardTitle: 'Delegation dashboard',
    passiveUserWalletStatus: 'View delegation transaction\nVoting power\n1234\nWallet status\nDelegated\naddr...sjc4\nVoting delegation\nYour total voting power is 1234\n100%\nStatus\nReady to delegate\nDelegate(s)\n5\nManage delegation',
    passiveUserAddress: 'addr...sjc4',
    drepUserDashboardTitle: 'dRep dashboard',
    drepUserEditDashboardTitle: 'dRep dashboard',
    dRepUserPublicKey: 'addr...6vwq\nStaked ADA\n499\n499 ADA in wallet\nDelegated ADA\n4403\n10 delegations \nTotal voting power\n4902\nAvailable for voting\ntestCcc\nDetailed view\n@testCC\nCopy profile vanity URL\testCtestCtestCasfafx\nView profile',
    dRepAddress: 'addr...6vwq',
    activeUserChallendgesTitle: 'Active Voter',
    passiveUserChallendgesTitle: 'Passive Voter',
    drepUserChallendgesTitle: 'dRep',
    searchChallendgesName: 'DAOs <3 Cardano',
    selecDeselectDRepName: 'Igor IOHK',
    homePageWalletNotConnectedIntroductionCards: [
        'By clicking on the "Connect wallet" button, modal for connecting wallet will appear.'
    ],
    delegationPageIntroductionCards: [
        'Here we can search for a specific drep, filter by tags, and sort by name or created date.',
        'All approved and filtered dReps are listed here. Click on a dRep to see more information about them.',
        'Here you can see more information about the dRep.'
    ],
    challengesPageIntroductionCards: [
        'Here it is possible to search for proposals or challenges.',
        'List of all challenges from the current fund.'
    ],
    dashboardPageIntroductionCard: ['View transaction details on the Cardanoscan.'],
    dRepDashboardPageIntroductionCards: [
        'View transaction details on the Cardanoscan.',
        'Here we can see the total amount of ADA staked, delegated and total VP.',
        'You also can share your profile and public voting key, as well see the public profile.'
    ],
    dRepPublicProfileIntroductionCards: [
        'Here is the basic information about the dRep and the user.',
        'Tags that describe the dRep.',
        'VP, Delegated ADA and Delegations are shown here.',
        'This section provides information about the dRep and contributions to Cardano',
        'Contact information and the public voting key are shown here.',
        'Here we can edit and share the dRep profile.',
        'In this modal we can edit the dRep profile.',
        'Here we can share the dRep profile and copy the link of the profile.'
        ],
}