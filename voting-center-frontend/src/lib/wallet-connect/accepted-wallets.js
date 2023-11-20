export const walletTypeHandler = () => {
    if (window.cardano) {
        const { eternl, flint, nufi, typhoncip30 } = window.cardano

        const wallets = [
            // {
            //     ...begin,
            //     type: 'begin',
            // },
            {
                ...eternl,
                type: 'eternl',
            },
            {
                ...flint,
                type: 'flint',
            },
            {
                ...nufi,
                type: 'nufi',
            },
            {
                ...typhoncip30,
                type: 'typhoncip30',
            },
        ]

        const showWallets = [
            // { label: 'Begin (Preprod Testnet)', type: 'begin', icon: begin.icon },
            {
                label: 'Eternl (Preprod Testnet)',
                type: 'eternl',
                icon: eternl?.icon,
            },
            { label: 'Nufi (Preprod Testnet)', type: 'nufi', icon: nufi?.icon },
            {
                label: 'Typhon (Preprod Testnet)',
                type: 'typhoncip30',
                icon: typhoncip30?.icon,
            },
        ]

        return {
            wallets,
            showWallets,
        }
    } else {
        return {
            wallets: [],
            showWallets: [],
        }
    }
}
