import React, { useCallback, useRef } from 'react'
import c from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import { FileDrop } from 'react-file-drop'
import { PlusIcon } from 'components/Icons'
import FileIcon from 'components/Icons/FileIcon'
import _head from 'lodash/head'

function DragAndDrop(props) {
	const { poster, setPoster } = props
	const onUploadPicture = useCallback(
		({ target }) => {
			const { files } = target
			setPoster(_head(files))
		},
		[setPoster]
	)

	const onDrop = useCallback(
		async (files) => {
			setPoster(_head(files))
		},
		[setPoster]
	)

	const fileInputRef = useRef(null)

	const onClick = useCallback(async () => {
		fileInputRef.current.click()
	}, [])

	return (
		<div
			className={c(
				'relative p-2 rounded border border-outline_dark border-opacity-40 w-full mt-3',
				_isEmpty(poster?.name)
					? ''
					: 'bg-component_blue text-secondary text-outline_blue border-none flex gap-x-2 items-center'
			)}
		>
			<input
				onChange={onUploadPicture}
				ref={fileInputRef}
				type='file'
				accept='image/*'
				className='hidden'
			/>
			{_isEmpty(poster?.name) ? (
				<>
					<FileDrop
						onDrop={onDrop}
						onTargetClick={onClick}
						className='h-36 bg-header_blue rounded cursor-pointer'
						targetClassName='h-full w-full'
					/>
					<div className='absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center w-full justify-center pointer-events-none'>
						<PlusIcon fill='#7DACF9' />
						<p className='text-white text-secondary mt-2'>Add your file</p>
						<p className='text-outline_blue text-secondary-03'>
							or drag and drop your file here
						</p>
					</div>
				</>
			) : (
				<>
					<FileIcon fill='#7DACF9' />
					<p>{poster.name}</p>
				</>
			)}
		</div>
	)
}

export default React.memo(DragAndDrop)
