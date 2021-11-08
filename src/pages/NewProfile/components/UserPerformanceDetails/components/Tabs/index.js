import React, { useCallback } from 'react'
import c from 'classnames'

const tabStyles = {
	active: 'border-outline_blue bg-opacity-70 bg-component_blue_full',
	dormant: 'border-body_blue'
}

function Tabs(props) {
	const { className, content, view, toggleView } = props
	const {
		numberOfFriends = 0,
		numberOfPosts = 0,
		numberOfSources = 0,
		numberOfEvents = 0,
		userdata
	} = content

	const onClick = useCallback(
		(view) => {
			toggleView(view)
		},
		[toggleView]
	)

	const DataTab = ({ value, label, view, active }) => (
		<button
			onClick={() => onClick(view)}
			className={c(
				'w-1/3 py-3 border-b-4 flex-1',
				active ? tabStyles.active : tabStyles.dormant
			)}
		>
			<p className='text-primary text-darker_blue'>{value}</p>
			<p className='text-secondary text-white'>{label}</p>
		</button>
	)

	return (
		<div className={c('flex flex-1', className)}>
			<DataTab
				value={numberOfPosts}
				active={view === 'POSTS'}
				label='Posts'
				view='POSTS'
			/>
			{userdata.role === 'Club' ? (
				<DataTab
					value={numberOfEvents}
					active={view === 'EVENTS'}
					label='Events'
					view='EVENTS'
				/>
			) : (
				<>
					<DataTab
						value={numberOfSources}
						active={view === 'ACADEMIC'}
						label='Academic Sources'
						view='ACADEMIC'
					/>
					<DataTab
						value={numberOfFriends}
						active={view === 'FRIENDS'}
						label='Friends'
						view='FRIENDS'
					/>
				</>
			)}
		</div>
	)
}

export default React.memo(Tabs)
