import React from 'react'
import MediaContainer from '../Media'
import da_logo from 'assets/images/DA-logo.png'
import { Notifications, MessageRounded } from '@material-ui/icons'
import Avatar from 'components/Avatar'
import creator_dummy from 'assets/images/creator_dummy.png'
import Button from 'components/Button'
import SearchPlayer from './components/SearchPlayer'
import { Link } from 'react-router-dom'

function NewHeader(props) {
	return (
		<div className='z-10 fixed top-0 border-b border-header_border_blue bg-component_core w-screen flex items-center h-16 pr-3'>
			<Link to='/' className='w-40 flex text-decoration-none'>
				<MediaContainer src={da_logo} className='h-10 w-3 object-contain' />
				<p className='text-secondary text-white'>Student Community</p>
			</Link>
			<div className='ml-auto flex gap-x-4 text-white items-center'>
				<SearchPlayer />
				<Button className='rounded-3xl p-2'>
					<Notifications color={'inherit'} />
				</Button>
				<Button className='rounded-3xl p-2'>
					<MessageRounded color={'inherit'} />
				</Button>
				<Button className='rounded-3xl p-2'>
					<Avatar src={creator_dummy} size='small' variant='normal' />
				</Button>
				<Button
					text='Create post'
					variant='filled'
					size='medium'
					className='px-12 py-2'
				/>
			</div>
		</div>
	)
}

export default NewHeader
