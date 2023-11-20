import { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { useLocation } from 'react-router-dom'

import CardImage from '../../assets/images/drep-card-background-1.jpg'
import Arrow from '../../components/Arrow'
import CardItem from '../../components/Card'
import DrepItem from '../../components/DrepItem'
import Input from '../../components/Inputs/Input'
import Sort from '../../components/Sort'
import TagComponent from '../../components/Tag'
import { useAppContext } from '../../lib/context'
import { debounce, getDreps } from '../../lib/helpers'

import './styles.scss'

const searchInputID = `searchInput-drepList`

const steps = [
    {
        target: '#filters',
        content:
            'Here we can search for a specific drep, filter by tags, and sort by name or created date.',
        disableBeacon: true,
    },
    {
        target: '#dreps',
        content:
            'All approved and filtered dReps are listed here. Click on a dRep to see more information about them.',
    },
    {
        target: '#drep-item-modal div',
        content: 'Here you can see more information about the dRep.',
        placement: 'left',
    },
]

const DrepList = () => {
    const location = useLocation()
    const {
        tagsList,
        drepListPage,
        setIsLoading,
        setDrepPageCount,
        setDrepListPage,
        gvcVisitedRoutes,
        setGvcVisitedRoutes,
        startTourGuide,
        setStartTourGuide,
        settings,
    } = useAppContext()

    const { dRep_registration_open } = settings

    const [scrollOffset, setScrollOffset] = useState(0)
    const [isScrollEnd, setIsScrollEnd] = useState(false)
    const [filteredDrepList, setFilteredDrepList] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [sort, setSort] = useState('')
    const [tourStep, setTourStep] = useState(0)
    const [showSingleDrepModal, setShowSingleDrepModal] = useState(false)
    const [showGuide, setShowGuide] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

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

            const res = await getDreps(selectedTags, search.value, page, sort)
            if (res) {
                setDrepPageCount(res.meta.pagination.pageCount)

                newList = [...newList, ...res.data]

                setFilteredDrepList(newList)
                setIsLoading(false)
            }
        }
    }

    const handleJoyrideCallback = (data) => {
        const { action, index, status, type } = data

        if (
            (index === 1 && action === 'next' && type === EVENTS.STEP_AFTER) ||
            (index === 3 && action === 'prev' && type === EVENTS.STEP_AFTER)
        ) {
            setShowSingleDrepModal(true)
        }

        if (
            (index === 2 && action === 'prev' && type === EVENTS.STEP_AFTER) ||
            (index === 2 && action === 'next' && type === EVENTS.STEP_AFTER)
        ) {
            setShowSingleDrepModal(false)
        }

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            // Update state to advance the tour
            setTourStep(index + (action === ACTIONS.PREV ? -1 : 1))
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            setShowSingleDrepModal(false)
            setTourStep({ run: false })
            let setGvcVisitedRoutesClone = gvcVisitedRoutes
                ? gvcVisitedRoutes
                : []

            setGvcVisitedRoutesClone.push(location.pathname)
            setGvcVisitedRoutes(setGvcVisitedRoutesClone)
            localStorage.setItem(
                'gvc-visited-routes',
                JSON.stringify(setGvcVisitedRoutesClone)
            )
        }
    }

    const handleShowGuide = () => {
        if (gvcVisitedRoutes?.includes(location.pathname)) {
            setShowGuide(false)
            setStartTourGuide(false)
        } else {
            setShowGuide(true)
        }
    }

    useEffect(() => {
        handleShowGuide()
    }, [])

    const handleDrepsCalling = (page) => {
        if (page === 1) {
            handleDreps(page, 1)
        } else {
            handleDreps(page, 2)
        }
    }

    useEffect(() => {
        handleDrepsCalling(drepListPage)
    }, [drepListPage])

    useEffect(() => {
        if (isMounted) {
            handleDrepsCalling(1, 1)
        } else setIsMounted(true)
    }, [selectedTags, sort])

    //Handling selected tags
    const handleSelectTag = (tag) => {
        selectedTags.includes(tag)
            ? setSelectedTags(
                  selectedTags.filter((selectedTag) => selectedTag !== tag)
              )
            : setSelectedTags([...selectedTags, tag])
    }

    // Update dReps function with debounce, the delay has been set here on 750ms, the default is 1000ms
    const updateDebounceText = debounce(async function () {
        setDrepListPage(1)
        handleDrepsCalling(1, 1)
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

    return (
        <Row className="drep-list mb-4 justify-content-between">
            <Col sm={12} md>
                <CardItem
                    className="card-item-single"
                    img={CardImage}
                    variant={'left'}
                    drepListHeading={'dReps'}
                    title={
                        'Search and select dReps, and delegate your voting power'
                    }
                    content={
                        'Search for your dReps by name, voting key or simply browse based on specific domains or tags.'
                    }
                />
                <Row>
                    <div id="filters">
                        <Col sm={12} className="my-3">
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
                                            onClick={() => handleSelectTag(tag)}
                                        >
                                            {tag}
                                        </TagComponent>
                                    ))}
                                </Col>
                                {isScrollEnd === false ? (
                                    <div className="scroll-button scroll-button-right">
                                        <div className="arrow-shadow"></div>
                                        <div className="arrow-div">
                                            <Arrow onClick={() => scroll(60)} />
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
                                        Showing {filteredDrepList?.length}{' '}
                                        results
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                    <Col sm={12}>
                        <Row>
                            <Col sm={12} id="dreps">
                                {filteredDrepList?.length !== 0 ? (
                                    filteredDrepList.map(
                                        ({ id, attributes }, index) => (
                                            <DrepItem
                                                setModal={
                                                    index === 0 &&
                                                    showSingleDrepModal
                                                }
                                                className={'mt-2'}
                                                key={id}
                                                drep={attributes}
                                                disableHover={true}
                                                id={id}
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
                </Row>
            </Col>
            <Joyride
                callback={handleJoyrideCallback}
                stepIndex={tourStep}
                steps={steps}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                run={showGuide || startTourGuide}
                styles={
                    tourStep === 2
                        ? {
                              options: {
                                  primaryColor: '#7c89f7',
                                  overlayColor: 'rgba(79, 26, 0, 0.0)',
                              },
                          }
                        : {
                              options: {
                                  primaryColor: '#7c89f7',
                              },
                          }
                }
                disableScrollParentFix
            />
        </Row>
    )
}
export default DrepList
