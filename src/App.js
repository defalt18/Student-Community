import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages'
import NewProfile from './pages/NewProfile'
import SignIn from 'pages/Auth/SignIn'
import SignUp from 'pages/Auth/SignUp'
import * as ROUTES from './constants/routes'
import { IsUserRedirect, ProtectedRoute } from './helpers/routes'
import VerificationScreen from './pages/Auth/VerificationScreen'
import Showcase from './pages/PublicContent'
import Admin from './pages/Admin'
import NonResponsiveOverlay from './components/NonResponsiveOverlay'

export default function App() {
	return (
		<>
			<NonResponsiveOverlay />
			<Router>
			<Switch>
				<Route exact path={ROUTES.SIGN_IN} component={SignIn} />
				<Route exact path={ROUTES.admin} component={Admin} />
				<Route exact path={ROUTES.Showcase} component={Showcase} />
				<Route exact path={ROUTES.SIGN_UP} component={SignUp} />
				<IsUserRedirect loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_UP}>
					<SignUp />
				</IsUserRedirect>
				<ProtectedRoute exact path={ROUTES.VERIFY}>
					<VerificationScreen />
				</ProtectedRoute>
				<ProtectedRoute exact path={ROUTES.HOME}>
					<Home />
				</ProtectedRoute>
				<ProtectedRoute exact path={ROUTES.PROFILE}>
					<NewProfile />
				</ProtectedRoute>
			</Switch>
			</Router>
		</>
	)
}
