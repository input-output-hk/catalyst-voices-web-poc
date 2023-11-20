import React from 'react'

import Checkbox from '../components/Checkbox'

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
    argTypes: {
        size: {
            type: 'select',
            options: ['Default', 'small'],
        },
    },
}

const Template = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
    checked: false,
    label: 'Label',
    reverse: false,
    size: 'Default',
    disabled: false,
    indeterminate: true,
    onChange: () => {},
}
