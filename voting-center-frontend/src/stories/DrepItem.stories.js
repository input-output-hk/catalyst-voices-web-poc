import DrepItem from "../components/DrepItem"

export default {
    title: 'Components/DrepItem',
    component: DrepItem,
}

const Template = (args) => <DrepItem {...args} />


export const Default = Template.bind({})
Default.args = {
    drep: 
    {
        name: "Bailly Silver",
        headline: "Community manager and investor",
        tags:
        [
            {
                id: 1,
                tag:{
                    name: "Tag"
                }
            },
            {
                id: 2,
                tag:{
                    name: "Tag"
                }
            },
            {
                id: 3,
                tag:{
                    name: "Tag"
                }
            }
        ]
    },
}
