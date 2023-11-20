import axios from './axiosInstance'

export const FUND_PROGRESS_TITLE = `Current Project Catalyst Fund Stage`
export const BETWEEN_PHASES_TITLE = `You can register to vote in the next Fund.`
export const PHASE_1_TITLE = `Submission`
export const PHASE_2_TITLE = `Refinement`
export const PHASE_3_TITLE = `Finalize`
export const PHASE_4_TITLE = `Assessment`
export const PHASE_5_TITLE = `Assessment QA`
export const PHASE_6_TITLE = `Voting`
export const PHASE_7_TITLE = `Tallying`

export function activeStageIndex(fundStage) {
    switch (fundStage) {
        case PHASE_1_TITLE:
            return 0
        case PHASE_2_TITLE:
            return 1
        case PHASE_3_TITLE:
            return 2
        case PHASE_4_TITLE:
            return 3
        case PHASE_5_TITLE:
            return 4
        case PHASE_6_TITLE:
            return 5
        case PHASE_7_TITLE:
            return 6
        case 'Between':
            return 7
        default:
            'Between'
            return 7
    }
}

export const formatCurrency = (number) =>
    Intl.NumberFormat('en-US', {
        style: 'decimal',
    }).format(number)

export const handleFundStage = (fundInfo, setFundStage) => {
    const dateNow = new Date()
    if (
        dateNow >= new Date(fundInfo?.schedule?.proposal_submission) &&
        dateNow < new Date(fundInfo?.schedule?.refine_proposals)
    ) {
        return setFundStage(PHASE_1_TITLE)
    } else if (
        dateNow >= new Date(fundInfo?.schedule?.refine_proposals) &&
        dateNow < new Date(fundInfo?.schedule?.finalize_proposals)
    ) {
        return setFundStage(PHASE_2_TITLE)
    } else if (
        dateNow >= new Date(fundInfo?.schedule?.finalize_proposals) &&
        dateNow < new Date(fundInfo?.schedule?.proposal_assessment)
    ) {
        return setFundStage(PHASE_3_TITLE)
    } else if (
        dateNow >= new Date(fundInfo?.schedule?.proposal_assessment) &&
        dateNow < new Date(fundInfo?.schedule?.assessment_qa_start)
    ) {
        return setFundStage(PHASE_4_TITLE)
    } else if (
        dateNow >= new Date(fundInfo?.schedule?.assessment_qa_start) &&
        dateNow < new Date(fundInfo?.schedule?.voting)
    ) {
        return setFundStage(PHASE_5_TITLE)
    } else if (
        dateNow >= new Date(fundInfo?.schedule?.voting) &&
        dateNow < new Date(fundInfo?.schedule?.tallying)
    ) {
        return setFundStage(PHASE_6_TITLE)
    } else if (
        dateNow >= new Date(fundInfo?.schedule?.tallying) &&
        dateNow < new Date(fundInfo?.schedule?.tallying_end)
    ) {
        return setFundStage(PHASE_7_TITLE)
    } else {
        return setFundStage('Between')
    }
}

export function debounce(cb, delay = 1000) {
    let timeout

    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

export const getDreps = async (selectedTags, searchInputValue, page, sort) => {
    const handleCombinedFilter = (tagsQuery) => {
        let inputText = searchInputValue
        let baseQuery = `/api/dreps?filters[$or][0][name][$containsi]=${inputText}&filters[$or][1][voting_key][$containsi]=${inputText}&filters[$or][2][tags][$containsi]=${inputText}&filters[$or][3][encoded_voting_key][$containsi]=${inputText}&pagination[page]=${page}&pagination[pageSize]=25${
            sort ? `&sort=${sort}` : ''
        }`
        let populateQuery = `&populate=*`
        // let sortQuery =
        //     sort === 'random' || sort === 'undefined' ? '' : `&sort=${sort}`
        let combinedQuery =
            tagsQuery.length > 0
                ? baseQuery.concat(tagsQuery).concat(populateQuery)
                : baseQuery.concat(populateQuery)
        return combinedQuery
    }

    const handleQueries = () => {
        let query = handleTagQuery()
        let combinedQuery = handleCombinedFilter(query)
        return combinedQuery
    }

    const handleTagQuery = () => {
        let tagQuery = ``
        selectedTags.forEach((tag, index) => {
            let newString = `&filters[$and][${index}][tags][$containsi]=${tag}`
            tagQuery = tagQuery.concat(newString)
        })

        return tagQuery
    }

    try {
        let combinedQuery = handleQueries()
        let { data } = await axios.get(combinedQuery)
        let dreps = data
        return dreps
    } catch (error) {
        console.error(error)
    }
}

export const capitalizeFirstLetter = (e) =>
    (e.target.value =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
