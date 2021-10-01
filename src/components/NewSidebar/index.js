import React, { useCallback, useState } from 'react'
import c from 'classnames'
import { LogoutIcon, BackIcon } from 'components/Icons'
import { useToggle } from 'react-use'
import _map from 'lodash/map'
import { VIEWS, OPTIONS, classNames } from './sidebar-data'
import { useAuth } from 'reactfire'
import { useHistory } from 'react-router-dom'
import * as ROUTES from 'constants/routes'

const Option = ({ id, label, icon, callback, open, activeItem }) => (
	<button
		className={c(
			classNames.normal,
			activeItem === id ? classNames.active : '',
			open ? 'pl-8' : 'grid place-items-center'
		)}
		onClick={() => callback(id)}
	>
		{icon}
		{open && <p className='text-secondary text-white'>{label}</p>}
	</button>
)

function NewSidebar() {
	const history = useHistory()
	const [open, toggle] = useToggle(false)
	const auth = useAuth()
	const [activeItem, setItem] = useState(VIEWS.HOME)

	const onClick = useCallback((id) => setItem(id), [setItem])

	const onClickLogout = useCallback(async () => {
		await auth.signOut()
		history.replace(ROUTES.SIGN_IN)
	}, [auth, history])

	return (
		<div
			className={c(
				'bg-component_blue flex flex-col gap-y-3 text-white w-24 pt-20 pb-4 overflow-hidden',
				open ? 'new-sidebar' : 'new-sidebar-ducked'
			)}
		>
			<button
				onClick={toggle}
				className={c(
					'w-max-content self-end p-2 rounded pr-1 mx-4 hover:bg-header_blue',
					open ? 'pr-1' : 'mx-auto transform rotate-180'
				)}
			>
				<BackIcon />
			</button>
			{_map(OPTIONS, (option) => (
				<Option
					open={open}
					callback={onClick}
					activeItem={activeItem}
					{...option}
				/>
			))}
			<button
				onClick={onClickLogout}
				className={c(
					'flex items-center gap-x-6 mt-auto mx-4 text-secondary p-4 justify-center border border-component_core rounded'
				)}
			>
				<LogoutIcon />
				{open && <p className='text-secondary text-white'>Logout</p>}
			</button>
		</div>
	)
}

export default NewSidebar
