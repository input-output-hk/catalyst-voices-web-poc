import React from 'react'

import ErrorNotice from '../components/Notices/ErrorNotice'

export default {
    title: 'Components/Notices/ErrorNotice',
    component: ErrorNotice,
}

const Template = (args) => <ErrorNotice {...args} />

export const Default = Template.bind({})
Default.args = {
    label: 'The selected wallet is not elegible for a DRep application because it hasn’t voted before. Please select another wallet.',
}
