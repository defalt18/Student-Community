import React from 'react'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'

const closeIconStyles = {
	color: '#7DACF9'
}

function Card(props) {
	const { image, name, type = 'normal', uid = 'xyz' } = props
	return (
		<div className='w-full bg-component_secondary_dark flex justify-between items-center p-3 rounded'>
			<Link
				to={`/${uid}/new-profile`}
				className='flex flex-row gap-x-3 items-center text-decoration-none'
			>
				<Avatar src={image} variant='display' />
				<p className='text-secondary text-white'>{name}</p>
			</Link>
			<div className='flex items-center gap-x-3'>
				<Button
					text='Send friend request'
					variant='outline'
					className='text-tertiary-bold'
				/>
				{type === 'recent' && (
					<Button className='rounded-3xl text-outline_blue'>
						<CloseIcon style={closeIconStyles} />
					</Button>
				)}
			</div>
		</div>
	)
}

export default React.memo(Card)
