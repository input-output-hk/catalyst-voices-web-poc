import React from 'react'

import ChallengeCard from '../components/ChallengeCard'
import cardbackground1 from '../assets/images/card-background-1.png'

export default {
    title: 'Components/ChallengeCard',
    component: ChallengeCard,
}

const Template = (args) => <ChallengeCard {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Challenge Card Title',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    proposals: 74,
    budget: 1000000,
    image: cardbackground1,
}
