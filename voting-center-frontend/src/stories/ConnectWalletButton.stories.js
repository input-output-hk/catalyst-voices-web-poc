import React from 'react'
import Button from '../components/ConnectWalletButton'

export default {
    title: 'Components/ConnectWalletButton',
    component: Button,
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
    variant: 'primary',
    children: 'Connect Wallet',
}

