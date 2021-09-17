import React from 'react'
import c from 'classnames'

function MediaContainer(props) {
	const { src, className } = props
	if (src) return <img src={src} className={c('w-full', className)} />
	else return null
}

export default MediaContainer
