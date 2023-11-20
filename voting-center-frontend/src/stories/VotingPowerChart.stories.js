import VotingPowerChart from '../components/VotingPowerChart'

export default {
    title: 'Components/VotingPowerChart',
    component: VotingPowerChart,
}

const Template = (args) => <VotingPowerChart {...args} />

export const Default = Template.bind({})
Default.args = {
    vp: 1234,
    status: 'Not delegated',
    votingDelegationText: 'Your voting power is 123',
    votingPowerChartButton: 'Manage Delegation',
    buttonLink: '',
    storybook: true,
}
