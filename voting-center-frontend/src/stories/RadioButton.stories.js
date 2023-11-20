import React from 'react'
import RadioButton from '../components/RadioButton'

export default {
    title: 'Components/RadioButton',
    component: RadioButton,
    argTypes: {
        size: {
            type: 'select',
            options: ['Default', 'small'],
        },
    },
}

const Template = (args) => <RadioButton {...args} />

export const Default = Template.bind({})
Default.args = {
    checked: false,
    label: 'Label',
    reverse: false,
    size: 'Default',
    disabled: false,
    onChange: () => {},
}
