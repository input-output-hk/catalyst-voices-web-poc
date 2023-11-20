import Dropdown from '../components/Dropdown'

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    argTypes: {
         type: 'select', dropdownMenu: [true, false] ,
    },
}

const Template = (args) => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
    dropdownMenu: true,
}
