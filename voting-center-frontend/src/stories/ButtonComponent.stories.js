import React from 'react'
import HomeIcon from '../assets/svg/HomeIcon'
import PeopleIcon from '../assets/svg/PeopleIcon'

import ButtonComponent, {
    ButtonSizes,
    ButtonTypes,
    ButtonVariants,
} from '../components/Button'

export default {
    title: 'Components/ButtonComponent',
    component: ButtonComponent,
    argTypes: {
        type: {
            control: { type: 'select', options: ButtonTypes },
        },
        variant: {
            control: { type: 'select', options: ButtonVariants },
        },
        size: {
            control: { type: 'select', options: ButtonSizes },
        },
    },
}

const Template = (args) => <ButtonComponent {...args} />

export const Default = Template.bind({})
Default.args = {
    children: 'Button',
    type: ButtonTypes.Primary,
    disabled: false,
    variant: ButtonVariants.Button,
    size: ButtonSizes.MD,
    iconButton: <HomeIcon />,
}

export const LeadingIconButton = Template.bind({})
LeadingIconButton.args = {
    children: 'Button',
    type: ButtonTypes.Primary,
    disabled: false,
    variant: ButtonVariants.Button,
    size: ButtonSizes.MD,
    iconButton: <HomeIcon />,
    leadingIcon: <HomeIcon />,
}

export const EndIconButton = Template.bind({})
EndIconButton.args = {
    children: 'Button',
    type: ButtonTypes.Primary,
    disabled: false,
    variant: ButtonVariants.Button,
    size: ButtonSizes.MD,
    iconButton: <HomeIcon />,
    endIcon: <PeopleIcon />,
}

export const BothIconButton = Template.bind({})
BothIconButton.args = {
    children: 'Button',
    type: ButtonTypes.Primary,
    disabled: false,
    variant: ButtonVariants.Button,
    size: ButtonSizes.MD,
    iconButton: <HomeIcon />,
    leadingIcon: <PeopleIcon />,
    endIcon: <HomeIcon />,
}
