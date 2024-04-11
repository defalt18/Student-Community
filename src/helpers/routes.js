import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthListener } from '../hooks'

export function IsUserRedirect({ loggedInPath, children, ...rest }) {
	const { user } = useAuthListener()
	return (
		<Route
			{...rest}
			render={() => {
				if (!user) {
					return children
				}

				if (user) {
					return (
						<Redirect
							to={{
								pathname: loggedInPath
							}}
						/>
					)
				}

				return null
			}}
		/>
	)
}

export function ProtectedRoute({ children, ...rest }) {
	const { user } = useAuthListener()
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (user) {
					return children
				}

				if (!user) {
					return (
						<Redirect
							to={{
								pathname: 'signin',
								state: { from: location }
							}}
						/>
					)
				}

				return null
			}}
		/>
	)
}
