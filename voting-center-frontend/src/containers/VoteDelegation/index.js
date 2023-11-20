import { useEffect, useRef, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link, useNavigate } from 'react-router-dom'
import Arrow from '../../components/Arrow'
import Button from '../../components/Button'
import DrepItem from '../../components/DrepItem'
import Input from '../../components/Inputs/Input'
import LargeModal from '../../components/LargeModal'
import SmallCard from '../../components/SmallCard'
import SmallModal from '../../components/SmallModal'
import Sort from '../../components/Sort'
import TagComponent from '../../components/Tag'
import VotingPowerChart from '../../components/VotingPowerChart'
import {
    deleteDrep,
    handleDelegation,
    handleGetDelegations,
    handleActiveVoterRegistration,
    getTransactionByHash,
} from '../../lib/api'
import { useAppContext } from '../../lib/context'
import { debounce, getDreps, formatCurrency } from '../../lib/helpers'
import { useCallbackPrompt } from '../../util/useCallbackPrompt'
import VoteDelegationInfo from '../VoteDelegationInfo'
import VoteDelegationModalContent from './VoteDelegationModalContent'
import RegistrationInfo from '../../components/RegistrationInfo'
import ProfileCard from '../../components/ProfileCard'
import './styles.scss'

const searchInputID = `searchInput-delegation`

