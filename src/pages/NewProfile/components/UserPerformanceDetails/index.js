import React, { useState } from 'react'
import c from 'classnames'
import Tabs from './components/Tabs'
import { Views } from './types'
import _map from 'lodash/map'
import Post from '../../../Home/components/Post'
import { useAsync } from 'react-use'
import { fetchHomePosts } from '../../../Home/utils/home-utils'
import { CircularProgress as Loader } from '@material-ui/core'

function PerformanceDetails(props) {
	const { className, content } = props
	const [view, setView] = useState(Views.Posts)

	const { loading, value: Posts } = useAsync(() => fetchHomePosts())
	const renderView = () => {
		if (view === Views.Posts) {
			return (
				<div className='flex flex-col gap-y-6 mb-8 text-white'>
					{loading ? (
						<Loader className='mx-auto' color='inherit' />
					) : (
						_map(Posts, (post) => <Post key={post.id} {...post} />)
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
	}

	return (
		<div className={c(className)}>
			<Tabs
				view={view}
				toggleView={setView}
				content={content}
				className={'w-full'}
			/>
			<div className='h-full overflow-y-scroll mt-2'>{renderView()}</div>
		</div>
	)
}

export default PerformanceDetails
