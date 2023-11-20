import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../lib/context'

import { Dropdown as DropdownNav } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import ChallengesIcon from '../../assets/images/challenges-icon-v2.svg'
import DashboardIcon from '../../assets/images/dashboard.svg'
import DelegationIcon from '../../assets/images/delegation.svg'
import HomeIcon from '../../assets/images/home.svg'
import PenIcon from '../../assets/images/pen.svg'
import PeopleIcon from '../../assets/images/people.svg'
import UserIcon from '../../assets/images/user.svg'
import SmallModal from '../SmallModal'
import './styles.scss'

const HOME = 'Home'
const BASIC = 'Basic Information'

const dropdownMenuDisconected = [
    {
        link: '/',
        name: 'Home',
        icon: HomeIcon,
    },
    {
        link: '/delegations',
        name: 'Delegation',
        icon: PeopleIcon,
    },
    {
        link: '/challenges',
        name: 'Challenges',
        icon: ChallengesIcon,
    },
]

const dropdownMenuVoter = [
    {
        link: '/',
        name: 'Home',
        icon: HomeIcon,
    },
    {
        link: '/dashboard',
        name: 'Voting Dashboard',
        icon: DashboardIcon,
    },
    {
        link: '/delegations',
        name: 'Delegation',
        icon: PeopleIcon,
    },
    {
        link: '/challenges',
        name: 'Challenges',
        icon: ChallengesIcon,
    },
]

const dropdownLinks = [
    {
        link: '/',
        name: 'Basic information',
    },
    {
        link: '/biography',
        name: 'Biography',
    },
    {
        link: '/expertise',
        name: 'Expertise / Interests',
    },
    {
        link: '/socials',
        name: 'Socials',
    },
    {
        link: '/delete',
        name: 'Delete account',
        color: true,
    },
]
const Dropdown = ({ className, dropdownMenu, whenSelected, disabled }) => {
    const { isDrep, isVoter, drepProfile, settings } = useAppContext()
    const [itemName, setItemName] = useState(HOME)
    const [linkName, setLinkName] = useState(BASIC)
    const [icons, setIcons] = useState(HomeIcon)
    const [dropdownMenuLinks, setDropdownMenuLinks] = useState(
        dropdownMenuDisconected
    )
    const { is_voting_enabled, is_delegation_enabled } = settings

    const [showDelegationDisabledModal, setShowDelegationDisabledModal] =
        useState(false)
    const [showVotingDisabledModal, setShowVotingDisabledModal] =
        useState(false)

    const dropdownMenuDrep = [
        {
            link: '/',
            name: 'Home',
            icon: HomeIcon,
        },
        {
            link: '/dashboard',
            name: 'Voting Dashboard',
            icon: DashboardIcon,
        },
        {
            link: '/delegations',
            name: 'Delegation',
            icon: PeopleIcon,
        },
        {
            link: `/drep/${drepProfile?.attributes?.username}`,
            name: 'Public profile',
            icon: UserIcon,
        },
        {
            link: '/challenges',
            name: 'Challenges',
            icon: ChallengesIcon,
        },
    ]

    useEffect(() => {
        isVoter
            ? isDrep
                ? setDropdownMenuLinks(dropdownMenuDrep)
                : setDropdownMenuLinks(dropdownMenuVoter)
            : setDropdownMenuLinks(dropdownMenuDisconected)
    }, [isVoter, isDrep])

    function onSelect(itemNameKey) {
        if (itemNameKey === 'Delegation' && !is_delegation_enabled) {
            setShowDelegationDisabledModal(true)
            return
        }
        if (itemNameKey === 'Challenges' && !is_voting_enabled) {
            setShowVotingDisabledModal(true)
            return
        }
        setItemName(itemNameKey)

        itemNameKey === HOME
            ? setIcons(HomeIcon)
            : setIcons(PeopleIcon) &&
              setIcons(DelegationIcon) &&
              setIcons(DashboardIcon)
    }
    function onHandleSelect(linkNameKey) {
        if (linkNameKey === 'Delegation' && !is_delegation_enabled) {
            setShowDelegationDisabledModal(true)
            return
        }
        if (linkNameKey === 'Challenges' && !is_voting_enabled) {
            setShowVotingDisabledModal(true)
            return
        }
        setLinkName(linkNameKey)
        linkNameKey === linkNameKey ? setIcons(PenIcon) : null
    }

    const handleClose = () => {
        setShowDelegationDisabledModal(false)
        setShowVotingDisabledModal(false)
    }

    if (dropdownMenu) {
        return (
            <>
                <DropdownNav
                    className={`${className} dropDownNav align-items-center`}
                    onSelect={onSelect}
                >
                    <DropdownNav.Toggle
                        id="dropdown-basic"
                        className="w-100 d-flex  justify-content-between dropDownButton align-items-center"
                        disabled={disabled}
                    >
                        <div className="d-flex align-items-center">
                            <Image
                                fluid
                                src={icons}
                                alt="Active Icon"
                                className="me-3 align-items-center"
                            />
                            <p className="mb-0">{itemName}</p>
                        </div>
                    </DropdownNav.Toggle>
                    <DropdownNav.Menu className="w-100 border-0">
                        {dropdownMenuLinks.map(({ link, name, icon }) =>
                            link === '/delegations' &&
                            is_delegation_enabled !== true ? null : (
                                <DropdownNav.Item
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
                                    href="#/link"
                                    onSelect={onSelect}
                                    eventKey={name}
                                    link={link}
                                >
                                    <div className="d-flex align-items-center dropdown-item-style">
                                        {icon ? (
                                            <Image
                                                fluid
                                                src={icon}
                                                alt="Icon"
                                                className="me-3"
                                            />
                                        ) : (
                                            <div className="no-icon me-3"></div>
                                        )}
                                        <p className="mb-0">{name}</p>
                                    </div>
                                </DropdownNav.Item>
                            )
                        )}
                    </DropdownNav.Menu>
                </DropdownNav>
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
    // Second version
    return (
        <>
            <DropdownNav
                className={`${className} dropDownNavSmaller align-items-center`}
                onSelect={(e) => {
                    onHandleSelect(e)
                    whenSelected(e)
                }}
            >
                <DropdownNav.Toggle
                    id="dropdown-basic"
                    className="d-flex justify-content-between dropDownButton align-items-center"
                    disabled={disabled}
                >
                    <div className="d-flex align-items-center dropDownNavMain">
                        {linkName !== 'Delete account' && (
                            <Image
                                fluid
                                src={PenIcon}
                                alt="Pen Icon"
                                className="me-3 align-items-center"
                            />
                        )}
                        <p className="mb-0 pb-0">{linkName}</p>
                    </div>
                </DropdownNav.Toggle>
                <DropdownNav.Menu
                    className="border-0 dropDownNavMenu"
                    popperConfig={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 10],
                                },
                            },
                        ],
                    }}
                >
                    {dropdownLinks.map(({ link, name, color }) => (
                        <DropdownNav.Item
                            key={name}
                            href="#/link"
                            onSelect={onHandleSelect}
                            eventKey={name}
                        >
                            <div className="d-flex align-items-center dropdown-item-style">
                                <p
                                    className={`${
                                        color ? 'text-danger' : ''
                                    } m-0 p-0`}
                                >
                                    {name}
                                </p>
                            </div>
                        </DropdownNav.Item>
                    ))}
                </DropdownNav.Menu>
            </DropdownNav>
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

export default Dropdown
