import React from 'react'

import GeneralNotice from '../components/Notices/GeneralNotice'

export default {
    title: 'Components/Notices/GeneralNotice',
    component: GeneralNotice,
}

const Template = (args) => <GeneralNotice {...args} />

export const Default = Template.bind({})
Default.args = {
    label: 'This is a polite notice',
}
