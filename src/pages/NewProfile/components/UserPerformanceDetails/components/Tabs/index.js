import React, { useCallback } from 'react'
import c from 'classnames'

const tabStyles = {
	active:
		'border-b-4 border-outline_blue bg-opacity-70 bg-component_blue_full py-3',
	dormant: 'border-b-2 border-body_blue py-3'
}

function Tabs(props) {
	const { className, content, view, toggleView } = props

	const onClick = useCallback(
		(view) => {
			toggleView(view)
		},
		[toggleView]
	)

	const DataTab = ({ value, label, view, active }) => (
		<button
			onClick={() => onClick(view)}
			className={c('w-1/3', active ? tabStyles.active : tabStyles.dormant)}
		>
			<p className='text-primary text-darker_blue'>{value}</p>
			<p className='text-secondary text-white'>{label}</p>
		</button>
	)

	return (
		<div className={c('flex flex-1', className)}>
			<DataTab
				value={content?.numberOfPosts}
				active={view === 'POSTS'}
				label='Posts'
				view='POSTS'
			/>
			<DataTab
				value={content?.numberOfSources}
				active={view === 'ACADEMIC'}
				label='Academic Sources'
				view='ACADEMIC'
			/>
			<DataTab
				value={content?.numberOfFriends}
				active={view === 'FRIENDS'}
				label='Friends'
				view='FRIENDS'
			/>
		</div>
	)
}

export default Tabs
