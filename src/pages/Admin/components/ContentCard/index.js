import React, { useCallback } from 'react'
import MediaContainer from 'components/Media'
import { format } from 'date-fns'
import _noop from 'lodash/noop'

const COLORS_STYLES = {
	post: {
		backgroundColor: 'rgba(30, 217, 124, 0.1)',
		color: '#1ed97c'
	},
	story: {
		backgroundColor: 'rgba(18, 147, 227, 0.1)',
		color: '#1293e3'
	},
	user: {
		backgroundColor: 'rgba(156, 219, 20, 0.1)',
		color: '#9cdb14'
	},
	button: {
		backgroundColor: 'rgba(218, 74, 91, 0.1)',
		color: '#DA4A5B'
	}
}

function ContentCard(props) {
	const {
		id,
		type,
		creator,
		image,
		timestamp,
		caption = '',
		callback = _noop
	} = props

	const onClick = useCallback(async () => {
		if (type === 'post') await callback(id, { image }, 'posts')
		if (type === 'story') await callback(id, { image }, 'stories')
	}, [callback, image, type, id])

	return (
		<div className='bg-component_core bg-opacity-50 p-3 flex rounded gap-x-3'>
			<div className='flex-1 w-8/12 flex-col items-start'>
				<div className='justify-between flex items-center'>
					<div
						style={COLORS_STYLES[type]}
						className='p-1 px-4 rounded-xl uppercase text-secondary font-bold'
					>
						{type}
					</div>
					<button
						onClick={onClick}
						style={COLORS_STYLES['button']}
						className='text-secondary p-1 px-4 rounded-xl font-bold'
					>
						DELETE
					</button>
				</div>
				<p
					className='text-secondary text-white my-4 max-h-32 truncate'
					dangerouslySetInnerHTML={{ __html: caption }}
				/>
				<div className='mt-auto'>
					<p className='text-secondary text-outline_blue'>
						Posted on: {format(timestamp, 'MMMM dd, yyyy')}
					</p>
					<p className='text-secondary text-white'>By: {creator.name}</p>
				</div>
			</div>
			<MediaContainer
				src={image}
				minHeight={300}
				className='rounded w-72 h-72 object-cover'
			/>
		</div>
	)
}

export default React.memo(ContentCard)
