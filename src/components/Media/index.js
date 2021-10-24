import React, { useCallback, useRef } from 'react'
import c from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import { Skeleton } from '@material-ui/lab'

function MediaContainer(props) {
	const { src, className, minHeight = 100 } = props
	const placeholder = useRef(null)

	const onLoad = useCallback(() => {
		placeholder.current.remove()
	}, [placeholder])

	if (!_isEmpty(src)) {
		return (
			<div>
				<Skeleton
					ref={placeholder}
					height={minHeight}
					width='100%'
					animation='wave'
				/>
				<img src={src} onLoad={onLoad} className={c(className)} alt='' />
			</div>
		)
	} else return null
}

export default MediaContainer
