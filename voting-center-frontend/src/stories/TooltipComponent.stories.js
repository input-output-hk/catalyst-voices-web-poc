import React from 'react'
import CardButton from '../components/CardButton'

import TooltipComponent, {
    TooltipPlacements,
    TooltipPositions,
} from '../components/TooltipComponent'

export default {
    title: 'Components/TooltipComponent',
    component: TooltipComponent,
    argTypes: {
        show: {
            control: { type: 'boolean' },
        },
        position: {
            control: { type: 'select', options: TooltipPositions },
        },
        placement: {
            control: { type: 'select', options: TooltipPlacements },
        },
    },
}

const Template = (args) => <TooltipComponent {...args} />

export const Default = Template.bind({})
Default.args = {
    show: true,
    text: 'Tooltip',
    placement: TooltipPlacements.top,
    children: (
        <CardButton
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '100vh',
            }}
        >
            Tooltip Storybook Example
        </CardButton>
    ),
}
