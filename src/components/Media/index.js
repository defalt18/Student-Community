import React, { useCallback, useMemo } from 'react'
import c from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import { default as Placeholder } from '../PageLoader'
import { useToggle } from 'react-use'

function MediaContainer(props) {
	const { src, className, minHeight = 100 } = props
	const [show, toggle] = useToggle(true)

	const styles = useMemo(() => ({ minHeight }), [minHeight])
	const onLoad = useCallback(() => {
		toggle()
	}, [toggle])

	if (!_isEmpty(src)) {
		return (
			<div>
				{show && <Placeholder type='photo' style={styles} />}
				<img src={src} onLoad={onLoad} className={c(className)} alt='' />
			</div>
		)
	} else return null
}

export default MediaContainer
