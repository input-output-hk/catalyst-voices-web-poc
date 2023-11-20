import React from 'react'

import TabItem from '../components/TabItem'

export default {
    title: 'Components/TabItem',
    component: TabItem,

}

const Template = (args) => <TabItem {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Label',
}
