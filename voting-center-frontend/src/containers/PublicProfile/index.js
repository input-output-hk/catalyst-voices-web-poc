import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { useLocation } from 'react-router-dom'
import ButtonComponent, {
    ButtonSizes,
    ButtonTypes,
    ButtonVariants,
} from '../../components/Button'
import ProfileCard from '../../components/ProfileCard'
import SmallCard from '../../components/SmallCard'

import { useNavigate, useParams } from 'react-router-dom'
import Avatar from '../../assets/images/profile-avatar.svg'
import MailIcon from '../../assets/svg/MailIcon'
import SettingsIcon from '../../assets/svg/SettingsIcon'
import ShareIcon from '../../assets/svg/ShareIcon'
import SocialDiscord from '../../assets/svg/SocialDiscord'
import SocialFacebook from '../../assets/svg/SocialFacebook'
import SocialGithub from '../../assets/svg/SocialGithub'
import SocialLinkedin from '../../assets/svg/SocialLinkedin'
import SocialTelegram from '../../assets/svg/SocialTelegram'
import SocialTwitter from '../../assets/svg/SocialTwitter'
import SocialYoutbe from '../../assets/svg/SocialYoutube'
import AvatarImage from '../../components/AvatarImage'
import ChangePictureButton from '../../components/ChangePictureButton'
import Dropdown from '../../components/Dropdown'
import ComboInput from '../../components/Inputs/ComboInput'
import Input from '../../components/Inputs/Input'
import SocialInput, { Socials } from '../../components/Inputs/SocialInput'
import Textarea from '../../components/Inputs/Textarea'
import LargeModal from '../../components/LargeModal'
import ErrorNotice from '../../components/Notices/ErrorNotice'
import GeneralNotice from '../../components/Notices/GeneralNotice'
import RegistrationInfo from '../../components/RegistrationInfo'
import ShareModal from '../../components/ShareModal'
import Tag from '../../components/Tag'
import ToggleButton from '../../components/ToggleButton'
import {
    checkImage,
    deleteDrep,
    getDrepByUsername,
    updateDrep,
} from '../../lib/api'
import { useAppContext } from '../../lib/context'
import tags from '../../lib/mockData/tags.json'
import ProfileContent from '../ProfileContent'

import { capitalizeFirstLetter } from '../../lib/helpers'
import './styles.scss'

const MAX_STEPS = 5 // Maximum number of steps
const FIRST_STEP = 1
const ERROR_LABEL = 'Please fill the highlighted fields'
const MAX_TAGS = 5
const USERNAME_ERROR_MESSAGE = `The username is already taken.\nPlease try with different one.`

let selectedTags = []

const visitorSteps = [
    {
        target: '.profile-content-profile-card',
        content: 'Here is the basic information about the dRep and the user.',
        disableBeacon: true,
    },
    {
        target: '#tags',
        content: 'Tags that describe the dRep.',
    },
    {
        target: '#balance',
        content: 'VP, Delegated ADA and Delegations are shown here.',
    },
    {
        target: '#about-contrib',
        content:
            'This section provides information about the dRep and contributions to Cardano',
    },
    {
        target: '#contact-and-voting-key',
        content:
            'Contact information and the public voting key are shown here.',
        placement: 'left',
    },
    {
        target: '#drep-buttons',
        content: 'Here we can share the dRep profile.',
        placement: 'left',
    },
]

const drepSteps = [
    {
        target: '.profile-content-profile-card',
        content: 'Here is the basic information about the dRep and the user.',
        disableBeacon: true,
    },
    {
        target: '#tags',
        content: 'Tags that describe the dRep.',
    },
    {
        target: '#balance',
        content: 'VP, Delegated ADA and Delegations are shown here.',
    },
    {
        target: '#about-contrib',
        content:
            'This section provides information about the dRep and contributions to Cardano',
    },
    {
        target: '#contact-and-voting-key',
        content:
            'Contact information and the public voting key are shown here.',
        placement: 'left',
    },
    {
        target: '#drep-buttons',
        content: 'Here we can edit and share the dRep profile.',
    },
    {
        target: '#edit-profile-modal .modal-content',
        content: 'In this modal we can edit the dRep profile.',
        placement: 'left',
    },
    {
        target: '#share-modal .modal-content',
        content:
            'Here we can share the dRep profile and copy the link of the profile.',
        placement: 'left',
    },
]

