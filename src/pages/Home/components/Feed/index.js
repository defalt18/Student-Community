import React from 'react'
import _map from 'lodash/map'
import Post from './components/Post'

import { CircularProgress as Loader } from '@material-ui/core'
import Stories from './components/Story'
import { useAsync } from 'react-use'
import { deleteOldData } from 'services/story-utils'

function Feed(props) {
	const { posts, stories: allStories, userdata, user } = props
	const { loading = true, value: stories } = useAsync(() =>
		deleteOldData(allStories)
	)
	const greetUser = () => (
		<p className='prompt-text text-white my-8'>Welcome back</p>
	)

	return (
		<div className='h-screen pb-10 flex-1 pt-24 px-7 flex min-w-800 flex-col overflow-y-scroll'>
			<Stories
				loading={loading}
				stories={stories}
				userdata={userdata}
				user={user}
			/>
			{greetUser()}
			<div className='flex flex-col gap-y-8 text-white'>
				{loading ? (
					<Loader className='mx-auto' color='inherit' />
				) : (
					_map(posts, (post) => (
						<Post key={post.id} userdata={userdata} {...post} />
					))
				)}
			</div>
		</div>
	)
}

export default React.memo(Feed)
