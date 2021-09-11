/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {
	Home,
	SignIn,
	SignUp,
	Polling,
	Settings,
	Resources,
	ChatApp,
	Clubs,
	Parts,
	Clubdesc,
	Events,
	Friends,
	Prof
} from './pages'
import * as ROUTES from './constants/routes'
import { IsUserRedirect, ProtectedRoute } from './helpers/routes'
import { useAuthListener } from './hooks'
import { getMinimalUserById } from "./services/user-utils";
import { Header, Sidebar } from './components'
import { db } from './lib/firebase.prod'

import Navbar from './components/Navbar/Navbar'
import "./components/Custom/Custom.import"

export default function App() {
	const { user } = useAuthListener();
	const [userDetails, setUserDetails] = useState(null);

	async function fetchUserDetails() {
		const details = await getMinimalUserById(user.uid);
		setUserDetails(details);
	}

	useEffect(() => {
		if (user) {
			fetchUserDetails();
		}
	}, [user])

	return (
		<Fragment>
			<Route path="/">
				{
					userDetails &&
						<Fragment>
							<Navbar userDetails={userDetails} />
							<div className="temp">
								<Sidebar />
							</div>
						</Fragment>
				}
			</Route>
			<Route exect path="/signin">
				<SignIn />
			</Route>
		</Fragment>

	)
}
