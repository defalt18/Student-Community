import React, { useCallback, useState } from 'react'
import Input from './components/Input'
import _keys from 'lodash/keys'
import _forEach from 'lodash/forEach'
import Button from 'components/Button'
import { useFormik } from 'formik'
import _isEmpty from 'lodash/isEmpty'
import { initialClub } from '../../actions/auth-modal'
import { createUserWithCredentials } from '../../actions/auth'
import { VERIFY } from 'constants/routes'
import { ALL_CLUBS } from '../../fixtures'
import _has from 'lodash/has'
import _size from 'lodash/size'
import TextArea from './components/TextArea'
import _map from 'lodash/map'
import PageLoader from '../../../../components/PageLoader'
import Dialog from '../../../../components/Dialog'
import { useToggle } from 'react-use'

const MAX_CORE_MEMBERS = 9

const classes = {
	container: 'bg-body_blue',
	input: 'p-3'
}

const validate = (values) => {
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

	return errors
}

function Club(props) {
	const { auth, history, db } = props
	const [loading, toggle] = useToggle(false)
	const [members, setMembers] = useState(initialClub.coreDetails)

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

	const onSubmit = useCallback(
		async ({ confirmPassword, ...values }) => {
			await createUserWithCredentials('Club', auth, db, {
				...values,
				coreDetails: members
			})
			history.push(VERIFY)
		},
		[history, auth, db, members]
	)

	const registration = useFormik({
		initialValues: initialClub,
		validate,
		onSubmit
	})

	return (
		<>
			<div className='flex flex-col w-full gap-y-6'>
				<div className='flex gap-x-3 w-full mt-12 flex-1'>
					<Input
						placeholder='Club ID*'
						classes={classes}
						name='username'
						value={registration.values.username}
						error={
							registration.touched.username && registration.errors.username
						}
						onChange={registration.handleChange}
					/>
					<Input
						placeholder='Email ID*'
						name='email'
						classes={classes}
						type='email'
						value={registration.values.email}
						error={registration.touched.email && registration.errors.email}
						onChange={registration.handleChange}
					/>
				</div>
				<Input
					placeholder='Password*'
					name='password'
					classes={classes}
					value={registration.values.password}
					error={registration.touched.password && registration.errors.password}
					onChange={registration.handleChange}
				/>
				<Input
					placeholder='Re-enter password*'
					name='confirmPassword'
					classes={classes}
					value={registration.values.confirmPassword}
					error={
						registration.touched.confirmPassword &&
						registration.errors.confirmPassword
					}
					onChange={registration.handleChange}
				/>
				<TextArea
					placeholder='About the club (400 characters max)*'
					name='bio'
					value={registration.values.bio}
					error={registration.touched.bio && registration.errors.bio}
					onChange={registration.handleChange}
				/>
				{_map(_keys(members), (member, index) => (
					<>
						<p className='text-secondary-02 text-white'>
							Core member - {index + 1}
						</p>
						<div className='flex gap-x-3 w-full flex-1'>
							<Input
								placeholder='First Name*'
								classes={classes}
								value={members[member].firstName}
								onChange={handleMemberChange}
								name={`${member}_firstName`}
							/>
							<Input
								placeholder='Last Name'
								classes={classes}
								value={members[member].lastName}
								onChange={handleMemberChange}
								name={`${member}_lastName`}
							/>
						</div>
					</>
				))}
				{_size(members) < MAX_CORE_MEMBERS && (
					<div className='flex w-full flex-end'>
						<Button
							variant='outline'
							className='ml-auto px-12 h-7 text-secondary-03'
							text='Add +'
							callback={incrementInput}
						/>
					</div>
				)}
			</div>
			<Button
				size='large'
				variant='filled'
				callback={registration.handleSubmit}
				text='Sign Up'
				type='submit'
				awaitResponse={false}
				className='mx-auto mt-12'
			/>
			<Dialog open={loading} toggle={toggle} className='outline-none'>
				<div className='bg-component_core grid place-items-center p-2 outline-none'>
					<PageLoader type='loading' />
					<p className='text-secondary text-white'>Registering...</p>
				</div>
			</Dialog>
		</>
	)
}

export default Club
