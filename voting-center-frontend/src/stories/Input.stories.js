import React from 'react'

import Input from '../components/Inputs/Input'

export default {
    title: 'Components/Inputs/Input',
    component: Input,
    argTypes: {
        type: 'select',
        options: ['email', 'text'],
    }
}

const Template = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
    label: 'Label',
    placeholder: 'This is placeholder',
    type: 'text',
}
