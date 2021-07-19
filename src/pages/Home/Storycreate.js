import { Avatar } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import { db, storage } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'

function Storycreate({ img }) {
	const { user } = useAuthListener()
	let userstr = user.uid.toString()
	const handlestoryupload = (e) => {
		if (e.target.files[0] !== null) {
			let imgt = e.target.files[0]
			let nameit = (imgt.name + Date.now().toString()).toString()
			const uplTask = storage.ref(`images/${nameit}`).put(imgt)
			uplTask.on('state_changed', null, null, () => {
				storage
					.ref('images')
					.child(nameit)
					.getDownloadURL()
					.then((url) => {
						db.collection('stories').doc(userstr).set({
							imgurl: url,
							name: user.displayName,
							avimg: img,
							timestamp: Date.now()
						})
					})
			})
		}
	}

	return (
		<div style={{ position: 'relative' }}>
			<input
				id='storyupload'
				type='file'
				accept='image/*'
				onChange={handlestoryupload}
				style={{ display: 'none' }}
			/>
			<label
				for='storyupload'
				style={{
					display: 'flex',
					cursor: 'pointer',
					alignItems: 'center',
					flexDirection: 'column'
				}}
			>
				<Avatar src={img} style={{ height: 50, width: 50 }} />
				<p style={{ margin: 0, marginTop: 2 }}>{user?.displayName}</p>
				<div
					style={{
						clipPath: 'circle(50%)',
						height: 20,
						width: 20,
						background: 'rgb(0,155,250)',
						position: 'absolute',
						top: 17,
						color: 'white',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 5
					}}
				>
					<AddIcon fontSize='small' />
				</div>
				<div
					style={{
						clipPath: 'circle(50%)',
						height: 50,
						width: 50,
						background: 'rgb(0,155,250,0.3)',
						position: 'absolute',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				></div>
			</label>
		</div>
	)
}

export default Storycreate
