import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { config } from './lib/firebase.prod'
import { FirebaseAppProvider } from 'reactfire'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import "./index.css"

render(
	<React.StrictMode>
		<Router>
			<Switch>
				<FirebaseAppProvider firebaseConfig={config}>
					<App />
				</FirebaseAppProvider>
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
