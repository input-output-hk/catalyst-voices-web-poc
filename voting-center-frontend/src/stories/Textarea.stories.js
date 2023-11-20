import React from 'react'

import Textarea from '../components/Inputs/Textarea'

export default {
    title: 'Components/Inputs/Textarea',
    component: Textarea,
}

const Template = (args) => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {
    label: 'Label',
    capture: 'Capture goes here',
    placeholder: 'This is textarea',
    maxLength: 140,
}
