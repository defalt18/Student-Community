import React from 'react'
import Input from './components/Input'
import Button from 'components/Button'
import Select from './components/Select'
import MultiSelect from './components/MultiSelect'
import PageLoader from 'components/PageLoader'
import Dialog from 'components/Dialog'
import { useRegisterActions } from '../../hooks/useRegisterActions'

const classes = {
	container: 'bg-body_blue',
	input: 'p-3'
}

function Individual() {
	const { onSubmit, loading, values, onChange, toggle, errors, touched } =
		useRegisterActions('Individual')

	return (
		<>
			<div className='flex flex-col w-full gap-y-6'>
				<div className='flex gap-x-3 w-full mt-12 flex-1'>
					<Input
						placeholder='Student ID*'
						classes={classes}
						name='studentId'
						type='number'
						value={values.studentId}
						error={touched.studentId && errors.studentId}
						onChange={onChange}
					/>
					<Input
						placeholder='Email ID*'
						name='email'
						classes={classes}
						type='email'
						value={values.email}
						onChange={onChange}
						error={touched.email && errors.email}
						// disabled
						// value={`${values.studentId ?? ''}@daiict.ac.in`}
					/>
				</div>
				<Input
					placeholder='Password*'
					name='password'
					type='password'
					classes={classes}
					value={values.password}
					error={touched.password && errors.password}
					onChange={onChange}
				/>
				<Input
					placeholder='Re-enter password*'
					name='confirmPassword'
					type='password'
					classes={classes}
					value={values.confirmPassword}
					error={touched.confirmPassword && errors.confirmPassword}
					onChange={onChange}
				/>
				<Input
					placeholder='Bio(200 characters max)'
					name='bio'
					classes={classes}
					value={values.bio}
					error={touched.bio && errors.bio}
					onChange={onChange}
				/>
				<div className='flex gap-x-3 w-full flex-1'>
					<Input
						placeholder='Firstname*'
						name='firstName'
						classes={classes}
						error={touched.firstName && errors.firstName}
						value={values.firstName}
						onChange={onChange}
					/>
					<Input
						name='lastName'
						placeholder='Lastname*'
						classes={classes}
						value={values.lastName}
						error={touched.lastName && errors.lastName}
						onChange={onChange}
					/>
				</div>
				<div className='flex gap-x-3 w-full flex-1'>
					<Input
						name='city'
						placeholder='City*'
						classes={classes}
						value={values.city}
						error={touched.city && errors.city}
						onChange={onChange}
					/>
					<Input
						name='state'
						placeholder='State*'
						classes={classes}
						value={values.state}
						error={touched.state && errors.state}
						onChange={onChange}
					/>
					<Input
						name='country'
						placeholder='Country*'
						classes={classes}
						value={values.country}
						error={touched.country && errors.country}
						onChange={onChange}
					/>
				</div>
				<div className='flex gap-x-3 w-full flex-1'>
					<Select
						placeholder='Gender*'
						name='gender'
						value={values.gender}
						error={touched.gender && errors.gender}
						onChange={onChange}
						options={['Male', 'Female', 'Prefer Not Say']}
					/>
					<Input
						placeholder='Birthdate*'
						type='date'
						classes={{ ...classes, input: 'p-1.5' }}
						value={values.dob}
						error={touched.dob && errors.dob}
						name='dob'
						onChange={onChange}
					/>
				</div>
				<div className='flex gap-x-3 w-full flex-1'>
					<Select
						placeholder='Course*'
						name='course'
						value={values.course}
						error={touched.course && errors.course}
						onChange={onChange}
						options={['ICT', 'ICT-CS', 'MnC', 'IT', 'ML']}
					/>
					<Select
						placeholder='Degree*'
						name='degree'
						value={values.degree}
						error={touched.degree && errors.degree}
						onChange={onChange}
						options={['B.Tech', 'M.Tech', 'PhD', 'MscIT', 'MDes']}
					/>
					<Select
						placeholder='Batch*'
						name='batch'
						value={values.batch}
						error={touched.batch && errors.batch}
						onChange={onChange}
						options={[2018, 2019, 2020, 2021, 2022]}
					/>
				</div>
				<MultiSelect
					label='Skills'
					placeholder='Select Skills'
					name='skills'
					onChange={onChange}
					error={errors.skills}
				/>
			</div>
			<Button
				size='large'
				variant='filled'
				callback={onSubmit}
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

export default Individual
