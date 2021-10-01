import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.css'
import { config } from './lib/firebase.prod'
import { FirebaseAppProvider } from 'reactfire'

import './index.css'

render(
	<React.StrictMode>
		<FirebaseAppProvider firebaseConfig={config.dev}>
			<CssBaseline />
			<App />
		</FirebaseAppProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
