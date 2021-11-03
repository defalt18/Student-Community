import React, { useCallback } from 'react'
import { useToggle } from 'react-use'
import Button from 'components/Button'
import { Notifications as NotificationIcon } from '@material-ui/icons'
import { default as Portal } from 'react-portalize'
import Notification from 'components/Notifications'
import c from 'classnames'
import useNotifications from './hooks/useNotifications'
import PageLoader from 'components/PageLoader'
import _map from 'lodash/map'
import { clearNotificationById } from 'services/user-utils'
import _isEmpty from 'lodash/isEmpty'

function NotificationWindow(props) {
	const { user } = props
	const [open, toggle] = useToggle(false)

	const { loading, notifications } = useNotifications(user.uid)
	const handlePropagation = useCallback(
		(_event) => _event.stopPropagation(),
		[]
	)
	const onClear = useCallback(async () => {
		await clearNotificationById(user.uid, '*')
	}, [user.uid])

	return (
		<>
			<Button
				callback={toggle}
				className={c('rounded-3xl p-2', open ? 'bg-header_blue' : '')}
			>
				<NotificationIcon
					color='inherit'
					className={c(open ? 'text-outline_blue' : '')}
				/>
			</Button>
			{open && (
				<Portal container='#search_header'>
					<div
						onClick={toggle}
						className='w-screen h-screen bg-black bg-opacity-50 absolute z-20 top-0 bottom-0 left-0 right-0'
					>
						<div
							onClick={handlePropagation}
							className='relative top-16 mt-2 mx-auto gap-x-4 p-4 w-120 items-center bg-body_blue text-white rounded border border-component_blue_full border-opacity-50'
						>
							<div className='w-full mb-4 mt-1 flex flex-row-reverse'>
								<Button
									variant='standard'
									onClick={onClear}
									className='uppercase underline text-text_placeholder text-tertiary'
								>
									Clear All
								</Button>
							</div>
							<div className='flex flex-col gap-y-3'>
								{loading ? (
									<PageLoader type='loading' className='w-full h-full' />
								) : (
									_map(notifications, (thread) => (
										<Notification {...thread} user={user} />
									))
								)}
								{_isEmpty(notifications) && !loading && (
									<p className='text-secondary text-text_placeholder'>
										No notifications yet!
									</p>
								)}
							</div>
						</div>
					</div>
				</Portal>
			)}
		</>
	)
}

export default React.memo(NotificationWindow)
