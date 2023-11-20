import React from 'react'
import ProfileButton from '../components/ProfileButton'

export default {
    title: 'Components/ProfileButton',
    component: ProfileButton,
}

const Template = (args) => <ProfileButton {...args} />

export const Default = Template.bind({})
Default.args = {
    value: '532 ADA',
    adressName: 'addr...6hf8k',
}
