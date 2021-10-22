import React, { useCallback, useRef } from 'react'
import _noop from 'lodash/noop'
import _head from 'lodash/head'
import c from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import Button from 'components/Button'
import creator_dummy from 'assets/images/creator_dummy.png'

const imageStyles = {
	height: 180,
	width: 180
}

function ImagePopup(props) {
	const { callback = _noop, src, className, authorisation } = props
	const inputElement = useRef(null)

	const onChange = useCallback(
		async (_event) => {
			const { files } = _event.target
			callback(_head(files))
		},
		[callback]
	)

	const chooseFile = useCallback(() => {
		inputElement.current.click()
	}, [])

	return (
		<div
			className={c(
				'bg-body_blue flex flex-col items-center rounded border border-outline_blue p-8',
				className
			)}
		>
			<div>
				<Avatar src={src || creator_dummy} style={imageStyles} />
			</div>
			<input
				type='file'
				name='image'
				ref={inputElement}
				accept='image/*'
				className='hidden'
				onChange={onChange}
			/>
			{authorisation && (
				<div className='flex gap-x-3 w-full mt-6'>
					<Button
						text='Change photo'
						variant='filled'
						size='small'
						callback={chooseFile}
					/>
					<Button
						text='Remove Photo'
						variant='outline'
						size='small'
						className='text-secondary'
					/>
				</div>
			)}
		</div>
	)
}

export default React.memo(ImagePopup)
