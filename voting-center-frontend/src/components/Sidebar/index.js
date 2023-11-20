import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../lib/context'

import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import ChallengesIconV2 from '../../assets/images/challenges-icon-v2.svg'
import DashboardIconActive from '../../assets/images/dashboard-active.svg'
import DashboardIcon from '../../assets/images/dashboard.svg'
import HomeIconActive from '../../assets/images/home-active.svg'
import HomeIcon from '../../assets/images/home.svg'
import PeopleIconActive from '../../assets/images/people-active.svg'
import PeopleIcon from '../../assets/images/people.svg'
import UserIconActive from '../../assets/images/user-active.svg'
import UserIcon from '../../assets/images/user.svg'

import { Link } from 'react-router-dom'

import SmallModal from '../SmallModal'
import './styles.scss'

const linksWalletDisconnected = [
    {
        link: '/',
        name: 'Home',
        icon: HomeIcon,
        activeIcon: HomeIconActive,
    },

    {
        link: '/delegations',
        name: 'Delegation',
        icon: PeopleIcon,
        activeIcon: PeopleIconActive,
    },
    {
        link: '/challenges',
        name: 'Challenges',
        icon: ChallengesIconV2,
        activeIcon: ChallengesIconV2,
    },
]

const linksWalletConnected = [
    {
        link: '/',
        name: 'Home',
        icon: HomeIcon,
        activeIcon: HomeIconActive,
    },

    {
        link: '/delegations',
        name: 'Delegation',
        icon: PeopleIcon,
        activeIcon: PeopleIconActive,
    },
    {
        link: '/challenges',
        name: 'Challenges',
        icon: ChallengesIconV2,
        activeIcon: ChallengesIconV2,
    },
]

const linksVoter = [
    {
        link: '/',
        name: 'Home',
        icon: HomeIcon,
        activeIcon: HomeIconActive,
    },
    {
        link: '/dashboard',
        name: 'Voting Dashboard',
        icon: ChallengesIconV2,
        activeIcon: ChallengesIconV2,
    },
    {
        link: '/delegations',
        name: 'Delegation',
        icon: PeopleIcon,
        activeIcon: PeopleIconActive,
    },
    {
        link: '/challenges',
        name: 'Challenges',
        icon: ChallengesIconV2,
        activeIcon: ChallengesIconV2,
    },
]

const Sidebar = () => {
    const {
        pathname,
        isDrep,
        isVoter,
        drepProfile,
        connectedWallet,
        settings,
    } = useAppContext()
    const { is_voting_enabled, is_delegation_enabled } = settings
    const [sidebarLinks, setSidebarLinks] = useState(linksWalletDisconnected)
    const [linkActive, setLinkActive] = useState()
    const [showDelegationDisabledModal, setShowDelegationDisabledModal] =
        useState(false)
    const [showVotingDisabledModal, setShowVotingDisabledModal] =
        useState(false)

    const linksDrep = [
        {
            link: '/',
            name: 'Home',
            icon: HomeIcon,
            activeIcon: HomeIconActive,
        },
        {
            link: '/dashboard',
            name: 'Voting Dashboard',
            icon: DashboardIcon,
            activeIcon: DashboardIconActive,
        },
        {
            link: '/delegations',
            name: 'Delegation',
            icon: PeopleIcon,
            activeIcon: PeopleIconActive,
        },
        {
            link: `/drep/${drepProfile ? drepProfile.attributes.username : ''}`,
            name: 'Public profile',
            icon: UserIcon,
            activeIcon: UserIconActive,
        },
        {
            link: '/challenges',
            name: 'Challenges',
            icon: ChallengesIconV2,
            activeIcon: ChallengesIconV2,
        },
    ]

    useEffect(() => {
        connectedWallet
            ? isVoter
                ? isDrep
                    ? setSidebarLinks(linksDrep)
                    : setSidebarLinks(linksVoter)
                : setSidebarLinks(linksWalletConnected)
            : setSidebarLinks(linksWalletDisconnected)
    }, [isVoter, isDrep, connectedWallet])

    useEffect(() => {
        if (pathname.substring(1).indexOf('/') > 0) {
            let newPath = pathname.substring(
                0,
                pathname.substring(1).indexOf('/') + 1
            )
            setLinkActive(newPath)
        } else {
            setLinkActive(pathname)
        }
    }, [pathname])

    const handleClose = () => {
        setShowDelegationDisabledModal(false)
        setShowVotingDisabledModal(false)
    }

    return (
        <>
            <Nav className="flex-column h-100 link-margin">
                {sidebarLinks.map(({ link, name, icon, activeIcon }) =>
                    link === '/delegations' &&
                    is_delegation_enabled !== true ? null : (
                        <Nav.Link
                            as={Link}
                            to={
                                link === '/delegations'
                                    ? is_delegation_enabled
                                        ? link
                                        : ''
                                    : link === '/challenges'
                                    ? is_voting_enabled
                                        ? link
                                        : ''
                                    : link
                            }
                            key={name}
                            className={`d-flex align-items-center ${
                                icon ? 'sidebarLinks' : 'sidebar-links-regular'
                            } ${
                                pathname.substring(1).indexOf('/') > 0
                                    ? linkActive ===
                                      link.substring(
                                          0,
                                          pathname.substring(1).indexOf('/') + 1
                                      )
                                        ? 'activeState'
                                        : ''
                                    : linkActive === link
                                    ? 'activeState'
                                    : ''
                            }`}
                            onClick={() => {
                                link === '/delegations'
                                    ? !is_delegation_enabled
                                        ? setShowDelegationDisabledModal(true)
                                        : null
                                    : link === '/challenges'
                                    ? !is_voting_enabled
                                        ? setShowVotingDisabledModal(true)
                                        : null
                                    : null
                            }}
                        >
                            {icon ? (
                                linkActive ===
                                link.substring(
                                    0,
                                    pathname.substring(1).indexOf('/') + 1
                                ) ? (
                                    <Image
                                        fluid
                                        src={activeIcon}
                                        alt="Active Icon"
                                        className="d-none d-md-block d-lg-block d-xl-block pe-3"
                                    />
                                ) : (
                                    <Image
                                        fluid
                                        src={icon}
                                        alt="Icon"
                                        className="d-none d-md-block d-lg-block d-xl-block pe-3"
                                    />
                                )
                            ) : (
                                <div className="no-icon me-3"></div>
                            )}
                            {name}
                        </Nav.Link>
                    )
                )}
            </Nav>
            {showDelegationDisabledModal && (
                <SmallModal
                    show={showDelegationDisabledModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Home`}
                    onClick={() => handleClose()}
                    description={`We're sorry, but Delegations are currently not available.`}
                    title=""
                />
            )}

            {showVotingDisabledModal && (
                <SmallModal
                    show={showVotingDisabledModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Home`}
                    onClick={() => handleClose()}
                    description={`We're sorry, but Voting is currently not available.`}
                    title=""
                />
            )}
        </>
    )
}

export default Sidebar
