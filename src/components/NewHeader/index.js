import React, { useCallback } from 'react'
import MediaContainer from '../Media'
import da_logo from 'assets/images/DA-logo.png'
import { Notifications } from '@material-ui/icons'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import SearchPlayer from './components/SearchPlayer'
import { Link, useHistory } from 'react-router-dom'
import { useAuthListener } from 'hooks'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { HOME } from 'constants/routes'
import { useToggle } from 'react-use'
import Dialog from 'components/Dialog'
import CreatePostDialog from './components/CreatePostDialog'

function NewHeader() {
	const { user } = useAuthListener()
	const history = useHistory()
	const [postAction, toggle] = useToggle(false)
	const { data: userdata } = useFirestoreDocData(
		useFirestore().collection('users').doc(user?.uid)
	)

	const redirectToProfile = useCallback(
		() => history.push(`/${user?.uid}/new-profile`),
		[user.uid, history]
	)

	return (
		<div className='z-20 fixed top-0 border-b border-header_border_blue bg-component_core w-screen flex items-center h-16 px-3'>
			<Link to={HOME} className='w-40 flex text-decoration-none gap-x-2'>
				<MediaContainer src={da_logo} className='h-10 w-auto object-contain' />
				<p className='text-secondary text-white'>Student Community</p>
			</Link>
			<div className='ml-auto flex gap-x-4 text-white items-center'>
				{user ? (
					<>
						<SearchPlayer />
						<Button className='rounded-3xl p-2'>
							<Notifications color='inherit' />
						</Button>
						<Button callback={redirectToProfile} className='rounded-3xl p-2'>
							<Avatar src={userdata?.image} size='small' variant='normal' />
						</Button>
						<Button
							text='Create post'
							variant='filled'
							size='medium'
							className='w-48 h-10 flex items-center justify-center'
							callback={toggle}
						/>
					</>
				) : (
					<Button
						text='Login'
						variant='filled'
						size='small'
						className='px-12 py-2'
					/>
				)}
			</div>
			{postAction && (
				<Dialog open={postAction} toggle={toggle}>
					<CreatePostDialog toggle={toggle} userdata={userdata} />
				</Dialog>
			)}
		</div>
	)
}

export default NewHeader
