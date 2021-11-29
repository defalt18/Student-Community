import React from 'react'
import Lottie from 'react-lottie'
import { default as loadingAnimation } from 'assets/lotties/hourglass.json'
import { default as peopleAnimation } from 'assets/lotties/cube.json'
import { default as picLoader } from 'assets/lotties/imageloader.json'
import c from 'classnames'

function PageLoader(props) {
	const { type = 'loading', className, style } = props

	const defaultOptions = React.useMemo(
		() => ({
			loop: true,
			autoplay: true,
			animationData:
				type === 'loading'
					? loadingAnimation
					: type === 'photo'
					? picLoader
					: peopleAnimation,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice'
			}
		}),
		[type]
	)

	return (
		<div
			style={style}
			className={c('h-72 w-72 self-center mx-auto', className)}
		>
			<Lottie {...props} options={defaultOptions} />
		</div>
	)
}

export default React.memo(PageLoader)
