import React from 'react'

import SmallCard from '../components/SmallCard'

export default {
    title: 'Components/SmallCard',
    component: SmallCard,
}

const Template = (args) => <SmallCard {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Small Card Title',
}
