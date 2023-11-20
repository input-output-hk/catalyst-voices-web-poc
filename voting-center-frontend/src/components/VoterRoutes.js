import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DrepRegistration from '../containers/DrepRegistration'
import Homepage from '../containers/Homepage'
import LandingPage from '../containers/LandingPage'
import ActiveDashboard from '../containers/ActiveDashboard'
import DrepChallenges from '../containers/DrepChallenges'
import ProposalListVote from '../containers/DrepChallenges/ProposalListVote'
import VotingConfirmation from '../containers/VotingConfirmation'
import SingleProposal from '../containers/SingleProposal'
import PublicProfile from '../containers/PublicProfile'
import DrepsPage from '../containers/Dreps'

const VoterRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/drep-registration" element={<DrepRegistration />} />
            <Route path="/dashboard" element={<ActiveDashboard />} />
            <Route path="/delegations" element={<DrepsPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/challenges" element={<DrepChallenges />} />
            <Route path="/challenges/:id" element={<ProposalListVote />} />
            <Route
                path="/challenges/proposals/:id"
                element={<SingleProposal />}
            />
            <Route
                path="/voting-confirmation"
                element={<VotingConfirmation />}
            />
            <Route path="/drep/:username" element={<PublicProfile />} />
        </Routes>
    )
}

export default VoterRoutes
