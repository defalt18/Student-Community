import React from 'react'
import Avatar from '../../../../../../components/Avatar'
import Button from '../../../../../../components/Button'

function Card(props) {
	const { image, name } = props
	return (
		<div className='w-full bg-component_secondary flex justify-between items-center p-2 rounded'>
			<div className='flex flex-row gap-x-3 items-center'>
				<Avatar src={image} variant='display' />
				<p className='text-secondary text-white'>{name}</p>
			</div>
			<Button text='Send friend request' variant='outline' />
		</div>
	)
}

export default React.memo(Card)
