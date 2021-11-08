import React, { useCallback } from 'react'
import MediaContainer from 'components/Media'
import dummy_cover from 'assets/images/dummy_cover.png'
import Dialog from '../../../../components/Dialog'
import { useToggle } from 'react-use'
import ImagePopup from '../UserDetails/components/ImagePopup'
import { updateUserDetails, uploadImageInDirectory } from 'services/user-utils'
import _isEmpty from 'lodash/isEmpty'
import { deleteImageFromStorage } from '../../../Admin/utils'

function Cover(props) {
	const { content, user } = props
	const [showActions, toggle] = useToggle(false)
	const cover = content?.userdata?.cover || dummy_cover
	const authorised = content?.userdata?.NO_ID_FIELD === user.uid

	const updateCover = useCallback(
		async (file) => {
			const url = await uploadImageInDirectory(
				`users/${user.uid}/cover`,
				'cover',
				file
			)
			await updateUserDetails({ cover: url }, user.uid)
		},
		[user.uid]
	)

	const removeCover = useCallback(async () => {
		if (!_isEmpty(cover)) {
			await deleteImageFromStorage(cover)
			await updateUserDetails({ cover: '' }, user.uid)
		}
	}, [user.uid, cover])

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
						onClick={toggle}
						className='transition-all ease-in-out duration-200 text-secondary opacity-0 text-outline_blue bg-white py-1 px-3 rounded group-hover:opacity-100'
					>
						Change cover photo
					</button>
				)}
			</div>
			<Dialog open={showActions} toggle={toggle}>
				<ImagePopup
					src={cover}
					variant='cover'
					authorisation={authorised}
					callback={updateCover}
					removeCallback={removeCover}
				/>
			</Dialog>
		</div>
	)
}

export default React.memo(Cover)
