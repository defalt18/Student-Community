import { useToggle } from 'react-use'
import { useCallback, useMemo, useState } from 'react'
import { createUserWithCredentials } from '../actions/auth'
import { VERIFY } from 'constants/routes'
import { useAuth, useFirestore } from 'reactfire'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { initialClub, initialUser } from '../actions/auth-modal'
import _forEach from 'lodash/forEach'
import _keys from 'lodash/keys'
import _isEmpty from 'lodash/isEmpty'
import _has from 'lodash/has'
import { ALL_CLUBS } from '../fixtures'
import _size from 'lodash/size'
import { checkUserEmailInDatabase } from '../../../services/user-utils'

const VALIDATION = {
	Individual: async (values) => {
		const errors = {}

		_forEach(_keys(values), (value) => {
			if (
				_isEmpty(values[value]) &&
				value !== 'image' &&
				value !== 'username' &&
				value !== 'skills' &&
				value !== 'studentId' &&
				value !== 'bio'
			)
				errors[value] = 'Required'
		})

		if (!values.studentId) errors.studentId = 'Required'

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address'
		}

		if (values.password !== values.confirmPassword) {
			errors.password = errors.confirmPassword = "Passwords don't match!"
		}

		if (await checkUserEmailInDatabase(values.email))
			errors.email = 'User already registered'

		return errors
	},
	Club: async (values) => {
		const errors = {}

		_forEach(_keys(values), (value) => {
			if (_isEmpty(values[value]) && value !== 'coreDetails')
				errors[value] = 'Required'
		})

		if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ||
			!_has(ALL_CLUBS, values.email)
		) {
			errors.email = 'Invalid email address or club not present in system'
		}

		if (values.password !== values.confirmPassword) {
			errors.password = errors.confirmPassword = "Passwords don't match!"
		}

		if (await checkUserEmailInDatabase(values.email))
			errors.email = 'User already registered'

		return errors
	}
}

export function useRegisterActions(role) {
	const [loading, toggle] = useToggle(false)
	const [members, setMembers] = useState(initialClub.coreDetails)
	const auth = useAuth()
	const db = useFirestore()
	const history = useHistory()

	const onSubmitIndividual = useCallback(
		async ({ confirmPassword, ...values }) => {
			toggle()
			await createUserWithCredentials(values.role, auth, db, {
				...values,
				username: values.firstName + ' ' + values.lastName
			})
			history.push(VERIFY, { details: 'new user' })
		},
		[history, auth, db, toggle]
	)

	const onSubmitClub = useCallback(
		async ({ confirmPassword, ...values }) => {
			await createUserWithCredentials('Club', auth, db, {
				...values,
				coreDetails: members
			})
			history.push(VERIFY)
		},
		[history, auth, db, members]
	)

	const incrementInput = useCallback(() => {
		setMembers((allMembers) => ({
			...allMembers,
			[`member${_size(allMembers) + 1}`]: initialClub.coreDetails
		}))
	}, [setMembers])

	const handleMemberChange = useCallback(
		({ target }) => {
			const { name, value } = target
			const [key, field] = name.split('_')
			setMembers((allMembers) => ({
				...allMembers,
				[key]: { ...allMembers[key], [field]: value }
			}))
		},
		[setMembers]
	)

	const registration = useFormik({
		initialValues: role === 'Individual' ? initialUser : initialClub,
		validate: VALIDATION[role],
		onSubmit: role === 'Individual' ? onSubmitIndividual : onSubmitClub,
		validateOnBlur: false,
		validateOnChange: false
	})

	const residualActions = useMemo(() => {
		return {
			incrementInput,
			handleMemberChange,
			members
		}
	}, [incrementInput, members, handleMemberChange])

	return {
		onSubmit: registration.handleSubmit,
		loading,
		values: registration.values,
		onChange: registration.handleChange,
		errors: registration.errors,
		touched: registration.touched,
		residualActions
	}
}
