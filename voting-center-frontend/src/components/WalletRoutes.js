import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../containers/Homepage'
import LandingPage from '../containers/LandingPage'
import DrepChallenges from '../containers/DrepChallenges'
import ProposalListVote from '../containers/DrepChallenges/ProposalListVote'
import SingleProposal from '../containers/SingleProposal'
import PublicProfile from '../containers/PublicProfile'
import DrepsPage from '../containers/Dreps'

const WalletRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/delegations" element={<DrepsPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/challenges" element={<DrepChallenges />} />
            <Route path="/challenges/:id" element={<ProposalListVote />} />
            <Route
                path="/challenges/proposals/:id"
                element={<SingleProposal />}
            />
            <Route path="/drep/:username" element={<PublicProfile />} />
        </Routes>
    )
}

export default WalletRoutes
