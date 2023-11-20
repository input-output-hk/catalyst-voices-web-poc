import WalletModal from '../components/WalletModal'

export default {
    title: 'Components/WalletModal',
    component: WalletModal,
}

const Template = (args) => <WalletModal {...args} />

export const Default = Template.bind({})
Default.args = {
    show: true,
}
