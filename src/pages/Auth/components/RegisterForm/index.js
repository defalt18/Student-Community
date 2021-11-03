import React, { useCallback, useState } from 'react'
import UserImage from '../../../NewProfile/components/UserDetails/components/UserImage'
import dummy_creator from 'assets/images/creator_dummy.png'
import c from 'classnames'
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
import { useAuth, useFirestore } from 'reactfire'
import { useHistory } from 'react-router-dom'
import { VERIFY } from 'constants/routes'

const View = {
	Individual: 'INDIVIDUAL',
	Club: 'CLUB'
}

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
			value !== 'studentId'
		)
			errors[value] = 'Required'
	})

	if (!values.studentId) errors.studentId = 'Required'

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	return errors
}

function RegisterForm() {
	const [view, setView] = useState(View.Individual)
	const auth = useAuth()
	const history = useHistory()
	const db = useFirestore()
	const [userSkills, setSkills] = useState([])

	const onSubmit = useCallback(
		async (values) => {
			await createUserWithCredentials(auth, db, {
				...values,
				skills: userSkills
			})
			history.push(VERIFY)
		},
		[userSkills, history, auth, db]
	)

	const registration = useFormik({
		initialValues: initialUser,
		validate,
		onSubmit
	})

	const onClick = useCallback(
		(_event) => {
			const { value } = _event.currentTarget
			setView(value)
		},
		[setView]
	)

	return (
		<div className='flex flex-col items-center pb-8 w-full'>
			<p className='text-primary text-white my-16'>
				Fill in the details to register
			</p>
			<UserImage src={dummy_creator} className='mx-auto my-8' authorisation />
			<p className='text-secondary text-white'>What are you signing up as?</p>
			<div className='flex gap-x-3 mt-3'>
				<button
					value={View.Individual}
					onClick={onClick}
					className='p-3 flex gap-x-4 items-center text-white justify-center bg-body_blue w-40 border border-white border-opacity-50 rounded'
				>
					<div
						className={c(
							'rounded-3xl w-3 h-3 ring ring-app_white ring-offset-2 ring-offset-body_blue',
							View.Individual === view ? 'bg-app_white' : null
						)}
					/>
					<p className='text-secondary'>Individual</p>
				</button>
				<button
					value={View.Club}
					onClick={onClick}
					className='group p-3 flex gap-x-4 items-center text-white w-40 bg-body_blue justify-center border border-white border-opacity-50 rounded'
				>
					<div
						className={c(
							'rounded-3xl w-3 h-3 ring ring-app_white ring-offset-2 ring-offset-body_blue',
							View.Club === view ? 'bg-app_white' : null
						)}
					/>
					<p className='text-secondary'>Club</p>
				</button>
			</div>
			<div className='flex flex-col w-full gap-y-6'>
				<div className='flex gap-x-3 w-full mt-12 flex-1'>
					<Input
						placeholder='Student ID'
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
						placeholder='Email ID'
						name='email'
						classes={classes}
						type='email'
						value={registration.values.email}
						error={registration.touched.email && registration.errors.email}
						onChange={registration.handleChange}
					/>
					<Input
						name='password'
						placeholder='Password'
						classes={classes}
						type='password'
						value={registration.values.password}
						error={
							registration.touched.password && registration.errors.password
						}
						onChange={registration.handleChange}
					/>
				</div>
				<Input
					placeholder='Username'
					name='username'
					classes={classes}
					value={registration.values.username}
					error={registration.touched.username && registration.errors.username}
					onChange={registration.handleChange}
				/>
				<div className='flex gap-x-3 w-full flex-1'>
					<Input
						placeholder='Firstname'
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
						placeholder='Lastname'
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
						placeholder='City'
						classes={classes}
						value={registration.values.city}
						error={registration.touched.city && registration.errors.city}
						onChange={registration.handleChange}
					/>
					<Input
						name='state'
						placeholder='State'
						classes={classes}
						value={registration.values.state}
						error={registration.touched.state && registration.errors.state}
						onChange={registration.handleChange}
					/>
					<Input
						name='country'
						placeholder='Country'
						classes={classes}
						value={registration.values.country}
						error={registration.touched.country && registration.errors.country}
						onChange={registration.handleChange}
					/>
				</div>
				<div className='flex gap-x-3 w-full flex-1'>
					<Select
						placeholder='Gender'
						name='gender'
						value={registration.values.gender}
						error={registration.touched.gender && registration.errors.gender}
						onChange={registration.handleChange}
						options={['Male', 'Female', 'Prefer Not Say']}
					/>
					<Input
						placeholder='Birthdate'
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
						placeholder='Course'
						name='course'
						value={registration.values.course}
						error={registration.touched.course && registration.errors.course}
						onChange={registration.handleChange}
						options={['ICT', 'ICT-CS', 'MnC', 'IT', 'ML']}
					/>
					<Select
						placeholder='Degree'
						name='degree'
						value={registration.values.degree}
						error={registration.touched.degree && registration.errors.degree}
						onChange={registration.handleChange}
						options={['B.Tech', 'M.Tech', 'PhD', 'MscIT', 'MDes']}
					/>
					<Select
						placeholder='Batch'
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
		</div>
	)
}

export default RegisterForm
