import React, { useState } from 'react'
import { Card, Col } from 'react-bootstrap'

import ButtonComponent, { ButtonSizes } from '../Button'
import Stars from '../Stars'
import Checkbox from '../Checkbox'
import MoneyInput from '../Inputs/MoneyInput'
import Heart from '../../assets/svg/Heart'
import CloseIconFilters from '../../assets/svg/CloseIconFilters'

import './styles.scss'

const Filters = ({ setGlobalFilters, className, onClose }) => {
    const [filters, setFilters] = useState({
        proposalAndChallenge: false,
        proposalOnly: false,
        challengesOnly: false,
        catalystNative: false,
        challengeSettings: false,
        regularChallenges: false,
        favorites: false,
        scoreOneAndUp: false,
        scoreTwoAndUp: false,
        scoreThreeAndUp: false,
        scoreFourAndUp: false,
        firstTimers: false,
        oneTimers: false,
        impactProposal: false,
        allStarRating: false,
        minimumFunds: 0,
        maximumFunds: 0,
    })

    const handleCheckedFilters = (e) => {
        setFilters((state) => ({
            ...state,
            [e.target.id]: !filters[e.target.id],
        }))
    }

    return (
        <Card className={`${className} filters-card mt-4`}>
            <Card.Body>
                <div className="filters-card-wrapper">
                    <div className="header">
                        <h2>Filter by</h2>
                        <CloseIconFilters onClick={() => onClose()} />
                    </div>
                    <Col className="d-flex flex-column flex-md-row w-100 filters-main mb-4">
                        <div className="d-flex flex-column w-100">
                            <div className="border-bottom-custom mb-2">
                                <Checkbox
                                    label="Proposal + Challenge"
                                    className="mb-3"
                                    checked={filters.proposalAndChallenge}
                                    id="proposalAndChallenge"
                                    onChange={handleCheckedFilters}
                                />
                                <Checkbox
                                    label="Proposals only"
                                    className="mb-3"
                                    checked={filters.proposalOnly}
                                    id="proposalOnly"
                                    onChange={handleCheckedFilters}
                                />
                                <Checkbox
                                    label="Challenges only"
                                    className="mb-3"
                                    checked={filters.challengesOnly}
                                    id="challengesOnly"
                                    onChange={handleCheckedFilters}
                                />
                            </div>
                            <div className="border-bottom-custom mb-2 pb-1">
                                <h2 className="mb-3">Challenge Type</h2>
                                <div className="input-background mb-2">
                                    <Checkbox
                                        label="Catalyst Native"
                                        checked={filters.catalystNative}
                                        id="catalystNative"
                                        onChange={handleCheckedFilters}
                                    />
                                </div>
                                <div className="input-background mb-2">
                                    <Checkbox
                                        label="Challenge Settings"
                                        checked={filters.challengeSettings}
                                        id="challengeSettings"
                                        onChange={handleCheckedFilters}
                                    />
                                </div>
                                <div className="input-background mb-2">
                                    <Checkbox
                                        label="Regular Challenges"
                                        checked={filters.regularChallenges}
                                        id="regularChallenges"
                                        onChange={handleCheckedFilters}
                                    />
                                </div>
                            </div>
                            <div className=" mb-2 pb-1">
                                <h2 className="mb-3">Founds Requested</h2>
                                <MoneyInput
                                    label="Mininum"
                                    name="minimum"
                                    onChange={(e) =>
                                        setFilters((state) => ({
                                            ...state,
                                            minimumFunds: e.target.value,
                                        }))
                                    }
                                />
                                <MoneyInput
                                    label="Maximum"
                                    name="maximum"
                                    onChange={(e) =>
                                        setFilters((state) => ({
                                            ...state,
                                            maximumFunds: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100 light-bg">
                            <div className="border-bottom-custom mb-1 pb-3">
                                <h2 className="mb-3">My Favorites</h2>
                                <Checkbox
                                    label={<Heart />}
                                    checked={filters.favorites}
                                    id="favorites"
                                    onChange={handleCheckedFilters}
                                />
                            </div>
                            <div className="border-bottom-custom mb-1 pb-3">
                                <h2 className="mb-3">Advisor Score</h2>
                                <Checkbox
                                    label={
                                        <Stars fullStars={4} hollowStars={1} />
                                    }
                                    checked={filters.scoreFourAndUp}
                                    id="scoreFourAndUp"
                                    onChange={handleCheckedFilters}
                                    className="mb-3"
                                />
                                <Checkbox
                                    label={
                                        <Stars fullStars={3} hollowStars={2} />
                                    }
                                    checked={filters.scoreThreeAndUp}
                                    id="scoreThreeAndUp"
                                    onChange={handleCheckedFilters}
                                    className="mb-3"
                                />
                                <Checkbox
                                    label={
                                        <Stars fullStars={2} hollowStars={3} />
                                    }
                                    checked={filters.scoreTwoAndUp}
                                    id="scoreTwoAndUp"
                                    onChange={handleCheckedFilters}
                                    className="mb-3"
                                />
                                <Checkbox
                                    label={
                                        <Stars fullStars={1} hollowStars={4} />
                                    }
                                    checked={filters.scoreOneAndUp}
                                    id="scoreOneAndUp"
                                    onChange={handleCheckedFilters}
                                    className="mb-3"
                                />
                            </div>
                            <div className="mt-2">
                                <h2 className="mb-3">Type</h2>
                                <Checkbox
                                    label="First Timers"
                                    checked={filters.firstTimers}
                                    id="firstTimers"
                                    onChange={handleCheckedFilters}
                                    className="mb-3"
                                />
                                <Checkbox
                                    label="One Timers"
                                    checked={filters.oneTimers}
                                    id="oneTimers"
                                    onChange={handleCheckedFilters}
                                    className="mb-3"
                                />
                                <Checkbox
                                    label="Impact Proposal"
                                    Apply
                                    Filters
                                    checked={filters.impactProposal}
                                    id="impactProposal"
                                    onChange={handleCheckedFilters}
                                    className="mb-3"
                                />
                                <Checkbox
                                    label="All Star Rating"
                                    checked={filters.allStarRating}
                                    id="allStarRating"
                                    onChange={handleCheckedFilters}
                                    className="mb-3"
                                />
                            </div>
                        </div>
                    </Col>
                    <div className="d-flex flex-column w-100 align-items-center filter-buttons">
                        <p className="mb-2" onClick={() => setFilters({})}>
                            Clear Filters
                        </p>
                        <ButtonComponent
                            size={ButtonSizes.MD}
                            onClick={() => onClose()}
                            className={'apply-filters-button'}
                        >
                            Apply Filters
                        </ButtonComponent>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Filters
