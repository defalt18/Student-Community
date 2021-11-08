import React, { useMemo } from 'react'
import c from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import { default as Placeholder } from '../PageLoader'
import { useToggle } from 'react-use'

function MediaContainer(props) {
	const { src, className, minHeight = 100, showPlaceholder = true } = props
	const [show, toggle] = useToggle(true)

	const styles = useMemo(() => ({ minHeight }), [minHeight])

	if (!_isEmpty(src)) {
		return (
			<div>
				{show && showPlaceholder && <Placeholder type='photo' style={styles} />}
				<img
					src={src}
					onLoad={toggle}
					className={c(show ? 'hidden' : '', className)}
					alt=''
				/>
			</div>
		)
	} else return null
}

export default React.memo(MediaContainer)
