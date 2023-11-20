import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import './index.scss'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { AppContextProvider } from './lib/context'

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Router>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </Router>
    </React.StrictMode>
)
