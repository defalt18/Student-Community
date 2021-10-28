import React, { useRef, useEffect, useState } from 'react'
import MediaContainer from 'components/Media'
import Avatar from 'components/Avatar'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { Link } from 'react-router-dom'
import { useToggle } from 'react-use'
import Button from 'components/Button'

const MAX_TIME = 4000

const Timer = React.memo((props) => {
	const { play } = props

	const [timerValue, setTimerValue] = useState(0)
	const timerRef = useRef()

	const startTimer = React.useCallback(() => {
		timerRef.current = setInterval(() => {
			setTimerValue((value) => {
				const newValue = value + 10
				if (newValue > MAX_TIME) {
					clearInterval(timerRef.current)
				}
				return play ? newValue : value
			})
		}, 10)
	}, [play])

	useEffect(() => {
		startTimer()
		return () => {
			clearInterval(timerRef.current)
		}
	}, [startTimer])

	const progress = (timerValue * 100) / MAX_TIME
	const progressBarWidth = React.useMemo(
		() => ({
			width: `${progress}%`
		}),
		[progress]
	)

	return (
		<div className='h-2 relative w-full'>
			<div
				className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-light_blue to-darker_blue h-1'
				style={progressBarWidth}
			/>
		</div>
	)
})

function StoryView(props) {
	const { image, creator } = props
	const [play, toggle] = useToggle(true)
	const [isComplete, toggleComplete] = useToggle(false)

	return (
		<div className='bg-component_core rounded overflow-hidden'>
			<div className='p-2 flex items-center justify-between'>
				<div className='flex items-center gap-x-2'>
					<Avatar size='small' variant='display' src={creator.image} />
					<Link
						to={`/${creator.uid}/new-profile`}
						className='text-secondary text-white'
					>
						{creator.name}
					</Link>
				</div>
				<Button variant='standard' callback={toggle}>
					{play ? (
						<PauseIcon className='text-white' />
					) : (
						<PlayArrowIcon className='text-white' />
					)}
				</Button>
			</div>
			<Timer play={play} finish={toggleComplete} />
			{isComplete ? (
				<div className='h-96 w-120 grid place-items-center'>
					<p className='prompt-h4 text-white'>Show is over...</p>
				</div>
			) : (
				<MediaContainer
					src={image}
					minHeight={500}
					className='h-standard rounded w-full'
				/>
			)}
		</div>
	)
}

export default React.memo(StoryView)
