import React from 'react'
import { render } from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import './index.css'
import { config } from './lib/firebase.prod'
import { FirebaseAppProvider } from 'reactfire'

render(
	<React.StrictMode>
		<FirebaseAppProvider firebaseConfig={config.dev}>
			<CssBaseline />
			<App />
		</FirebaseAppProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
