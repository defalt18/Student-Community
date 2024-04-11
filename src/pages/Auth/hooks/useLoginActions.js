import { useToggle } from 'react-use'
import { useCallback, useState } from 'react'
import { signInWithCredentials } from '../actions/auth'
import { HOME, VERIFY } from 'constants/routes'
import { useAuth } from 'reactfire'
import { useHistory } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

const DEMO_CREDENTIALS = {
	email: atob('MjAxODAxMDA1QGRhaWljdC5hYy5pbg=='),
	password: atob('MTIzNDU2')
}

export function useLoginActions() {
	const [loading, toggle] = useToggle(false)
	const auth = useAuth()
	const history = useHistory()
	const [credentials, setCredentials] = useState({
		email: '',
		password: ''
	})

	const onChange = useCallback(
		(_event) => {
			const { name, value } = _event.target
			setCredentials({ ...credentials, [name]: value })
		},
		[credentials, setCredentials]
	)

	const onSignIn = useCallback(
		async (_event, context) => {
			_event.preventDefault()
			toggle()
			const { user, error } = await signInWithCredentials(
				auth,
				context === 'demo' ? DEMO_CREDENTIALS : credentials
			)
			if (_isEmpty(user)) {
				toggle()
				return
			}
			if (user?.emailVerified && error === 'SUCCESS') {
				if (!user.emailVerified) history.push(VERIFY)
				else {
					// update local storage to remove stale values
					localStorage.setItem('authUser', JSON.stringify(user))
					history.replace(HOME)
				}
			}
			toggle()
		},
		[auth, credentials, history, toggle]
	)

	const onDemoSignIn = useCallback(
		async (_event) => {
			await onSignIn(_event, 'demo')
		},
		[onSignIn]
	)

	return {
		loading,
		values: credentials,
		onDemoSignIn,
		toggle,
		onChange,
		onSignIn
	}
}
