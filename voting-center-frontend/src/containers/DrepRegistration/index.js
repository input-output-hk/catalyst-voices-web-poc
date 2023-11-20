import { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'

import Avatar from '../../assets/images/profile-avatar.svg'
import Arrow from '../../assets/svg/Arrow/Arrow'
import '../../assets/svg/Arrow/Arrow.scss'
import AvatarImage from '../../components/AvatarImage'
import ButtonComponent, {
    ButtonTypes,
    ButtonVariants,
} from '../../components/Button'
import ChangePictureButton from '../../components/ChangePictureButton'
import Checkbox from '../../components/Checkbox'
import ComboInput from '../../components/Inputs/ComboInput'
import Input from '../../components/Inputs/Input'
import SocialInput, { Socials } from '../../components/Inputs/SocialInput'
import Textarea from '../../components/Inputs/Textarea'
import LoaderBar from '../../components/LoaderBar'
import ErrorNotice from '../../components/Notices/ErrorNotice'
import GeneralNotice from '../../components/Notices/GeneralNotice'
import RegistrationInfo from '../../components/RegistrationInfo'
import SmallModal from '../../components/SmallModal'
import Tag from '../../components/Tag'
import ToggleButton from '../../components/ToggleButton'
import axios from '../../lib/axiosInstance'
import { useAppContext } from '../../lib/context'
import tags from '../../lib/mockData/tags.json'
import { useCallbackPrompt } from '../../util/useCallbackPrompt'

import {
    checkImage,
    getDrepByUsername,
    getDrepByVotingKey,
} from '../../lib/api'
import { capitalizeFirstLetter } from '../../lib/helpers'
import './styles.scss'

const MAX_STEPS = 5 // Maximum number of steps
const PROGRESS_STEP = (1 / MAX_STEPS) * 100 // Progress step based on number of maximum steps
const MAX_PROGRESS = 100 // Maximum progress % used when the step is final step
const FIRST_STEP = 1 // First step used for validating which button is shown on first step (with or without number)
const DEFAULT_DISABLE_STATE = true // Default state for button to be disabled on start until input is correct
const ERROR_LABEL = 'Please fill the highlighted fields' // ErrorNotice message for required input fields
const MAX_TAGS = 5 // Maximum number of selected Tags
const USERNAME_ERROR_MESSAGE = `The username is already taken.\nPlease try with different one.`

let selectedTags = []

const DrepRegistration = () => {
    const navigate = useNavigate()
    const {
        setMyDashboardClicked,
        redirectToDashboard,
        setCompletedDrepRegistration,
        connectedWallet,
        setDrepPendingReview,
        setIsDrep,
        setDrepProfile,
    } = useAppContext()

    let socialsList = {}
    Object.keys(Socials).map((social) => {
        socialsList = {
            ...socialsList,
            [social]: { focused: false, valid: false },
        }
    })

    const [showModal, setShowModal] = useState(false)

    const [legalMessage, setLegalMessage] = useState('')
    const [usernameError, setUsernameError] = useState(null)
    const [imageError, setImageError] = useState(null)
    const [registrationError, setRegistrationError] = useState(false)
    const [step, setStep] = useState(FIRST_STEP)
    const [progress, setProgress] = useState(null)
    const [disabled, setDisabled] = useState(DEFAULT_DISABLE_STATE)
    const [heading, setHeading] = useState('')
    const [checkAvailable, setCheckAvailable] = useState(true)
    const [complete, setComplete] = useState(false)
    const [disabledComplete, setDisabledComplete] = useState(true)
    const [skipped, setSkipped] = useState(false)
    const [valid, setValid] = useState(true)
    const [terms, setTerms] = useState({
        agree: false,
        privacy_policy: false,
        terms_and_conditions: false,
    })
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
        headline: {
            valid: false,
            focused: false,
        },
        profile_bio: {
            valid: false,
            focused: false,
        },
        contribution: {
            valid: false,
            focused: false,
        },
    })

    const [socialInputForm, setSocialInputForm] = useState(socialsList)
    const [finishStatus, setfinishStatus] = useState(false)

    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(
        showModal && !complete && !registrationError
    )

    // Warn user if browser back button is pressed during registration
    const onBackButtonEvent = (e) => {
        e.preventDefault()
        if (!finishStatus) {
            if (
                window.confirm(
                    "Are you sure you want to go back? Any progress won't be saved."
                )
            ) {
                setfinishStatus(true)
                navigate('/')
            } else {
                window.history.pushState(null, null, window.location.pathname)
                setfinishStatus(false)
            }
        }
    }

    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname)
        window.addEventListener('popstate', onBackButtonEvent)
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent)
        }
    }, [])

    // Handling inputs for Form, Errors and Accepted Terms, Policy
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        avatar: '',
        hide_email: true,
        headline: '',
        profile_bio: '',
        contribution: '',
        is_approved: false,
        voting_key: connectedWallet?.voting_key,
        encoded_voting_key: connectedWallet?.encoded_voting_key,
        socials: [],
        tags: [],
    })

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
    // Function that resets tags
    function resetSelectedTags() {
        selectedTags = []
    }
    // Reseting the Social Inputs Fields if they are in form
    function resetSocialInputs() {
        form.socials &&
            (delete form.socials,
            Object.keys(socialInputForm).map(
                (field) => (
                    setFocused(field, false), setFieldValid(field, false)
                )
            ))
    }

    function checkOrDeleteSocials() {
        form.socials && Object.keys(form.socials).length === 0
            ? delete form.socials
            : null
    }
    //Call for reset input fields or delete them if the is no single one entered
    function checkOrResetSocialInputs() {
        skipped ? resetSocialInputs() : checkOrDeleteSocials()
    }

    function checkOrDeleteTags() {
        form.tags && form.tags.length === 0 ? delete form.tags : null
    }

    function checkOrResetTags() {
        skipped
            ? (resetSelectedTags(), setSkipped(false), delete form.tags)
            : checkOrDeleteTags()
    }

    //Reseting completed registration state for now mocked
    function resetCompleted() {
        setCompletedDrepRegistration(false)
    }
    // Reseting Selected tags, Dashboard clicked state and Completed registration on page load
    useEffect(() => {
        resetSelectedTags()
        setMyDashboardClicked(false)
        resetCompleted()
    }, [])
    // Handling the form completing
    // For now it is mocked to always be fully accepted, but it needs to be done and handled for errors

    const handleIsDrep = async (voting_key) => {
        const drep = await getDrepByVotingKey(voting_key)

        if (drep) {
            if (drep?.attributes?.is_approved) {
                setDrepPendingReview(false)
                setIsDrep(true)
                setDrepProfile(drep)
                navigate('/dashboard')
            } else {
                setDrepPendingReview(true)
            }
        }
    }

    const handleComplete = async () => {
        try {
            const { data } = await axios.post('/api/dreps', {
                data: form,
            })

            if (data?.data) {
                if (data?.data?.attributes?.is_approved === true) {
                    handleIsDrep(data?.data?.attributes?.voting_key)
                } else {
                    setComplete(true)
                    setCompletedDrepRegistration(true)
                    setRegistrationError(false)
                    setDrepPendingReview(true)
                }
            } else {
                setRegistrationError(true)
            }
        } catch (err) {
            if (err?.response?.status === 451) {
                setComplete(true)
                setRegistrationError(true)
                setCompletedDrepRegistration(false)
                setLegalMessage(
                    `We've noticed the use of inappropriate language within your application. Please revise your content to adhere to our community guidelines.`
                )
            } else {
                setComplete(true)
                setRegistrationError(true)
                setCompletedDrepRegistration(false)
            }
        }
    }
    // Handling the Tags selection
    function handleTagSelect(e) {
        let selected = e.target.textContent

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
    //Setting the terms field values
    const setTermsField = (field, value) => {
        setTerms({
            ...terms,
            [field]: value,
        })
    }
    // Handling progress bar %
    function handleProgress() {
        step !== MAX_STEPS
            ? setProgress(step * PROGRESS_STEP)
            : setProgress(MAX_PROGRESS)
    }
    // Incrementing steps
    function increment() {
        step !== MAX_STEPS && setStep(step + 1)
    }
    // Handling skip
    function skip() {
        increment()
        setSkipped(true)
    }
    // Decrementing steps
    function decrement() {
        step !== FIRST_STEP && setStep(step - 1)
        setSkipped(false)
    }
    // Handling states based on step
    useEffect(() => {
        handleProgress()
        handleHeading()
        step === FIRST_STEP && checkValid() === 3 && setDisabled(false)
        step === 2 && checkProfileInputs()
        step === 4 && checkSocialInputs()
        if (step === 4) {
            checkOrResetTags()
        }
        if (step === MAX_STEPS) {
            checkOrResetSocialInputs()
        }

        if (step === 3) {
            setDisabled(false)
        }
    }, [step])
    //Handling the Headings
    function handleHeading() {
        switch (step) {
            case 1:
                setHeading('Basic information')
                break
            case 2:
                setHeading('Profile')
                break
            case 3:
                setHeading('Expertise / Interests')
                break
            case 4:
                setHeading('Socials')
                break
            case 5:
                setHeading('Privacy')
                break
            default:
                setHeading('')
                break
        }
    }
    //Returning the number of focused input fields
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
    // Handling showing the error message if some of input fields are invalid
    useEffect(() => {
        if (step !== 2) {
            showError()
            setDisabled(true)

            setTimeout(() => {
                checkValid() === 3 ? setDisabled(false) : setDisabled(true)
            }, 300)
        }
    }, [formValidation])

    // Handling Accepted Terms
    function checkAcceptedTerms() {
        let acceptedTerms = []
        let keys = Object.keys(terms)
        keys.forEach((field) => {
            terms[field] === true && acceptedTerms.push(terms[field])
        })
        return acceptedTerms.length
    }
    // Disabling or enabling the Complete button based on Accepted terms
    useEffect(() => {
        checkAcceptedTerms() === 3
            ? setDisabledComplete(false)
            : setDisabledComplete(true)
    }, [terms])
    // Handling Profile input fields minimum length and helping to Enable/Disable 'Next' button based on that
    function checkProfileInputs() {
        if (step === 2) {
            form.headline.length < 10 ||
            form.profile_bio.length < 10 ||
            (form.contribution.length < 10 && form.contribution.length > 0)
                ? setDisabled(true)
                : setDisabled(false)
        }
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
    // Whenever Headline, Contribution or Profile Bio input field changes here we are handling the state for the 'Next' button
    useEffect(() => {
        checkProfileInputs()
    }, [form.contribution, form.headline, form.profile_bio])

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
    }, [socialInputForm])

    const checkUsername = async () => {
        let data = await getDrepByUsername(form.username)
        if (data) {
            setValid(false)
            setUsernameError(USERNAME_ERROR_MESSAGE)
            setFieldValid('username', false)
        } else {
            setUsernameError(null)
        }
    }

    const onImageChange = async (event) => {
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
                    setField('avatar', '')
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

    useEffect(() => {
        form.username.length >= 6 && checkUsername()
        form.username.length < 6 && setUsernameError(null)
    }, [form.username])

    return (
        <>
            {!complete ? (
                <Row className="mb-4 drep-registration flex-md-row flex-column">
                    <Col className="d-flex flex-column mb-5">
                        <Col className="d-flex justify-content-between align-items-center align-content-center">
                            <div className="d-flex flex-row align-items-center drep-header">
                                {step === FIRST_STEP ? null : (
                                    <ButtonComponent
                                        type={ButtonTypes.Ghost}
                                        variant={ButtonVariants.Button}
                                        leadingIcon={<Arrow left />}
                                        className={'me-4'}
                                        onClick={decrement}
                                    >
                                        {step - 1}
                                    </ButtonComponent>
                                )}
                                <h2 className={`drep-heading`}>{heading}</h2>
                            </div>
                            <p className="drep-heading-steps">
                                {step} of {MAX_STEPS}
                            </p>
                        </Col>
                        <Col className="mb-2 mt-4">
                            <LoaderBar now={progress} />
                        </Col>
                        <Col className="d-flex flex-column first-step">
                            {/* FIRST STEP SECTION  */}

                            {step === FIRST_STEP && (
                                <>
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
                                        <Form.Label htmlFor="inputPassword5">
                                            Avatar (Optional)
                                        </Form.Label>
                                        <Col className="d-flex mb-4 align-items-center">
                                            <AvatarImage
                                                source={
                                                    form.avatar
                                                        ? form?.avatar
                                                        : form?.name
                                                        ? Avatar
                                                        : null
                                                }
                                                name={
                                                    form?.avatar
                                                        ? null
                                                        : form?.name
                                                }
                                                className="profile-info-avatar"
                                            />
                                            <ChangePictureButton
                                                className="ms-4"
                                                text="Upload avatar"
                                                onChange={onImageChange}
                                            />
                                        </Col>
                                        <p className="image-format-text mb-3">
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
                                    ></ToggleButton>
                                </>
                            )}

                            {/* SECOND STEP SECTION  */}

                            {step === 2 && (
                                <>
                                    {((formValidation.headline.focused &&
                                        form.headline.length < 10) ||
                                        (formValidation.profile_bio.focused &&
                                            form.profile_bio.length < 10)) && (
                                        <ErrorNotice
                                            label={
                                                usernameError
                                                    ? usernameError
                                                    : ERROR_LABEL
                                            }
                                        />
                                    )}
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
                                            e.target.value.length > 0 &&
                                                setFocused('headline', true)
                                        }}
                                        value={form.headline}
                                        count={form.headline.length}
                                        isInvalid={
                                            formValidation.headline.focused &&
                                            form.headline.length < 10
                                        }
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
                                            e.target.value.length > 0 &&
                                                setFocused('profile_bio', true)
                                        }}
                                        value={form.profile_bio}
                                        count={form.profile_bio.length}
                                        isInvalid={
                                            formValidation.profile_bio
                                                .focused &&
                                            form.profile_bio.length < 10
                                        }
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
                                            e.target.value.length > 0 &&
                                                setFocused('contribution', true)
                                        }}
                                        value={form.contribution}
                                        count={form.contribution.length}
                                        isInvalid={
                                            formValidation.contribution
                                                .focused &&
                                            form.contribution.length > 0 &&
                                            form.contribution.length < 10
                                        }
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
                                    <p className="dreps-tags-subheading mb-4">
                                        Tag your areas of expertise or interest
                                        so voters can find you more easily. You
                                        can select up to 5 tags.
                                    </p>
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
                                    <p className="dreps-tags-subheading mb-4">
                                        Link your accounts to give voters an
                                        opportunity to find out more about you
                                        and your work.
                                    </p>
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

                            {step === MAX_STEPS && !complete && (
                                <>
                                    <p className="dreps-tags-subheading mb-4">
                                        By connecting your wallet, you confirm
                                        that this wallet address remains fixed
                                        and the voting history for this wallet
                                        will be public. You also confirm that
                                        your profile information provided here
                                        will be made public and will be hosted
                                        on the official voting center for
                                        Project Catalyst.
                                    </p>
                                    <Checkbox
                                        label={'I agree.'}
                                        className={'mb-3'}
                                        onChange={(e) => {
                                            setTermsField(
                                                'agree',
                                                e.target.checked
                                            )
                                        }}
                                        checked={terms.agree}
                                        id="agree"
                                    ></Checkbox>
                                    <Checkbox
                                        label={
                                            <p>
                                                I agree to the{' '}
                                                <a className="drep-link">
                                                    Privacy Policy
                                                </a>
                                                .
                                            </p>
                                        }
                                        className={'mb-3'}
                                        onChange={(e) => {
                                            setTermsField(
                                                'privacy_policy',
                                                e.target.checked
                                            )
                                        }}
                                        checked={terms.privacy_policy}
                                        id="pos"
                                    ></Checkbox>
                                    <Checkbox
                                        label={
                                            <p>
                                                I agree to the{' '}
                                                <a className="drep-link">
                                                    Terms & Conditions
                                                </a>
                                                .
                                            </p>
                                        }
                                        onChange={(e) => {
                                            setTermsField(
                                                'terms_and_conditions',
                                                e.target.checked
                                            )
                                        }}
                                        id="tos"
                                        checked={terms.terms_and_conditions}
                                    ></Checkbox>
                                </>
                            )}
                        </Col>
                    </Col>
                    <Col className="d-flex w-100 flex-column align-items-center align-content-center justify-content-center align-content-md-end justify-content-md-end align-items-md-end drep-button-section">
                        <div className="d-flex flex-row drep-buttons">
                            <ButtonComponent
                                onClick={() => navigate('/')}
                                type={ButtonTypes.Ghost}
                                className={'me-3'}
                            >
                                Close
                            </ButtonComponent>

                            {step !== 1 && (
                                <ButtonComponent
                                    className={'me-3'}
                                    onClick={decrement}
                                >
                                    Back
                                </ButtonComponent>
                            )}

                            {step !== MAX_STEPS && (
                                <ButtonComponent
                                    onClick={increment}
                                    disabled={disabled}
                                >
                                    Next
                                </ButtonComponent>
                            )}

                            {step === MAX_STEPS && (
                                <ButtonComponent
                                    onClick={handleComplete}
                                    disabled={disabledComplete}
                                >
                                    Complete
                                </ButtonComponent>
                            )}
                        </div>
                    </Col>
                </Row>
            ) : (
                <RegistrationInfo
                    errorMessage={legalMessage ? legalMessage : null}
                    drepHeading={
                        registrationError
                            ? 'An error occurred'
                            : 'We are reviewing your application'
                    }
                    drepText={
                        registrationError
                            ? null
                            : 'We will let you know when your application is approved'
                    }
                    drepButtonText={
                        registrationError ? 'Try again' : 'My Dashboard'
                    }
                    onClick={
                        registrationError
                            ? () => {
                                  setComplete(false)
                                  setStep(FIRST_STEP)
                              }
                            : redirectToDashboard
                    }
                    buttonLink={
                        registrationError ? 'drep-registration' : 'dashboard'
                    }
                ></RegistrationInfo>
            )}

            {showModal && !complete && !registrationError && (
                <SmallModal
                    show={showPrompt}
                    title="Are you sure?"
                    description="Are you sure you want to cancel? Any progress won't be saved."
                    buttonText="Yes, cancel"
                    secondButtonText="No, continue"
                    onClick={confirmNavigation}
                    secondOnClick={cancelNavigation}
                    onClose={cancelNavigation}
                />
            )}
        </>
    )
}

export default DrepRegistration
