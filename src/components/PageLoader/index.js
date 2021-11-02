import React from 'react'
import Lottie from 'react-lottie'
import { default as loadingAnimation } from 'assets/lotties/loading.json'
import { default as peopleAnimation } from 'assets/lotties/page_loader.json'

function PageLoader(props) {
	const { height = 100, width = 100, type = 'loading' } = props

	const defaultOptions = React.useMemo(
		() => ({
			loop: true,
			autoplay: true,
			animationData: type === 'loading' ? loadingAnimation : peopleAnimation,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice'
			}
		}),
		[type]
	)

	return (
		<div className='h-72 w-72 self-center mx-auto'>
			<Lottie {...props} options={defaultOptions} />
		</div>
	)
}

export default React.memo(PageLoader)
