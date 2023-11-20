import React from 'react'

import ButtonNotice from '../components/Notices/ButtonNotice'

export default {
    title: 'Components/Notices/ButtonNotice',
    component: ButtonNotice,
}

const Template = (args) => <ButtonNotice {...args} />

export const Default = Template.bind({})
Default.args = {
    text: 'Have you lost your QR code or forgot your PIN code to vote in Catalyst app? You need to register your wallet to vote again',
    buttonText: 'Register wallet again',
    onClick: () => {},
}
