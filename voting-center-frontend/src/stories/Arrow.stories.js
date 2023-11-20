import React from 'react'

import Arrow from '../components/Arrow'

export default {
    title: 'Components/Arrow',
    component: Arrow,
}

const Template = (args) => <Arrow {...args} />

export const Default = Template.bind({})
Default.args = {
    left: true,
}
