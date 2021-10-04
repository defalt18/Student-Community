import React from 'react'
import _map from 'lodash/map'
import Post from './components/Post'

import { CircularProgress as Loader } from '@material-ui/core'
import Stories from './components/Story'
import useHomeData from '../../hooks/useHomeData'

function Feed() {
	const { loading, posts } = useHomeData()

	const greetUser = () => (
		<p className='text-primary text-white my-10'>Welcome back</p>
	)
	return (
		<div className='h-screen pb-10 w-7/12 flex-none pt-20 px-7 flex flex-col overflow-y-scroll'>
			<Stories />
			{greetUser()}
			<div className='flex flex-col gap-y-8 text-white'>
				{loading ? (
					<Loader className='mx-auto' color='inherit' />
				) : (
					_map(posts, (post) => <Post key={post.id} {...post} />)
				)}
			</div>
		</div>
	)
}

export default Feed
