import React from 'react'
import { render } from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import { config } from './lib/firebase.prod'
import { FirebaseContext } from './context/firebase'
import { FirebaseAppProvider } from 'reactfire'

render(
	<React.StrictMode>
		{/*<FirebaseContext.Provider value={{ firebase }}>*/}
		<FirebaseAppProvider firebaseConfig={config}>
			<CssBaseline />
			<App />
		</FirebaseAppProvider>
		{/*</FirebaseContext.Provider>*/}
	</React.StrictMode>,
	document.getElementById('root')
)
