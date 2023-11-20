import RegistrationInfo from '../components/RegistrationInfo'

export default {
    title: 'Components/RegistrationInfo',
    component: RegistrationInfo,
}

const Template = (args) => <RegistrationInfo {...args} />

export const Default = Template.bind({})
Default.args = {
    drepHeading: 'An error occured',
    drepText: 'We’re sorry to see you go.',
    drepButtonText: 'Go to home',
    
}
export const Primary = Template.bind({})
Primary.args = {
    drepHeading: 'An error occured',
    drepText: '',
}
