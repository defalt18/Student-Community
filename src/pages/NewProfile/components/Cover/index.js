import React from 'react'
import MediaContainer from 'components/Media'
import dummy_cover from 'assets/images/dummy_cover.png'
import _noop from 'lodash/noop'

function Cover(props) {
	const { callback = _noop, content, user } = props
	const cover = content?.userdata?.cover || dummy_cover
	const authorised = content?.userdata?.NO_ID_FIELD === user.uid
	return (
		<div className='relative w-full'>
			<MediaContainer
				src={cover}
				className='h-24 object-cover w-full'
				minHeight={150}
			/>
			<div className='z-10 grid w-full h-full absolute top-0 place-items-center group cursor-pointer'>
				{authorised && (
					<button
						onClick={callback}
						className='transition-all ease-in-out duration-200 text-secondary opacity-0 text-outline_blue bg-white py-1 px-3 rounded group-hover:opacity-100'
					>
						Change cover photo
					</button>
				)}
			</div>
		</div>
	)
}

export default React.memo(Cover)
