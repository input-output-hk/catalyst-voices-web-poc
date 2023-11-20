import Stars from '../components/Stars'

export default {
    title: 'Components/Stars',
    component: Stars,
}

const Template = (args) => <Stars {...args} />

export const Default = Template.bind({})

Default.args = {
    rating: 3,
}
