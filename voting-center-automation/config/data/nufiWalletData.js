
const { faker } = require('@faker-js/faker');

module.exports = {
    //nufiWalletSeedPhrase is used to store phrases when creating new wallet
    nufiWalletSeedPhrase: '',
    nufiWalletSeedPhraseActiveVoter: ['potato', 'join', 'short', 'trust', 'tomorrow', 'concert', 'shield', 'below', 'robot', 'stairs', 'erode', 'label', 'hour', 'auction', 'sting'],
    nufiWalletSeedPhrasePassiveVoter: ['soldier', 'improve', 'crumble', 'turn', 'shiver', 'gun', 'argue', 'much', 'ski', 'hundred', 'little', 'flee', 'violin', 'radio', 'enter'],
    nufiWalletSeedPhraseDRep: ['guide', 'timber', 'select', 'toss', 'finger', 'vast', 'immense', 'tattoo', 'circle', 'ride', 'version', 'echo', 'elder', 'puzzle', 'parrot'],
    nufiWalletSeedPhraseDRepEditProfil: ['viable', 'room', 'use', 'first', 'analyst', 'blouse', 'lesson', 'occur', 'fence', 'eight', 'right', 'build', 'syrup', 'gather', 'slot'],
    nufiUsername: faker.name.firstName(),
    nufiPassword: faker.word.noun(10)
   
}