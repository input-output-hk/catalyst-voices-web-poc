import React from 'react'
import MultiRangeSlider from '../components/MultiRangeSlider'

export default {
    title: 'Components/Sliders/MultiRangeSlider',
    component: MultiRangeSlider,
}

const Template = (args) => <MultiRangeSlider {...args} />

export const Default = Template.bind({})
Default.args = {
    min: 0,
    max: 300,
    onChange: () => {},
}
