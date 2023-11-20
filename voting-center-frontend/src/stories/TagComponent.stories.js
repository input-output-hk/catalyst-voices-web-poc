import React from 'react'

import TagComponent from '../components/Tag'

export default {
    title: 'Components/TagComponent',
    component: TagComponent,
}

const Template = (args) => <TagComponent {...args} />

export const Default = Template.bind({})
Default.args = {
    children: 'Development',
}
