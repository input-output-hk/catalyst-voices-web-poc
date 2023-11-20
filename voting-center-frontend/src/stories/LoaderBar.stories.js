import React from 'react'
import LoaderBar from '../components/LoaderBar'

export default {
    title: 'Components/LoaderBar',
    component: LoaderBar,
}

const Template = (args) => <LoaderBar {...args} />

export const Default = Template.bind({})
Default.args = {
    now: 40,
}
