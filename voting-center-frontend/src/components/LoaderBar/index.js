import ProgressBar from 'react-bootstrap/ProgressBar'

import './styles.scss'

const LoaderBar = ({ now }) => {
    return <ProgressBar now={now} className="progress-bar-loader" />
}

export default LoaderBar
