import React from 'react'

import Stepper from '../components/Stepper'

export default {
    title: 'Components/Stepper',
    component: Stepper,

}

const Template = (args) => <Stepper {...args}/>

export const Default = Template.bind({})
Default.args = {
    stepperTitle: "Voting phase",
    activeStepIndex: 1,
    steps: [
        {
            name: 'Registration',
            description:
                'Voters have to register their wallets in order to vote in Funds. You are already registered!',
        },
        {
            name: 'Snapshot',
            description:
                'Voters have to register their wallets in order to vote in Funds. You are already registered!',
        },
        {
            name: 'Voting',
            description:
                'Voters have to register their wallets in order to vote in Funds. You are already registered!',
        },
    ]
}


