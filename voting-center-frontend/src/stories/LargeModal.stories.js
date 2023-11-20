import React from 'react'

import LargeModal from '../components/LargeModal'

export default {
    title: 'Components/LargeModal',
    component: LargeModal,
}

const Template = (args) => <LargeModal {...args} />

export const Default = Template.bind({})
Default.args = {
    show: true,
    textHeading: '',
    backButton: true,
    buttonText: 'Primary',
    secondButtonText: 'Secondary',
}
