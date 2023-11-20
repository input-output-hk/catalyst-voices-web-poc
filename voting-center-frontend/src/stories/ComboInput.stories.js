import React from 'react'

import ComboInput from '../components/Inputs/ComboInput'

export default {
    title: 'Components/Inputs/ComboInput',
    component: ComboInput,
}

const Template = (args) => <ComboInput {...args} />

export const Default = Template.bind({})
Default.args = {
    label: 'Combo Input Label',
    placeholder: 'This is a combo input',
    content: '@',
    rightSide: false,
}