import React, { useState } from 'react'
import c from 'classnames'
import Tabs from './components/Tabs'
import { Views } from './types'
import _map from 'lodash/map'
import Post from '../../../Home/components/Feed/components/Post'
import _size from 'lodash/size'
import MediaContainer from 'components/Media'
import { format } from 'date-fns'
import _isEmpty from 'lodash/isEmpty'

function PerformanceDetails(props) {
	const { className, content } = props
	const [view, setView] = useState(Views.Posts)
	const posts = content.posts
	const events = content.events
	const userdata = content.userdata

	const renderView = () => {
		if (view === Views.Posts) {
			return (
				<div className='flex flex-col gap-y-6 mb-8 text-white'>
					{_isEmpty(posts) ? (
						<p className='text-secondary text-white'>No posts yet 🥲</p>
					) : (
						_map(posts, (post) => (
							<Post key={post.id} userdata={userdata} {...post} />
						))
					)}
				</div>
			)
		}
		if (view === Views.Academic) {
			return <p className='text-secondary text-white'>Coming Soon...</p>
		}
		if (view === Views.Friends) {
			return <p className='text-secondary text-white'>Coming Soon...</p>
		}
		if (view === Views.Events) {
			return (
				<div className='flex flex-col gap-y-6 mb-8 text-white'>
					{_map(events, (event) => (
						<div className='bg-header_blue p-5 rounded'>
							<MediaContainer
								src={event.poster}
								alt={event.eventName}
								className='max-h-64 w-full object-cover rounded'
							/>
							<p className='text-secondary text-white mb-1 mt-3'>
								{event.eventName}
							</p>
							<p className='text-tertiary text-white'>
								{format(event.startTime, 'MMM dd')} -{' '}
								{format(event.endTime, 'MMM dd')}
							</p>
						</div>
					))}
				</div>
			)
		}
	}

	return (
		<div className={c(className)}>
			<Tabs
				view={view}
				toggleView={setView}
				content={{
					userdata,
					numberOfPosts: _size(posts),
					numberOfEvents: _size(events)
				}}
				className={'w-full'}
			/>
			<div className='h-full overflow-y-scroll mt-2'>{renderView()}</div>
		</div>
	)
}

export default React.memo(PerformanceDetails)
