import React, { useCallback, useState } from 'react'
import Individual from './Individual'
import Club from './Club'
import { VIEWS } from '../../fixtures'
import c from 'classnames'
import { useAuth, useFirestore } from 'reactfire'
import { useHistory } from 'react-router-dom'

function RegisterForm() {
	const [view, setView] = useState(VIEWS.Individual)
	const auth = useAuth()
	const history = useHistory()
	const db = useFirestore()
	const content = { auth, db, history }
	const onClick = useCallback(
		(_event) => {
			const { value } = _event.currentTarget
			setView(value)
		},
		[setView]
	)
	const renderContent = () => {
		if (view === VIEWS.Individual) return <Individual {...content} />

		return <Club {...content} />
	}

	return (
		<div className='flex flex-col items-center pb-8 w-full'>
			<p className='text-primary text-white my-16'>
				Fill in the details to register
			</p>
			<p className='text-secondary text-white'>What are you signing up as?</p>
			<div className='flex gap-x-3 mt-3'>
				<button
					value={VIEWS.Individual}
					onClick={onClick}
					className='p-3 flex gap-x-4 items-center text-white justify-center bg-body_blue w-40 border border-white border-opacity-50 rounded'
				>
					<div
						className={c(
							'rounded-3xl w-3 h-3 ring ring-app_white ring-offset-2 ring-offset-body_blue',
							VIEWS.Individual === view ? 'bg-app_white' : null
						)}
					/>
					<p className='text-secondary'>Individual</p>
				</button>
				<button
					value={VIEWS.Club}
					onClick={onClick}
					className='group p-3 flex gap-x-4 items-center text-white w-40 bg-body_blue justify-center border border-white border-opacity-50 rounded'
				>
					<div
						className={c(
							'rounded-3xl w-3 h-3 ring ring-app_white ring-offset-2 ring-offset-body_blue',
							VIEWS.Club === view ? 'bg-app_white' : null
						)}
					/>
					<p className='text-secondary'>Club</p>
				</button>
			</div>
			{renderContent()}
		</div>
	)
}

export default RegisterForm