const VoteDelegation = () => {
    const {
        isActiveVoter,
        myDashboardClicked,
        setMyDashboardClicked,
        votingPower,
        tagsList,
        selectedDreps,
        totalPercentage,
        setSelectedDreps,
        setDelegatedPower,
        setIsDelegationSuccessful,
        connectedWallet,
        delegatedPower,
        setIsActiveVoter,
        redirectToDashboard,
        setIsVoter,
        setVoteIsDelegated,
        voteIsDelegated,
        drepListPage,
        setIsLoading,
        setDrepPageCount,
        setDrepListPage,
        drepProfile,
        setDrepProfile,
        isDrep,
        isVoter,
        setIsDrep,
        redirectToHomepage,
        setVoterTransactionHash,
        settings,
        drepPendingReview,
        setVotingPower,
        setVotingPowerNumber,
        setLastTransaction,
        setIsConnectClicked,
        setVoterData,
        setActiveVoterRegisterModal,
        activeVoterRegisterModal,
    } = useAppContext()

    const { dRep_registration_open } = settings
    const [fromPassiveToActive, setFromPassiveToActive] = useState(false)

    const [showWarning, setShowWarning] = useState(false)
    const [showDrepWarning, setShowDrepWarning] = useState(false)
    const [drepDeleteModal, setDrepDeleteModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('')

    const [scrollOffset, setScrollOffset] = useState(0)
    const [isScrollEnd, setIsScrollEnd] = useState(false)
    const [filteredDrepList, setFilteredDrepList] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [selectedTags, setSelectedTags] = useState([])
    const [showConfirmModal, setShowConfirmModal] = useState(true)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(
        showConfirmModal && selectedDreps.length > 0 ? true : false
    )
    const [sort, setSort] = useState('')
    // handling info after delegation

    const [isAlreadyDelegated, setIsAlreadyDelegated] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const balance = (value) => {
        let firstPart = value?.substring(value?.length - 6, 0)
        let secondPart = value?.substring(value?.length - 6)

        let formattedBalance = `${formatCurrency(
            firstPart
        )}.${secondPart?.slice(0, 2)}`

        let vpNum = Number(firstPart)

        return { formattedBalance, vpNum }
    }

    const handleIsVoter = async (voter) => {
        setIsVoter(true)
        setVoterData(voter)

        let { formattedBalance, vpNum } = balance(
            String(voter?.attributes?.voter_info?.voting_power)
        )
        setVotingPower(formattedBalance)
        setVotingPowerNumber(vpNum)
        setIsActiveVoter(!voter.attributes?.is_passive)
        setVoterTransactionHash(voter.attributes?.transaction_hash)
        const lastTransaction = await getTransactionByHash(
            voter.attributes?.transaction_hash
        )
        setLastTransaction(lastTransaction)
        setFromPassiveToActive(false)
        setActiveVoterRegisterModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
        setShowDrepWarning(false)
        setShowWarning(false)
        setFromPassiveToActive(false)
    }

    const handleRegistration = async () => {
        if (!connectedWallet) {
            setIsConnectClicked(true)
            return
        }
        if (connectedWallet.error?.includes('Governance')) {
            setIsConnectClicked(true)
            return
        }
        const activeVoterRegistration = await handleActiveVoterRegistration(
            connectedWallet,
            isDrep
        )

        if (activeVoterRegistration?.errorMessage) {
            setError(activeVoterRegistration?.errorMessage)
            handleClose()
            setShowModal(true)
            return
        }

        const { transactionHash, voter } = activeVoterRegistration || {}
        setVoterTransactionHash(transactionHash)

        if (voter) {
            handleIsVoter(voter)
        }
    }

    const handleDreps = async (page, rule) => {
        let search = document.getElementById(searchInputID)
        if (search) {
            setIsLoading(true)
            let newList

            if (rule === 1) {
                newList = []
                setDrepListPage(1)
                page = 1
            } else {
                newList = filteredDrepList
            }

            const res = drepProfile
                ? await getDreps(selectedTags, search.value, page, sort)
                : await getDreps(selectedTags, search.value, page, sort)

            if (res) {
                setDrepPageCount(res.meta.pagination.pageCount)

                res.data.forEach((drep) => {
                    newList = [...newList, drep]
                })

                setFilteredDrepList(newList)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        if (drepListPage === 1) {
            handleDreps(drepListPage, 1)
        } else {
            handleDreps(drepListPage, 2)
        }
    }, [drepListPage, selectedTags])

    useEffect(() => {
        setDrepListPage(1)
        handleDreps(drepListPage, 1)
    }, [selectedTags, sort])

    const handleSelect = () => {
        setIsSelected(true)
    }
    const handleSelectTag = (tag) => {
        selectedTags.includes(tag)
            ? setSelectedTags(
                  selectedTags.filter((selectedTag) => selectedTag !== tag)
              )
            : setSelectedTags([...selectedTags, tag])
    }

    const onClose = () => {
        setIsSelected(false)
    }

    const handleConfirmDelegation = async () => {
        try {
            const { error, transactionHash } = await handleDelegation(
                connectedWallet,
                delegatedPower
            )
            setVoterTransactionHash(transactionHash)
            setShowWarning(false)
            setIsSelected(false)
            setIsDelegationSuccessful(error ? false : true)
            setVoteIsDelegated(true)
            setSelectedDreps([])
            setDelegatedPower([])
            setIsVoter(true)
            setIsActiveVoter(false)
        } catch (error) {
            setShowWarning(false)
            setIsSelected(false)
            setVoteIsDelegated(true)
            setIsDelegationSuccessful(false)
            setErrorMessage('Transaction has been rejected.')
        }
    }

    useEffect(() => {
        const handleGetVotersDelegations = async () => {
            if (connectedWallet) {
                const res = await handleGetDelegations(connectedWallet)
                if (res) {
                    if (res.length > 0) {
                        !voteIsDelegated && setIsAlreadyDelegated(true)
                        setShowConfirmModal(false)
                    } else {
                        setIsAlreadyDelegated(false)
                    }

                    let delegetePowerClone = []
                    let selectedDrepsClone = []

                    res.forEach((delegateClone) => {
                        delegetePowerClone.push({
                            id: delegateClone?.attributes?.drep_id,
                            value: delegateClone?.attributes?.weight_percent,
                        })
                        selectedDrepsClone.push(
                            delegateClone?.attributes?.drep_id
                        )
                    })

                    setSelectedDreps(selectedDrepsClone)
                    setDelegatedPower(delegetePowerClone)
                }
            }
        }

        handleGetVotersDelegations().catch(console.error)
    }, [])

    // Update dReps function with debounce, the delay has been set here on 750ms, the default is 1000ms
    const updateDebounceText = debounce(async function () {
        setDrepListPage(1)
        handleDreps(drepListPage, 1)
    }, 1000)

    const ref = useRef(null)
    const scroll = (a) => {
        ref.current.scrollLeft += a
        if (
            parseInt(ref.current.scrollLeft, 10) ===
                parseInt(scrollOffset, 10) &&
            ref.current.scrollLeft + a > 0
        ) {
            setIsScrollEnd(true)
        } else {
            setIsScrollEnd(false)
        }
        setScrollOffset(ref.current.scrollLeft)
    }

    // Sorting dreps
    const handleChangeSort = (sort) => {
        setSort(sort)
    }

    let navigate = useNavigate()
    const redirectToProfilePage = () => {
        let path = `/drep/${drepProfile?.attributes?.username}`
        navigate(path)
    }

    function copyToClipboard(value) {
        navigator.clipboard.writeText(value)
    }

    const handleDeleteDrep = async () => {
        try {
            let response = await deleteDrep(drepProfile?.id)

            if (response) {
                setDrepProfile(null)
                setIsDrep(false)
                setDrepDeleteModal(false)
                redirectToHomepage()
            }
        } catch (error) {
            console.error(error)
            redirectToHomepage()
        }
    }

    return (
        <>
            {!voteIsDelegated && connectedWallet ? (
                activeVoterRegisterModal ? (
                    <RegistrationInfo
                        drepHeading={'You have registered as an active voter'}
                        drepText={
                            'Congratulations, you will be able to submit your own votes.'
                        }
                        drepButtonText={'My Dashboard'}
                        onClick={() => {
                            navigate('/dashboard')
                            setActiveVoterRegisterModal(false)
                        }}
                    />
                ) : (
                    <Row className="vote-delegation-wrapper mb-4">
                        <Col sm={12} md={8}>
                            {!isDrep ? (
                                <Row>
                                    <Col
                                        sm={12}
                                        md={4}
                                        className="d-flex d-md-none"
                                    >
                                        <VotingPowerChart
                                            votingDelegationText={`Your total voting power is ${
                                                votingPower &&
                                                votingPower !== 'NaN.ef'
                                                    ? votingPower
                                                    : '--'
                                            }`}
                                            vp={100}
                                            delegationsText={'Not delegated'}
                                            delegate={selectedDreps.length}
                                            votingPowerChartButton={
                                                'Confirm delegations'
                                            }
                                            onClick={handleSelect}
                                        />
                                    </Col>
                                </Row>
                            ) : (
                                <>
                                    <Row className="d-flex d-md-none">
                                        <Col className="mb-4">
                                            <ProfileCard
                                                profile={true}
                                                drep={drepProfile?.attributes}
                                                buttonText={'View profile'}
                                                onClick={redirectToProfilePage}
                                                disabledButton={false}
                                                showButton={false}
                                                showDetailedView={false}
                                            />
                                        </Col>
                                        <Col className="mb-4">
                                            <ProfileCard
                                                profile={false}
                                                title={'Public voting key'}
                                                contentText={
                                                    drepProfile?.attributes
                                                        ?.encoded_voting_key
                                                }
                                                buttonText={'Copy'}
                                                onClick={(e) =>
                                                    copyToClipboard(
                                                        drepProfile?.attributes
                                                            ?.encoded_voting_key
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <ProfileCard
                                                profile={false}
                                                retire
                                                title={'Retire'}
                                                contentText={
                                                    'Do you want to retire as a dRep?'
                                                }
                                                buttonText={'Retire as a dRep'}
                                                onClick={() =>
                                                    setDrepDeleteModal(true)
                                                }
                                            />
                                        </Col>
                                    </Row>

                                    <SmallModal
                                        show={drepDeleteModal}
                                        buttonText="Yes, retire"
                                        secondButtonText="No"
                                        title="Are you sure?"
                                        description="Are you sure you want to retire as a dRep?"
                                        onClick={handleDeleteDrep}
                                        secondOnClick={() =>
                                            setDrepDeleteModal(false)
                                        }
                                        onClose={() =>
                                            setDrepDeleteModal(false)
                                        }
                                    />
                                </>
                            )}
                            <h2 className="vote-delegation-header">dReps</h2>
                            <Col sm={12} className="mb-3">
                                <Input
                                    id={searchInputID}
                                    onChange={(e) =>
                                        updateDebounceText(e.target.value)
                                    }
                                    placeholder={
                                        'Search by name, voting key, tag...'
                                    }
                                />
                            </Col>
                            <Col sm={12}>
                                <Row className="tag-list-container gx-0">
                                    {scrollOffset > 0 ? (
                                        <div className="scroll-button scroll-button-left">
                                            <div className="arrow-div">
                                                <Arrow
                                                    left={true}
                                                    onClick={() => scroll(-60)}
                                                />
                                            </div>
                                            <div className="arrow-shadow"></div>
                                        </div>
                                    ) : null}
                                    <Col
                                        className="my-3 d-flex tags-list"
                                        sm={12}
                                        ref={ref}
                                    >
                                        {tagsList.map((tag, index) => (
                                            <TagComponent
                                                key={`${tag}-${index}`}
                                                onClick={() =>
                                                    handleSelectTag(tag)
                                                }
                                            >
                                                {tag}
                                            </TagComponent>
                                        ))}
                                    </Col>
                                    {isScrollEnd === false ? (
                                        <div className="scroll-button scroll-button-right">
                                            <div className="arrow-shadow"></div>
                                            <div className="arrow-div">
                                                <Arrow
                                                    onClick={() => scroll(60)}
                                                />
                                            </div>
                                        </div>
                                    ) : null}
                                </Row>
                            </Col>
                            <Col sm={12}>
                                <Row className="drep-sort my-3">
                                    <Col
                                        sm={8}
                                        className="d-flex align-items-center sort-content"
                                    >
                                        <p>Sort</p>
                                        <Sort
                                            className={'ms-3 w-100'}
                                            onSelect={handleChangeSort}
                                        ></Sort>
                                    </Col>
                                    <Col
                                        sm={4}
                                        className="d-flex justify-content-end mt-2 mt-md-0 sort-result"
                                    >
                                        <p>
                                            Showing {filteredDrepList.length}{' '}
                                            results
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={12}>
                                <Row>
                                    <Col sm={12}>
                                        {filteredDrepList.length != 0 ? (
                                            filteredDrepList.map(
                                                ({ id, attributes }) => (
                                                    <DrepItem
                                                        noMetrics
                                                        className={'mt-2'}
                                                        key={id}
                                                        drep={attributes}
                                                        largeModalButtonText={
                                                            isDrep
                                                                ? null
                                                                : Object.values(
                                                                      selectedDreps
                                                                  ).includes(id)
                                                                ? 'Remove dRep'
                                                                : 'Add dRep'
                                                        }
                                                        id={id}
                                                        disableHover={
                                                            isDrep
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                )
                                            )
                                        ) : (
                                            <Col
                                                sm={12}
                                                className="d-flex flex-column align-items-center mt-5 drep-list-no-result"
                                            >
                                                <h3>No search results found</h3>
                                                <p>Please try again</p>
                                            </Col>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                        <Col md={4} className="d-none d-md-block">
                            {isDrep ? (
                                <>
                                    <Row>
                                        <Col className="mb-4" xs={12}>
                                            <ProfileCard
                                                profile={true}
                                                drep={drepProfile?.attributes}
                                                buttonText={'View profile'}
                                                onClick={redirectToProfilePage}
                                                disabledButton={false}
                                                showButton={false}
                                                showDetailedView={false}
                                            />
                                        </Col>
                                        <Col className="mb-4" xs={12}>
                                            <ProfileCard
                                                profile={false}
                                                title={'Public voting key'}
                                                contentText={
                                                    drepProfile?.attributes
                                                        ?.encoded_voting_key
                                                }
                                                buttonText={'Copy'}
                                                onClick={(e) =>
                                                    copyToClipboard(
                                                        drepProfile?.attributes
                                                            ?.encoded_voting_key
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <ProfileCard
                                                profile={false}
                                                retire
                                                title={'Retire'}
                                                contentText={
                                                    'Do you want to retire as a dRep?'
                                                }
                                                buttonText={'Retire as a dRep'}
                                                onClick={() =>
                                                    setDrepDeleteModal(true)
                                                }
                                            />
                                        </Col>
                                    </Row>

                                    <SmallModal
                                        show={drepDeleteModal}
                                        buttonText="Yes, retire"
                                        secondButtonText="No"
                                        title="Are you sure?"
                                        description="Are you sure you want to retire as a dRep?"
                                        onClick={handleDeleteDrep}
                                        secondOnClick={() =>
                                            setDrepDeleteModal(false)
                                        }
                                        onClose={() =>
                                            setDrepDeleteModal(false)
                                        }
                                    />
                                </>
                            ) : (
                                <VotingPowerChart
                                    votingDelegationText={`Your total voting power is ${
                                        votingPower && votingPower !== 'NaN.ef'
                                            ? votingPower
                                            : '--'
                                    }`}
                                    vp={100}
                                    delegate={selectedDreps.length}
                                    votingPowerChartButton={
                                        'Confirm delegations'
                                    }
                                    onClick={handleSelect}
                                    showDeleteButton={!isAlreadyDelegated}
                                />
                            )}

                            {dRep_registration_open &&
                                connectedWallet &&
                                isVoter &&
                                !isDrep &&
                                !drepPendingReview && (
                                    <Row>
                                        <Col>
                                            <SmallCard
                                                className={'mt-3'}
                                                title={'Become a dRep'}
                                                content={
                                                    <p className="card-item-text">
                                                        Do you want to be an
                                                        active member of the
                                                        community and let people
                                                        delegate their votes to
                                                        you?
                                                    </p>
                                                }
                                                button={
                                                    <Link to="/drep-registration">
                                                        <Button
                                                            className={
                                                                'w-100 mt-3'
                                                            }
                                                            size={'sm'}
                                                        >
                                                            Register as a dRep
                                                        </Button>
                                                    </Link>
                                                }
                                            />
                                        </Col>
                                    </Row>
                                )}

                            {connectedWallet &&
                                isVoter &&
                                !isActiveVoter &&
                                !isDrep && (
                                    <SmallCard
                                        className={'mt-3'}
                                        title={'Take back my Voting Power'}
                                        content={
                                            <p className="card-item-text">
                                                Do you want to become an active
                                                voter?
                                            </p>
                                        }
                                        button={
                                            <Button
                                                className={'w-100 mt-3'}
                                                size={'sm'}
                                                onClick={() =>
                                                    setFromPassiveToActive(true)
                                                }
                                            >
                                                Become an Active Voter
                                            </Button>
                                        }
                                    />
                                )}
                        </Col>

                        <SmallModal
                            show={fromPassiveToActive}
                            onClose={() => setFromPassiveToActive(false)}
                            secondButtonText={`Close`}
                            secondOnClick={() => setFromPassiveToActive(false)}
                            buttonText={`Continue`}
                            onClick={() => handleRegistration()}
                            title={`Your delegations will be deleted. Do you want to continue?`}
                            description=""
                        />
                    </Row>
                )
            ) : isAlreadyDelegated ? (
                <VoteDelegationInfo
                    onClick={() => setVoteIsDelegated(false)}
                    errorMessage={errorMessage}
                    heading={'Your delegation has been updated.'}
                    text={
                        'Congratulations, you have successfully delegated your voting power.'
                    }
                    transactionHash
                />
            ) : (
                <VoteDelegationInfo
                    onClick={() => setVoteIsDelegated(false)}
                    errorMessage={errorMessage}
                    heading={'Your voting power has been delegated'}
                    text={
                        'Congratulations, you have successfully delegated your voting power.'
                    }
                    transactionHash
                />
            )}
            {myDashboardClicked ? (
                <SmallModal
                    show={myDashboardClicked}
                    buttonText="Yes, cancel"
                    secondButtonText="No, continue"
                    title="Are you sure?"
                    description="Are you sure you want to cancel? Any progress won't be saved"
                    onClick={redirectToDashboard}
                    secondOnClick={() =>
                        setMyDashboardClicked(!myDashboardClicked)
                    }
                    onClose={() => setMyDashboardClicked(!myDashboardClicked)}
                />
            ) : null}
            {isSelected && selectedDreps.length > 0 ? (
                <LargeModal
                    show={isSelected}
                    backdrop
                    buttonText={'Confirm delegation'}
                    secondButtonText={'Cancel'}
                    placement={'right'}
                    onClose={onClose}
                    secondOnClick={onClose}
                    disableButton={totalPercentage === 100 ? false : true}
                    onClick={
                        isDrep
                            ? () => setShowDrepWarning(true)
                            : isActiveVoter
                            ? () => setShowWarning(true)
                            : handleConfirmDelegation
                    }
                >
                    <VoteDelegationModalContent
                        onClose={onClose}
                        showDeleteButton={isAlreadyDelegated}
                    />
                </LargeModal>
            ) : null}

            <SmallModal
                show={showPrompt}
                title="Are you sure?"
                description="Are you sure you want to cancel? Any progress won't be saved."
                buttonText="Yes, cancel"
                secondButtonText="No, continue"
                onClick={() => {
                    setSelectedDreps([])
                    setDelegatedPower([])
                    confirmNavigation()
                }}
                secondOnClick={cancelNavigation}
                onClose={cancelNavigation}
            />

            <SmallModal
                show={showWarning}
                title="Warning"
                description="By delegating your voting power to a dRep(s) you agree that they will vote on your behalf."
                buttonText="Continue"
                secondButtonText="Cancel"
                onClick={handleConfirmDelegation}
                secondOnClick={() => handleClose()}
                onClose={() => handleClose()}
            />

            <SmallModal
                show={showDrepWarning}
                title="Warning"
                description="dReps are not allowed to delegate! Please vote!"
                buttonText="Close"
                onClick={() => handleClose()}
                secondOnClick={() => handleClose()}
                onClose={() => handleClose()}
            />

            <SmallModal
                show={showModal}
                onClose={() => handleClose()}
                buttonText={`Close`}
                onClick={() => handleClose()}
                title={`Error`}
                description={error}
            />
        </>
    )
}
export default VoteDelegation
