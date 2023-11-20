import React, { useState } from 'react'
import { Dropdown as DropdownNav } from 'react-bootstrap'

import './styles.scss'

export const optionNames = {
    random: 'Random',
    nameAZ: 'Name (A-Z)',
    nameZA: 'Name (Z-A)',
    registeredOldest: 'Registered (Oldest)',
    registeredNewest: 'Registered (Newest)',
}

const optionHandle = [
    'random',
    'name%3Aasc',
    'name%3Adesc',
    'createdAt%3Aasc',
    'createdAt%3Adesc',
]

const sortOptions = [
    {
        optionName: optionNames.random,
        option: optionHandle[0],
    },
    {
        optionName: optionNames.nameAZ,
        option: optionHandle[1],
    },
    {
        optionName: optionNames.nameZA,
        option: optionHandle[2],
    },
    {
        optionName: optionNames.registeredOldest,
        option: optionHandle[3],
    },
    {
        optionName: optionNames.registeredNewest,
        option: optionHandle[4],
    },
]

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Sort({ className, onSelect }) {
    const [option, setOption] = useState(sortOptions[0])

    function handleSelected(selectedOption) {
        let newOption = sortOptions.find(
            ({ optionName }) => optionName === selectedOption
        )
        setOption(newOption)
    }

    function handleOnSelect(e) {
        if (e === 'Random') {
            const randomOption = sortOptions[randomInteger(1, 4)]
            setOption(randomOption)
            onSelect(randomOption.option)
        } else {
            handleSelected(e)
            const findOption = sortOptions.find(
                ({ optionName }) => optionName === e
            )
            onSelect(findOption.option)
        }
    }

    return (
        <DropdownNav
            className={`${className} sort-dropdown align-items-center`}
            onSelect={handleOnSelect}
        >
            <DropdownNav.Toggle
                id="dropdown-basic"
                className="d-flex justify-content-between sort-button align-items-center"
            >
                <div className="d-flex align-items-center">
                    <p className="mb-0">{option.optionName}</p>
                </div>
            </DropdownNav.Toggle>
            <div className="sort-menu-wrapper p-0">
                <DropdownNav.Menu
                    className="border-0"
                    popperConfig={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 8],
                                },
                            },
                        ],
                    }}
                >
                    {sortOptions.map(({ option, optionName }) => (
                        <DropdownNav.Item key={option} eventKey={optionName}>
                            <div className="d-flex align-items-center sort-item">
                                <p className={`m-0`}>{optionName}</p>
                            </div>
                        </DropdownNav.Item>
                    ))}
                </DropdownNav.Menu>
            </div>
        </DropdownNav>
    )
}

export default Sort
