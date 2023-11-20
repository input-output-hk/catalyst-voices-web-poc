import React from 'react'

import SocialInput, { Socials } from '../components/Inputs/SocialInput'

export default {
    title: 'Components/Inputs/SocialInput',
    component: SocialInput,
    argTypes: {
        social: {
            type: 'select',
            options: Socials,
        },
    },
}

const Template = (args) => <SocialInput {...args} />

let value = ''
function onChange(e) {
    let inputValue = e.target.value
    return (value = inputValue)
}

export const Default = Template.bind({})
Default.args = {
    label: 'Label',
    placeholder: 'This is a Social input',
    social: Socials.Discord,
    isInvalid: false,
    onChange: (e) => {
        onChange(e)
    },
    value: value,
}
