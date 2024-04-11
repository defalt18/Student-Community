import React, { useState } from 'react'
import c from 'classnames'
import Tabs from './components/Tabs'
import { Views } from './types'
import _map from 'lodash/map'
import Post from '../../../Home/components/Feed/components/Post'
import { default as LockIcon } from '@material-ui/icons/HttpsOutlined'
import MediaContainer from 'components/Media'
import { format } from 'date-fns'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/pickBy'
import _size from 'lodash/size'
import FriendCard from './components/FriendCard'
import _keys from 'lodash/keys'
import _has from 'lodash/has'
import _get from 'lodash/get'

const lockStyles = {
	height: 70,
	width: 70
}

function PerformanceDetails(props) {
	const { className, content, user } = props
	const [view, setView] = useState(Views.Posts)
	const posts = content.posts
	const events = content.events
	const userdata = content.userdata
	const contentPermissions = userdata.NO_ID_FIELD === user.uid

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
			const requests = _filter(userdata.friends, { status: 0 })
			const friends = _filter(userdata.friends, { status: 1 })
			if (!contentPermissions) {
				if (
					!_has(userdata?.friends, user.uid) &&
					_get(userdata ,`friends[${user.uid}].status`) !== 1
				)
					return (
						<div className='pt-8 grid place-items-center text-secondary text-white'>
							<LockIcon style={lockStyles} />
							<p className='mt-3'>Follow them to see their friends! 😁</p>
						</div>
					)
			}

			return (
				<div>
					{contentPermissions && (
						<div className='max-h-96 flex flex-col gap-y-3 overflow-scroll mb-8'>
							<p className='text-outline_blue text-secondary font-bold'>
								Friend requests({_size(requests)})
							</p>
							{_map(_keys(requests), (request) => (
								<FriendCard {...requests[request]} userdata={userdata} />
							))}
							{_isEmpty(_keys(requests)) && (
								<p className='text-secondary text-white w-full text-center'>
									No requests yet
								</p>
							)}
						</div>
					)}
					<div className='flex flex-col gap-y-3'>
						<p className='text-outline_blue text-secondary font-bold'>
							Current friends ({_size(friends)})
						</p>
						{_map(_keys(friends), (friend) => (
							<FriendCard {...friends[friend]} userdata={userdata} />
						))}
						{_isEmpty(_keys(friends)) && (
							<p className='text-secondary text-white w-full text-center'>
								No friends yet
							</p>
						)}
					</div>
				</div>
			)
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
					numberOfFriends: _size(_filter(userdata?.friends, { status: 1 })),
					numberOfEvents: _size(events)
				}}
				className={'w-full'}
			/>
			<div className='h-full overflow-y-scroll mt-2'>{renderView()}</div>
		</div>
	)
}

export default React.memo(PerformanceDetails)
