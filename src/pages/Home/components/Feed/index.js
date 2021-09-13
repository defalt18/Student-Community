import React from 'react'
import _map from 'lodash/map'
import Post from '../Post'
import { fetchHomePosts } from '../../utils/home-utils'
import { useAsync } from 'react-use'
import { CircularProgress as Loader } from '@material-ui/core'
import Story from '../Story'

function Feed() {
	const { loading, value: Posts } = useAsync(() => fetchHomePosts())

	return (
		<div className='h-full pb-10 w-auto pt-5 px-7 flex flex-col overflow-y-auto'>
			<Story />
			<h2 className='text-primary text-white my-10'>Welcome back</h2>
			<div className='flex flex-col gap-y-8 text-white'>
				{loading ? (
					<Loader className='mx-auto' color='inherit' />
				) : (
					_map(Posts, (post) => <Post key={post.id} {...post} />)
				)}
			</div>
		</div>
	)
}

export default Feed
