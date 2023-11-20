import React from 'react'

import ComboBox from '../components/Inputs/ComboBox'

export default {
    title: 'Components/Inputs/ComboBox',
    component: ComboBox,
}

const Template = (args) => <ComboBox {...args} />

export const Default = Template.bind({})
Default.args = {
    label: 'Combo Box Label',
    placeholder: 'This is a combo box',
    content: '@',
}
