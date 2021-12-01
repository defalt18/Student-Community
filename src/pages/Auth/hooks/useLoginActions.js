import { useToggle } from 'react-use'
import { useCallback, useState } from 'react'
import { signInWithCredentials } from '../actions/auth'
import { HOME, VERIFY } from 'constants/routes'
import { useAuth } from 'reactfire'
import { useHistory } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

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
		async (_event) => {
			_event.preventDefault()
			toggle()
			const { user, error } = await signInWithCredentials(auth, credentials)
			if (_isEmpty(user)) {
				toggle()
				return
			}
			if (user?.emailVerified && error === 'SUCCESS') {
				if (!user.emailVerified) history.push(VERIFY)
				else history.replace(HOME)
			}
			toggle()
		},
		[auth, credentials, history, toggle]
	)

	return {
		loading,
		values: credentials,
		toggle,
		onChange,
		onSignIn
	}
}
