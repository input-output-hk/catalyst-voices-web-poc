import React from 'react'

import ToggleButton from '../components/ToggleButton'

export default {
    title: 'Components/ToggleButton',
    component: ToggleButton,
    argTypes: {
        size: { type: 'select', options: ['Default', 'small'] },
    },
}

const Template = (args) => <ToggleButton {...args} />

export const Default = Template.bind({})
Default.args = {
    checked: false,
    label: 'Label',
    reverse: false,
    size: 'Default',
    disabled: false,
    onChange: () => {},
}
