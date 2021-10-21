import React from 'react'
import Header from 'components/NewHeader'
import { useParams } from 'react-router-dom'
import Post from '../Home/components/Feed/components/Post'
import { useAsync } from 'react-use'
import StoryView from './components/StoryView'
import { getContent } from './hooks/useContentData'

function Showcase() {
	const contentInfo = useParams()
	const { type } = contentInfo

	const { loading, value: data } = useAsync(() => getContent(contentInfo))

	const renderContent = () => {
		switch (type) {
			case 'posts':
				return <Post {...data} />

			case 'story':
				return <StoryView {...data} />

			default:
				return null
		}
	}

	return (
		<div className='bg-body_blue h-screen w-screen grid place-items-center overflow-scroll py-24'>
			<Header />
			{loading ? (
				<p className='prompt-h2 text-white'>Your content is loading...</p>
			) : (
				<>{renderContent()}</>
			)}
		</div>
	)
}

export default Showcase
