import React, { useCallback, useState } from 'react'
import Input from './components/Input'
import _keys from 'lodash/keys'
import _forEach from 'lodash/forEach'
import Button from 'components/Button'
import { useFormik } from 'formik'
import _isEmpty from 'lodash/isEmpty'
import Select from './components/Select'
import MultiSelect from './components/MultiSelect'
import { initialUser } from '../../actions/auth-modal'
import { createUserWithCredentials } from '../../actions/auth'
import { VERIFY } from 'constants/routes'
import PageLoader from 'components/PageLoader'
import Dialog from 'components/Dialog'
import { useToggle } from 'react-use'

const classes = {
	container: 'bg-body_blue',
	input: 'p-3'
}

const validate = (values) => {
	const errors = {}

	_forEach(_keys(values), (value) => {
		if (
			_isEmpty(values[value]) &&
			value !== 'image' &&
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

	return errors
}

function Individual(props) {
	const { auth, history, db } = props
	const [loading, toggle] = useToggle(false)
	const [userSkills, setSkills] = useState([])

	const onSubmit = useCallback(
		async ({ confirmPassword, ...values }) => {
			toggle()
			await createUserWithCredentials('Individual', auth, db, {
				...values,
				skills: userSkills
			})
			history.push(VERIFY, { details: 'new user' })
		},
		[userSkills, history, auth, db, toggle]
	)

	const registration = useFormik({
		initialValues: initialUser,
		validate,
		onSubmit
	})

	return (
		<>
			<div className='flex flex-col w-full gap-y-6'>
				<div className='flex gap-x-3 w-full mt-12 flex-1'>
					<Input
						placeholder='Student ID*'
						classes={classes}
						name='studentId'
						type='number'
						value={registration.values.studentId}
						error={
							registration.touched.studentId && registration.errors.studentId
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
					placeholder='Username*'
					name='username'
					classes={classes}
					value={registration.values.username}
					error={registration.touched.username && registration.errors.username}
					onChange={registration.handleChange}
				/>
				<Input
					placeholder='Password*'
					name='password'
					type='password'
					classes={classes}
					value={registration.values.password}
					error={registration.touched.password && registration.errors.password}
					onChange={registration.handleChange}
				/>
				<Input
					placeholder='Re-enter password*'
					name='confirmPassword'
					type='password'
					classes={classes}
					value={registration.values.confirmPassword}
					error={
						registration.touched.confirmPassword &&
						registration.errors.confirmPassword
					}
					onChange={registration.handleChange}
				/>
				<Input
					placeholder='Bio(200 characters max)'
					name='bio'
					classes={classes}
					value={registration.values.bio}
					error={registration.touched.bio && registration.errors.bio}
					onChange={registration.handleChange}
				/>
				<div className='flex gap-x-3 w-full flex-1'>
					<Input
						placeholder='Firstname*'
						name='firstName'
						classes={classes}
						error={
							registration.touched.firstName && registration.errors.firstName
						}
						value={registration.values.firstName}
						onChange={registration.handleChange}
					/>
					<Input
						name='lastName'
						placeholder='Lastname*'
						classes={classes}
						value={registration.values.lastName}
						error={
							registration.touched.lastName && registration.errors.lastName
						}
						onChange={registration.handleChange}
					/>
				</div>
				<div className='flex gap-x-3 w-full flex-1'>
					<Input
						name='city'
						placeholder='City*'
						classes={classes}
						value={registration.values.city}
						error={registration.touched.city && registration.errors.city}
						onChange={registration.handleChange}
					/>
					<Input
						name='state'
						placeholder='State*'
						classes={classes}
						value={registration.values.state}
						error={registration.touched.state && registration.errors.state}
						onChange={registration.handleChange}
					/>
					<Input
						name='country'
						placeholder='Country*'
						classes={classes}
						value={registration.values.country}
						error={registration.touched.country && registration.errors.country}
						onChange={registration.handleChange}
					/>
				</div>
				<div className='flex gap-x-3 w-full flex-1'>
					<Select
						placeholder='Gender*'
						name='gender'
						value={registration.values.gender}
						error={registration.touched.gender && registration.errors.gender}
						onChange={registration.handleChange}
						options={['Male', 'Female', 'Prefer Not Say']}
					/>
					<Input
						placeholder='Birthdate*'
						type='date'
						classes={{ ...classes, input: 'p-1.5' }}
						value={registration.values.dob}
						error={registration.touched.dob && registration.errors.dob}
						name='dob'
						onChange={registration.handleChange}
					/>
				</div>
				<div className='flex gap-x-3 w-full flex-1'>
					<Select
						placeholder='Course*'
						name='course'
						value={registration.values.course}
						error={registration.touched.course && registration.errors.course}
						onChange={registration.handleChange}
						options={['ICT', 'ICT-CS', 'MnC', 'IT', 'ML']}
					/>
					<Select
						placeholder='Degree*'
						name='degree'
						value={registration.values.degree}
						error={registration.touched.degree && registration.errors.degree}
						onChange={registration.handleChange}
						options={['B.Tech', 'M.Tech', 'PhD', 'MscIT', 'MDes']}
					/>
					<Select
						placeholder='Batch*'
						name='batch'
						value={registration.values.batch}
						error={registration.touched.batch && registration.errors.batch}
						onChange={registration.handleChange}
						options={[2018, 2019, 2020, 2021, 2022]}
					/>
				</div>
				<MultiSelect
					label='Skills'
					placeholder='Select Skills'
					name='skills'
					onChange={setSkills}
				/>
			</div>
			<Button
				size='large'
				variant='filled'
				callback={registration.handleSubmit}
				text='Sign Up'
				type='submit'
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

export default React.memo(Individual)