const PublicProfile = ({ className }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { username } = useParams()
    const {
        drepProfile,
        redirectToHomepage,
        setDrepProfile,
        setIsDrep,
        gvcVisitedRoutes,
        setGvcVisitedRoutes,
        startTourGuide,
        setStartTourGuide,
    } = useAppContext()

    const [usernameError, setUsernameError] = useState(null)
    const [imageError, setImageError] = useState(null)
    const [drepProfilePage, setDrepProfilePage] = useState()
    const [enableEditing, setEnableEditing] = useState(false)
    const [tourStep, setTourStep] = useState(0)
    const [showGuide, setShowGuide] = useState(true)
    const [guideSteps, setGuideSteps] = useState([])
    const { hide_email } = drepProfilePage?.attributes || {}

    const handleDrepProfile = async () => {
        if (location?.state?.isDrepProfile) {
            const res = await getDrepByUsername(username)
            if (res) {
                setDrepProfilePage(res)
            } else {
                redirectToHomepage()
            }
        } else if (drepProfile) {
            setDrepProfilePage(drepProfile)
        } else {
            const res = await getDrepByUsername(username)
            if (res) {
                setDrepProfilePage(res)
            } else {
                redirectToHomepage()
            }
        }
    }

    async function handleEditProfile() {
        const handleIsVisitor = () => {
            setEnableEditing(false)
            setGuideSteps(visitorSteps)
        }

        const handleIsDrepVisitor = () => {
            setEnableEditing(true)
            setGuideSteps(drepSteps)
        }

        drepProfile &&
        drepProfile?.attributes?.username ===
            drepProfilePage?.attributes?.username
            ? handleIsDrepVisitor()
            : handleIsVisitor()
        drepProfile &&
        drepProfile?.attributes?.username ===
            drepProfilePage?.attributes?.username
            ? setInitialForm()
            : null
    }

    useEffect(() => {
        handleDrepProfile()
    }, [drepProfile])

    useEffect(() => {
        handleEditProfile()
    }, [drepProfilePage])

    let socialsList = {}
    Object.keys(Socials).map((social) => {
        socialsList = {
            ...socialsList,
            [social]: { focused: false, valid: false },
        }
    })

    const [drepProfileLink, setDrepProfileLink] = useState(window.location.href)
    const [disabled, setDisabled] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [deleteProfile, setDeleteProfile] = useState(false)
    const [step, setStep] = useState(FIRST_STEP)
    const [checkAvailable, setCheckAvailable] = useState(true)
    const [valid, setValid] = useState(true)
    const [form, setForm] = useState({})
    const [socialInputForm, setSocialInputForm] = useState(socialsList)
    const [saveChangesClicked, setSaveChangesClicked] = useState(false)

    const [formValidation, setFormValidation] = useState({
        name: {
            valid: false,
            focused: false,
        },
        username: {
            valid: false,
            focused: false,
        },
        email: {
            valid: false,
            focused: false,
        },
    })
    const [showShareModal, setShowShareModal] = useState(false)

    const handleJoyrideCallback = (data) => {
        const { action, index, status, type } = data

        drepProfile &&
            drepProfile?.attributes?.username ===
                drepProfilePage?.attributes?.username
        if (index === 5 && type === EVENTS.STEP_AFTER) {
            action === ACTIONS.NEXT &&
            drepProfile &&
            drepProfile?.attributes?.username ===
                drepProfilePage?.attributes?.username
                ? setShowEditModal(true)
                : null
            setTourStep(index + (action === ACTIONS.PREV ? -1 : 1))
        }

        if (index === 6 && type === EVENTS.STEP_AFTER) {
            setShowEditModal(false)

            action === ACTIONS.NEXT && setShowShareModal(true)
            setTourStep(index + (action === ACTIONS.PREV ? -1 : 1))
        }

        if (index === 7 && type === EVENTS.STEP_AFTER) {
            setShowEditModal(false)

            if (action === ACTIONS.PREV) {
                setShowShareModal(false)
                setShowEditModal(true)
            }
            setTourStep(index + (action === ACTIONS.PREV ? -1 : 1))
        }

        if (type === EVENTS.TOUR_END) {
            setShowShareModal(false)
        }

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            // Update state to advance the tour
            setTourStep(index + (action === ACTIONS.PREV ? -1 : 1))
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
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

    function handleShareModal() {
        setShowShareModal(!showShareModal)
    }

    function copyToClipboard(value) {
        navigator.clipboard.writeText(value)
    }

    // Handling the focused state
    function setFocused(field, value) {
        let social = Object.keys(Socials).includes(field)
        let newFormValidation = social
            ? { ...socialInputForm }
            : { ...formValidation }
        newFormValidation[field].focused = value
        social
            ? setSocialInputForm(newFormValidation)
            : setFormValidation(newFormValidation)
    }
    //Handling the validity of input fields
    function setFieldValid(field, value) {
        let social = Object.keys(Socials).includes(field)
        let newFormValidation = social
            ? { ...socialInputForm }
            : { ...formValidation }
        newFormValidation[field].valid = value
        social
            ? setSocialInputForm(newFormValidation)
            : setFormValidation(newFormValidation)
    }

    function handleStep(e) {
        switch (e) {
            case 'Basic information':
                setStep(1)
                break
            case 'Biography':
                setStep(2)
                break
            case 'Expertise / Interests':
                setStep(3)
                break
            case 'Socials':
                setStep(4)
                break
            case 'Delete account':
                setStep(5)
                break
            default:
                setStep(1)
                break
        }
    }

    function handleTagSelect(e) {
        let selected = typeof e === 'object' ? e.target.textContent : e

        if (selectedTags.includes(selected)) {
            setCheckAvailable(true)
        }

        if (selectedTags.length > 0) {
            if (selectedTags.includes(selected)) {
                setCheckAvailable(true)
                selectedTags = selectedTags.filter((tag) => tag !== selected)
            } else {
                if (checkAvailable) {
                    selectedTags.push(selected)
                    if (selectedTags.length === MAX_TAGS) {
                        setCheckAvailable(false)
                    }
                }
            }
        } else {
            if (checkAvailable) {
                selectedTags.push(selected)
            }
        }
        setField('tags', selectedTags)
    }

    // Setting the form field value
    const setField = (field, value) => {
        Object.keys(Socials).includes(field)
            ? setForm({
                  ...form,
                  socials: {
                      ...form.socials,
                      [field]: value,
                  },
              })
            : setForm({
                  ...form,
                  [field]: value,
              })

        switch (field) {
            case 'name':
                handleValidation(field, value, /^[A-Z][a-zA-Z ]{1,49}$/)
                break
            case 'username':
                handleValidation(field, value, /^[a-zA-Z0-9 ]{6,50}$/)
                break
            case 'email':
                handleValidation(
                    field,
                    value,
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
                break
            case 'linkedin':
                handleValidation(
                    field,
                    value,
                    /^((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/
                )
                break
            case 'twitter':
                handleValidation(
                    field,
                    value,
                    /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
                )
                break
            case 'telegram':
                handleValidation(
                    field,
                    value,
                    /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/
                )
                break
            case 'discord':
                handleValidation(
                    field,
                    value,
                    /^(https?:\/\/)?(www\.)?(discord|discordapp)\.com\/users\/[0-9]{18}\/?$/
                )
                break
            case 'github':
                handleValidation(
                    field,
                    value,
                    /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/
                )
                break
            case 'youtube':
                handleValidation(
                    field,
                    value,
                    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
                )
                break
            case 'facebook':
                handleValidation(
                    field,
                    value,
                    /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
                )
                break
        }
    }

    // Handling input field validation with regex
    function handleValidation(field, value, regex) {
        const result = regex.test(value)
        if (result) {
            setFieldValid(field, true)
        } else {
            setFieldValid(field, false)
        }
    }
    // Handling the state of the valid state
    function showError() {
        if (checkFocused() === checkValid()) {
            setValid(true)
        } else {
            setValid(false)
        }
    }

    function checkFocused() {
        let focusedValues = []
        let keys = Object.keys(formValidation)
        keys.forEach((field) => {
            formValidation[field].focused === true &&
                focusedValues.push(formValidation[field])
        })
        return focusedValues.length
    }
    //Returning the number of valid input fields
    function checkValid() {
        let validValues = []
        let keys = Object.keys(formValidation)
        keys.forEach((field) => {
            formValidation[field].valid === true &&
                validValues.push(formValidation[field])
        })
        return validValues.length
    }

    const handleDrepContribution = (contribution) => {
        if (contribution?.length > 0 && contribution?.length < 10) {
            return true
        } else if (contribution?.length === 0) {
            return false
        } else {
            if (
                contribution?.toString()?.slice(0, 1) === ' ' ||
                contribution?.toString()?.slice(-1) === ' '
            ) {
                return true
            } else {
                return false
            }
        }
    }

    const handleDrepProfileInputs = (text) => {
        if (text?.length < 10) {
            return true
        } else {
            if (
                text?.toString()?.slice(0, 1) === ' ' ||
                text?.toString()?.slice(-1) === ' '
            ) {
                return true
            } else {
                return false
            }
        }
    }

    // Handling Profile input fields minimum length and helping to Enable/Disable 'Next' button based on that
    function checkProfileInputs() {
        handleDrepProfileInputs(form?.headline) ||
        handleDrepProfileInputs(form?.profile_bio) ||
        handleDrepContribution(form?.contribution)
            ? setDisabled(true)
            : setDisabled(false)
    }
    //Returning the number of focused Socials input fields
    function checkSocialsFocused() {
        let focusedValues = []
        let keys = Object.keys(socialInputForm)
        keys.forEach((field) => {
            socialInputForm[field].focused === true &&
                focusedValues.push(socialInputForm[field])
        })
        return focusedValues.length
    }
    //Returning the number of valid Socials input fields
    function checkSocialsValid() {
        let validValues = []
        let keys = Object.keys(socialInputForm)
        keys.forEach((field) => {
            socialInputForm[field].valid === true &&
                validValues.push(socialInputForm[field])
        })
        return validValues.length
    }
    // Disabling Next button on step 4 if some Social Input field is invalid
    function checkSocialInputs() {
        if (step === 4) {
            if (checkSocialsFocused() === checkSocialsValid()) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        }
    }

    // Handling states based on step
    useEffect(() => {
        step === FIRST_STEP && checkValid() === 3 && setDisabled(false)
        step === 2 && checkProfileInputs()
        step === 4 && checkSocialInputs()
    }, [step])

    const setInitialForm = () => {
        setForm(drepProfilePage.attributes)
        Object.entries(drepProfilePage.attributes).map(
            ([key, value] = entry) => {
                switch (key) {
                    case 'name':
                    case 'username':
                    case 'email':
                        setFieldValid(key, true)
                        setFocused(key, true)
                        break
                    case 'socials':
                        drepProfilePage.attributes.socials !== null
                            ? Object.keys(
                                  drepProfilePage.attributes?.socials
                              ).map((social) => {
                                  setFieldValid(social, true)
                                  setFocused(social, true)
                              })
                            : null
                        break
                    default:
                        break
                }
            }
        )
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

    // Deleting social input field invalid state if they are empty
    useEffect(() => {
        checkSocialInputs()
        form.socials &&
            Object.keys(socialInputForm).forEach((field) => {
                if (Object.keys(form.socials).includes(field)) {
                    if (form.socials[field] === '') {
                        delete form.socials[field]
                        setFocused(field, false)
                        setFieldValid(field, false)
                    }
                }
            })
        form.socials &&
            Object.keys(form.socials).length === 0 &&
            delete form.socials
    }, [socialInputForm])

    useEffect(() => {
        showError()
        setTimeout(() => {
            checkValid() === 3 ? setDisabled(false) : setDisabled(true)
        }, 300)
    }, [formValidation])

    // Whenever Headline, Contribution or Profile Bio input field changes here we are handling the state for the 'Next' button
    useEffect(() => {
        checkProfileInputs()
    }, [form.contribution, form.headline, form.profile_bio])

    function preselectTags() {
        selectedTags = []
        drepProfilePage.attributes.tags &&
            drepProfilePage?.attributes?.tags.map((tag) => handleTagSelect(tag))
    }

    function handleShowEditModal() {
        setShowEditModal(true)
        preselectTags()
        setInitialForm()
    }

    async function handleDeleteProfile() {
        try {
            const deletedDrep = await deleteDrep(drepProfilePage?.id)
            if (deletedDrep) {
                setShowEditModal(false)
                setDeleteProfile(true)
                setDrepProfile(null)
                setIsDrep(false)
                navigate('/dashboard')
            }
        } catch (error) {
            console.error(error)
        }
    }

    function handleRedirectToHomepage() {
        redirectToHomepage()
        setIsDrep(false)
    }

    useEffect(() => {
        form.tags && selectedTags.length === 0 && delete form.tags
    }, [selectedTags])

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = async () => {
                try {
                    let data = await checkImage(file)
                    if (data) {
                        setField('avatar', data?.data_url)
                        setImageError((_) => {
                            return null
                        })
                    }
                } catch (error) {
                    setField(
                        'avatar',
                        drepProfile?.attributes?.avatar
                            ? drepProfile?.attributes?.avatar
                            : ''
                    )
                    if (
                        error?.message ===
                        'Error resizing the image. Image too big!'
                    ) {
                        setImageError((_) => {
                            return `Image is too big.\nPlease try with different one.`
                        })
                        setValid((_) => {
                            return false
                        })
                        setTimeout(() => {
                            setImageError((_) => {
                                return null
                            })
                            setValid((_) => {
                                return true
                            })
                        }, 3000)
                    } else {
                        setImageError((_) => {
                            return `Error when checking image.\nPlease try again with different one.`
                        })
                        setValid((_) => {
                            return false
                        })
                        setTimeout(() => {
                            setImageError((_) => {
                                return null
                            })
                            setValid((_) => {
                                return true
                            })
                        }, 3000)
                    }
                }
            }
        }
    }

    const checkSize = (fileSize, limit) => {
        if (fileSize > limit) {
            alert('File size is greater than maximum limit.')
            return limit
        } else return
    }

    const handleCloseEdit = () => {
        setShowEditModal(false)
        setStep(1)
        setCheckAvailable(true) //important line of code!!!
    }

    const handleSaveChanges = async () => {
        setSaveChangesClicked(true)

        try {
            const res = await updateDrep(drepProfilePage?.id, form)
            setDrepProfile(res.data.data)
            handleCloseEdit()
        } catch (error) {
            console.error(error)
        }
    }

    const checkUsername = async () => {
        if (form.username === drepProfile?.attributes?.username) return
        let data = await getDrepByUsername(form.username)
        if (data) {
            setValid(false)
            setUsernameError(USERNAME_ERROR_MESSAGE)
            setFieldValid('username', false)
        } else {
            setUsernameError(null)
        }
    }

    useEffect(() => {
        form?.username?.length >= 6 && checkUsername()
        form?.username?.length < 6 &&
            (setUsernameError(null), setDisabled(true))
    }, [form?.username])
    return (
        <>
            {!deleteProfile ? (
                <Row className={`public-profile-wrapper ${className}`}>
                    <Col
                        sm={12}
                        md={8}
                        className="profile-wrapper mb-4 mb-md-0"
                    >
                        <Col sm={12} className="profile-content-main-wrapper">
                            <Row
                                className="justify-content-end pb-3 ms-auto"
                                id="drep-buttons"
                                style={{ width: 'fit-content' }}
                            >
                                {enableEditing && (
                                    <ButtonComponent
                                        type={ButtonTypes.Ghost}
                                        leadingIcon={<SettingsIcon />}
                                        size={ButtonSizes.SM}
                                        className={'me-3 edit-button'}
                                        onClick={handleShowEditModal}
                                    >
                                        Edit profile
                                    </ButtonComponent>
                                )}
                                <ButtonComponent
                                    type={ButtonTypes.Ghost}
                                    leadingIcon={<ShareIcon />}
                                    size={ButtonSizes.SM}
                                    className={'share-button'}
                                    onClick={handleShareModal}
                                >
                                    Share
                                </ButtonComponent>
                            </Row>
                            <ProfileContent
                                drep={drepProfilePage?.attributes}
                            />
                        </Col>
                    </Col>
                    <Col className="profile-chart" sm={12} md={4}>
                        <div id="contact-and-voting-key">
                            <SmallCard
                                title={'Contact Information'}
                                className={'mb-4 card-body-styling'}
                                content={
                                    <>
                                        {!hide_email && (
                                            <ButtonComponent
                                                type={ButtonTypes.Ghost}
                                                leadingIcon={<MailIcon />}
                                                className={
                                                    'drep-email-button mb-4'
                                                }
                                            >
                                                {
                                                    drepProfilePage?.attributes
                                                        ?.email
                                                }
                                            </ButtonComponent>
                                        )}

                                        {/* Social Icons Part */}
                                        <Col className="d-flex flex-wrap flex-wrap w-100 social-icons-row">
                                            {drepProfilePage?.attributes
                                                ?.socials?.facebook && (
                                                <a
                                                    href={
                                                        drepProfilePage
                                                            ?.attributes
                                                            ?.socials?.facebook
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <ButtonComponent
                                                        variant={
                                                            ButtonVariants.IconButton
                                                        }
                                                        type={ButtonTypes.Ghost}
                                                        className="social-icon-styling"
                                                        iconButton={
                                                            <SocialFacebook
                                                                iconColor={true}
                                                            />
                                                        }
                                                    ></ButtonComponent>
                                                </a>
                                            )}

                                            {drepProfilePage?.attributes
                                                ?.socials?.twitter && (
                                                <a
                                                    href={
                                                        drepProfilePage
                                                            ?.attributes
                                                            ?.socials?.twitter
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <ButtonComponent
                                                        variant={
                                                            ButtonVariants.IconButton
                                                        }
                                                        type={ButtonTypes.Ghost}
                                                        className="social-icon-styling"
                                                        iconButton={
                                                            <SocialTwitter
                                                                iconColor={true}
                                                            />
                                                        }
                                                    ></ButtonComponent>
                                                </a>
                                            )}

                                            {drepProfilePage?.attributes
                                                ?.socials?.linkedin && (
                                                <a
                                                    href={
                                                        drepProfilePage
                                                            ?.attributes
                                                            ?.socials?.linkedin
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <ButtonComponent
                                                        variant={
                                                            ButtonVariants.IconButton
                                                        }
                                                        type={ButtonTypes.Ghost}
                                                        className="social-icon-styling"
                                                        iconButton={
                                                            <SocialLinkedin
                                                                iconColor={true}
                                                            />
                                                        }
                                                    ></ButtonComponent>
                                                </a>
                                            )}

                                            {drepProfilePage?.attributes
                                                ?.socials?.telegram && (
                                                <a
                                                    href={
                                                        drepProfilePage
                                                            ?.attributes
                                                            ?.socials?.telegram
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <ButtonComponent
                                                        variant={
                                                            ButtonVariants.IconButton
                                                        }
                                                        type={ButtonTypes.Ghost}
                                                        className="social-icon-styling"
                                                        iconButton={
                                                            <SocialTelegram
                                                                iconColor={true}
                                                            />
                                                        }
                                                    ></ButtonComponent>
                                                </a>
                                            )}

                                            {drepProfilePage?.attributes
                                                ?.socials?.discord && (
                                                <a
                                                    href={
                                                        drepProfilePage
                                                            ?.attributes
                                                            ?.socials?.discord
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <ButtonComponent
                                                        variant={
                                                            ButtonVariants.IconButton
                                                        }
                                                        type={ButtonTypes.Ghost}
                                                        className="social-icon-styling"
                                                        iconButton={
                                                            <SocialDiscord
                                                                iconColor={true}
                                                            />
                                                        }
                                                    ></ButtonComponent>
                                                </a>
                                            )}

                                            {drepProfilePage?.attributes?.github
                                                ?.discord && (
                                                <a
                                                    href={
                                                        drepProfilePage
                                                            ?.attributes
                                                            ?.socials?.github
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <ButtonComponent
                                                        variant={
                                                            ButtonVariants.IconButton
                                                        }
                                                        type={ButtonTypes.Ghost}
                                                        className="social-icon-styling"
                                                        iconButton={
                                                            <SocialGithub
                                                                iconColor={true}
                                                            />
                                                        }
                                                    ></ButtonComponent>
                                                </a>
                                            )}

                                            {drepProfilePage?.attributes
                                                ?.socials?.youtube && (
                                                <a
                                                    href={
                                                        drepProfilePage
                                                            ?.attributes
                                                            ?.socials?.youtube
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <ButtonComponent
                                                        variant={
                                                            ButtonVariants.IconButton
                                                        }
                                                        type={ButtonTypes.Ghost}
                                                        className="social-icon-styling"
                                                        iconButton={
                                                            <SocialYoutbe
                                                                iconColor={true}
                                                            />
                                                        }
                                                    ></ButtonComponent>
                                                </a>
                                            )}
                                        </Col>
                                    </>
                                }
                            />

                            <ProfileCard
                                profile={false}
                                title={'Public voting key'}
                                contentText={
                                    drepProfilePage?.attributes
                                        ?.encoded_voting_key
                                }
                                buttonText={'Copy'}
                                className={`public-profile-card-styling wallet-address`}
                                onClick={(e) =>
                                    copyToClipboard(
                                        drepProfilePage?.attributes
                                            ?.encoded_voting_key
                                    )
                                }
                            />
                        </div>
                    </Col>
                </Row>
            ) : (
                <RegistrationInfo
                    drepHeading={'Your DRep profile has been deleted'}
                    drepText={"We're sorry to see you go."}
                    drepButtonText={'Go to home'}
                    onClick={handleRedirectToHomepage}
                />
            )}

            <LargeModal
                id="edit-profile-modal"
                show={showEditModal}
                placement={'right'}
                buttonText={
                    step === MAX_STEPS ? 'Delete profile' : 'Save Changes'
                }
                secondButtonText="Cancel"
                secondOnClick={handleCloseEdit}
                onClose={handleCloseEdit}
                disableButton={step !== MAX_STEPS ? disabled : false}
                destructive={step === MAX_STEPS}
                onClick={() =>
                    step !== MAX_STEPS
                        ? handleSaveChanges()
                        : handleDeleteProfile()
                }
            >
                <Row className="mb-4 edit-profile-modal flex-column w-100">
                    <Col className="d-flex flex-column w-100">
                        <Dropdown
                            className={'edit-modal-dropdown mb-5'}
                            whenSelected={(e) => {
                                handleStep(e)
                            }}
                            disabled={step === MAX_STEPS ? false : disabled}
                        />

                        <Col className="d-flex flex-column first-step">
                            {/* FIRST STEP SECTION  */}

                            {step === FIRST_STEP && (
                                <>
                                    {/* TODO ---- SHOWING ERROR NOTICE LOGIC */}
                                    {!valid && (
                                        <ErrorNotice
                                            label={
                                                usernameError
                                                    ? usernameError
                                                    : imageError
                                                    ? imageError
                                                    : ERROR_LABEL
                                            }
                                        />
                                    )}
                                    <Row>
                                        <Col className="d-flex mb-4 align-items-center">
                                            <AvatarImage
                                                source={
                                                    form?.avatar
                                                        ? form?.avatar
                                                        : drepProfile
                                                              ?.attributes
                                                              ?.avatar
                                                        ? drepProfile
                                                              ?.attributes
                                                              ?.avatar
                                                        : Avatar
                                                }
                                                name={
                                                    form?.avatar
                                                        ? null
                                                        : drepProfile
                                                              ?.attributes
                                                              ?.avatar
                                                        ? null
                                                        : form?.name
                                                }
                                                className="profile-info-avatar"
                                            />
                                            <ChangePictureButton
                                                className="ms-4"
                                                text="Change picture"
                                                onChange={onImageChange}
                                            />
                                        </Col>

                                        <p className="text-left image-format-text">
                                            Allowed formats: JPG, JPEG and PNG.
                                            Maximum size: 2MB. Your image will
                                            be resized to 200x200px.
                                        </p>
                                    </Row>
                                    <Input
                                        label={'Name (first and surname)'}
                                        placeholder={'e.g Peggy Gou'}
                                        className={`mb-4`}
                                        value={form.name}
                                        onChange={(e) => {
                                            capitalizeFirstLetter(e)
                                            setField('name', e.target.value)
                                            e.target.value.length > 0 &&
                                                setFocused('name', true)
                                        }}
                                        minLength={2}
                                        maxLength={50}
                                        isInvalid={
                                            formValidation.name.focused &&
                                            !formValidation.name.valid
                                        }
                                        required={true}
                                        focused={formValidation.name.focused.toString()}
                                    ></Input>
                                    <ComboInput
                                        label={'Ideascale username'}
                                        placeholder={'e.g peggygou'}
                                        className={'mb-4'}
                                        inputClassName={'username'}
                                        content={'@'}
                                        value={form.username}
                                        onChange={(e) => {
                                            setField('username', e.target.value)
                                            e.target.value.length > 0 &&
                                                setFocused('username', true)
                                        }}
                                        required={true}
                                        minLength={6}
                                        maxLength={50}
                                        isInvalid={
                                            formValidation.username.focused &&
                                            !formValidation.username.valid
                                        }
                                        focused={formValidation.username.focused.toString()}
                                    ></ComboInput>
                                    <Input
                                        label={'Email'}
                                        placeholder={
                                            'e.g. peggygou@example.com'
                                        }
                                        className={'mb-4'}
                                        value={form.email}
                                        onChange={(e) => {
                                            setField('email', e.target.value)
                                            e.target.value.length > 0 &&
                                                setFocused('email', true)
                                        }}
                                        isInvalid={
                                            formValidation.email.focused &&
                                            !formValidation.email.valid
                                        }
                                        focused={formValidation.email.focused.toString()}
                                    ></Input>
                                    <ToggleButton
                                        label={
                                            'Hide my email in my public profile'
                                        }
                                        onChange={(e) =>
                                            setField(
                                                'hide_email',
                                                e.target.checked
                                            )
                                        }
                                        checked={form.hide_email || ''}
                                        className={'edit-modal-toggle'}
                                    ></ToggleButton>
                                </>
                            )}

                            {/* SECOND STEP SECTION  */}

                            {step === 2 && (
                                <>
                                    <Textarea
                                        id={'firstTextarea'}
                                        label={'dRep Headline'}
                                        capture={
                                            'Provide a snippet of your experience, any achievements or personal motivations'
                                        }
                                        placeholder={
                                            'e.g Community manager and investor (minimum 10 characters)'
                                        }
                                        maxLength={140}
                                        required={true}
                                        onChange={(e) => {
                                            setField('headline', e.target.value)
                                        }}
                                        value={form.headline}
                                        count={form.headline.length}
                                    ></Textarea>
                                    <Textarea
                                        id={'secondTextarea'}
                                        label={'Profile Bio'}
                                        capture={
                                            'Write a concise bio, highlighting your interests and what parts of Catalyst matter to you'
                                        }
                                        placeholder={
                                            'Your statement (minimum 10 characters)'
                                        }
                                        maxLength={500}
                                        onChange={(e) => {
                                            setField(
                                                'profile_bio',
                                                e.target.value
                                            )
                                        }}
                                        value={form.profile_bio}
                                        count={form.profile_bio.length}
                                    ></Textarea>
                                    <Textarea
                                        id={'thirdTextarea'}
                                        label={
                                            'Contributions to the Cardano Ecosystem (Optional)'
                                        }
                                        capture={
                                            'Highlight any previous or ongoing contributions you make to the Cardano ecosystem'
                                        }
                                        placeholder={
                                            'Type here (minimum 10 characters)'
                                        }
                                        maxLength={500}
                                        onChange={(e) => {
                                            setField(
                                                'contribution',
                                                e.target.value
                                            )
                                        }}
                                        value={form.contribution}
                                        count={form.contribution.length}
                                    ></Textarea>
                                </>
                            )}

                            {/* THIRD STEP SECTION  */}

                            {step === 3 && (
                                <>
                                    {selectedTags.length === MAX_TAGS && (
                                        <GeneralNotice
                                            label={
                                                'You have selected the maximum number of tags. Please deselect if you wish to choose another.'
                                            }
                                        />
                                    )}
                                    <h3 className="dreps-tags-heading mb-3">
                                        Tags (Optional)
                                    </h3>
                                    <h4 className="dreps-tags-subheading mb-4">
                                        Tag your areas of expertise or interest
                                        so voters can find you more easily. You
                                        can select up to 5 tags.
                                    </h4>
                                    <div className="d-flex flex-wrap drep-tags-wrapper">
                                        {tags.map((tag, index) => (
                                            <Tag
                                                key={index}
                                                onClick={handleTagSelect}
                                                isCheckAvailable={
                                                    checkAvailable
                                                }
                                                stayActive={
                                                    selectedTags.includes(tag)
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {selectedTags.length !==
                                                MAX_TAGS
                                                    ? tag
                                                    : selectedTags.includes(tag)
                                                    ? tag
                                                    : '\xa0'.repeat(tag.length)}
                                            </Tag>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* FOURTH STEP SECTION  */}

                            {step === 4 && (
                                <>
                                    <h3 className="dreps-tags-heading mb-3">
                                        Social media platforms (Optional)
                                    </h3>
                                    <h4 className="dreps-tags-subheading mb-4">
                                        Link your accounts to give voters an
                                        opportunity to find out more about you
                                        and your work.
                                    </h4>

                                    {Object.keys(Socials).map((social) => (
                                        <SocialInput
                                            key={social}
                                            social={social}
                                            onChange={(e) => {
                                                setField(social, e.target.value)
                                                e.target.value.length > 0 &&
                                                    setFocused(social, true)
                                            }}
                                            isInvalid={
                                                socialInputForm[social]
                                                    .focused &&
                                                !socialInputForm[social].valid
                                            }
                                            value={
                                                form.socials
                                                    ? form.socials[social]
                                                    : ''
                                            }
                                        ></SocialInput>
                                    ))}
                                </>
                            )}
                            {/* FIFTH STEP SECTION */}

                            {step === MAX_STEPS && (
                                <>
                                    <h2 className="dreps-delete-account-heading mb-3">
                                        Close profile
                                    </h2>
                                    <span className="dreps-tags-subheading mb-5">
                                        By closing your dRep profile you will:
                                    </span>

                                    <ul>
                                        <li className="delete-account-list-item mb-3">
                                            Permanently delete your information
                                            from votecenter.io
                                        </li>
                                        <li className="delete-account-list-item mb-3">
                                            All voting history and reputation
                                            information shared on votecenter.io
                                            will be removed (however, previous
                                            voting history will remain permanent
                                            on Cardano blockchain)
                                        </li>
                                        <li className="delete-account-list-item mb-3">
                                            Have no option to reactivate or
                                            reopen your profile
                                        </li>
                                        <li className="delete-account-list-item mb-4">
                                            Lose all delegated voting power,
                                            which will be returned to their
                                            original holder AND you will be
                                            unable to recieve any future voting
                                            power.
                                        </li>
                                    </ul>
                                    <span className="dreps-tags-subheading">
                                        If you want to rejoin as a dRep in the
                                        future you will need to register again.
                                    </span>
                                </>
                            )}
                        </Col>
                    </Col>
                </Row>
            </LargeModal>

            {showShareModal && (
                <ShareModal
                    id="share-modal"
                    show={showShareModal}
                    onClose={() => setShowShareModal(!showShareModal)}
                    value={drepProfileLink && drepProfileLink}
                />
            )}
            <Joyride
                callback={handleJoyrideCallback}
                stepIndex={tourStep}
                steps={guideSteps}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                run={showGuide || startTourGuide}
                styles={
                    tourStep === 6 || tourStep === 7
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
        </>
    )
}

export default PublicProfile
