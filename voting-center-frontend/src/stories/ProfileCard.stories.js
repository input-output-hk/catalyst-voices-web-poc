import ProfileCard from '../components/ProfileCard'
import Avatar2 from '../assets/images/profile-avatar-2.svg'

const AvatarList = {
    Default: '',
    Avatar2: Avatar2,
}

export default {
    title: 'Components/ProfileCard',
    component: ProfileCard,
    argTypes: {
        avatar: { type: 'select', options: AvatarList },
    },
}

const Template = (args) => <ProfileCard {...args} />

export const Default = Template.bind({})
Default.args = {
    onClick: () => {},
    buttonText: 'View profile',
    title: '',
    profileName: 'Bailly Silver',
    profileJob: 'Community manager and investor',
    avatar: AvatarList.Default,
    profile: true,
    contentText:
        'addr1q80exvnyglukhrhrzutzqvlp0qgrnadt7ary6s2j9nelk9hwrp7p3wzq63wyv4lw40pvzqj547n92evwyauhh2s75vrsn0t123',
}
