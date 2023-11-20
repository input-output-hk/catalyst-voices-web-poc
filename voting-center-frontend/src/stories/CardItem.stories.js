import CardItem from '../components/Card'

export default {
    title: 'Components/CardItem',
    component: CardItem,
    argTypes: {
        variant: {
            type: 'select',
            options: ['right', 'left'],
        },
    },
}

const Template = (args) => <CardItem {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Example',
    content: 'Some random text',
    variant: 'right',
    buttonText: 'Button',
}
