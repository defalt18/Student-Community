import React, { useCallback, useRef } from 'react'
import c from 'classnames'
import LazyLoad from 'react-lazyload'
import { Skeleton } from '@material-ui/lab'

function MediaContainer(props) {
	const { src, className } = props
	const placeholder = useRef(null)

	const onLoad = useCallback(() => {
		placeholder.current.remove()
	}, [placeholder])

	if (src) {
		return (
			<>
				<Skeleton
					ref={placeholder}
					height='100%'
					width='100%'
					animation='wave'
				/>
				<LazyLoad>
					<img
						src={src}
						onLoad={onLoad}
						className={c('w-full', className)}
						alt=''
					/>
				</LazyLoad>
			</>
		)
	} else return null
}

export default MediaContainer
