import React from 'react'

import CardButton from '../components/CardButton'

export default {
    title: 'Components/CardButton',
    component: CardButton,
    argTypes: {},
}

const Template = (args) => <CardButton {...args} />

export const Default = Template.bind({})
Default.args = {
    children: 'Delegate your vote',
}
