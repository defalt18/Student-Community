import React from 'react'
import Input from './components/Input'
import _keys from 'lodash/keys'
import Button from 'components/Button'
import _size from 'lodash/size'
import TextArea from './components/TextArea'
import _map from 'lodash/map'
import PageLoader from 'components/PageLoader'
import Dialog from 'components/Dialog'
import { useRegisterActions } from '../../hooks/useRegisterActions'

const MAX_CORE_MEMBERS = 9

const classes = {
	container: 'bg-body_blue',
	input: 'p-3'
}

function Club() {
	const {
		onSubmit,
		loading,
		values,
		onChange,
		toggle,
		errors,
		touched,
		residualActions
	} = useRegisterActions('Club')

	const { incrementInput, handleMemberChange, members } = residualActions
	return (
		<>
			<div className='flex flex-col w-full gap-y-6'>
				<div className='flex gap-x-3 w-full mt-12 flex-1'>
					<Input
						placeholder='Club ID*'
						classes={classes}
						name='username'
						value={values.username}
						error={touched.username && errors.username}
						onChange={onChange}
					/>
					<Input
						placeholder='Email ID*'
						name='email'
						classes={classes}
						type='email'
						value={values.email}
						error={touched.email && errors.email}
						onChange={onChange}
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
					type='password'
					name='confirmPassword'
					classes={classes}
					value={values.confirmPassword}
					error={touched.confirmPassword && errors.confirmPassword}
					onChange={onChange}
				/>
				<TextArea
					placeholder='About the club (400 characters max)*'
					name='bio'
					value={values.bio}
					error={touched.bio && errors.bio}
					onChange={onChange}
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
				callback={onSubmit}
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
