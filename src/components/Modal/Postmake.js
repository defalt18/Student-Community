import React, { useState, useEffect } from 'react'
import './Postmake.css'
import { Avatar } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import { Firebase, storage, db } from '../../lib/firebase.prod'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useAuthListener } from '../../hooks'
import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import DeleteIcon from '@material-ui/icons/Delete'

function Postmake({ handleClose, imgus }) {
	const [img, setimg] = useState(null)
	const [imgprev, setimgprev] = useState('')
	const [caption, setCaption] = useState('')
	const [divmake, setdivm] = useState(1)

	const { user } = useAuthListener()
	const useriden = user.uid.toString()

	useEffect(() => {
		document.getElementById('postbut').disabled = true
	}, [divmake.value])

	const handleCh = (e) => {
		if (e.target.files[0]) {
			setimg(e.target.files[0])
			setimgprev(URL.createObjectURL(e.target.files[0]))
		}
	}

	const handleUp = () => {
		if (img || imgprev) {
			let nameit = (img.name + Date.now().toString()).toString()
			const upTak = storage.ref(`images/${nameit}`).put(img)
			upTak.on('state_changed', null, null, () => {
				storage
					.ref('images')
					.child(nameit)
					.getDownloadURL()
					.then((url) => {
						db.collection('posts').add({
							timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageUrl: url,
							username: user.displayName,
							likes: '0',
							comments: '0',
							UID: useriden
						})
						setCaption('')
						setimg(null)
					})
			})
			handleClose()
		} else {
			if (caption !== '') {
				db.collection('posts').add({
					timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
					caption: caption,
					imageUrl: null,
					username: user.displayName,
					likes: '0',
					comments: '0',
					UID: useriden
				})
				handleClose()
			}
		}
	}

	function vwimg() {
		var p = document.getElementById('output')
		var m = document.getElementById('lablfrimg')
		m.style.display = 'none'
		if (p.src !== '') {
			p.style.display = 'flex'
		} else {
			p.style.display = 'none'
		}
	}
	function viewdiv() {
		// var m = document.getElementsByClassName('imageps');
		// var k = document.getElementById('uppicbut');
		// var sp = document.getElementById('writespacemake');
		// var def = sp.style.height;
		// if (m[0].style.display === 'block') {
		// sp.style.height = def;
		// m[0].style.display = 'none';
		setdivm((divmake + 1) % 2)
		if (divmake === 1) {
			setimg(null)
			setimgprev('')
		}
		// } else {
		// sp.style.height = 'auto';
		// m[0].style.display = 'block';
		// setdivm((divmake + 1) % 2);
		// }
	}
	return (
		<div className='postmaker'>
			<CssBaseline />
			<div className='writepos' style={{ padding: 0, overflow: 'hidden' }}>
				<div
					className='writetop'
					style={{ background: 'transparent', padding: '0 10px' }}
				>
					<Avatar src={imgus} />
					<h3 className='model-username'>{user.displayName}</h3>
					<CloseIcon
						id='close'
						fontSize='large'
						onClick={handleClose}
						className='model-userimage'
					/>
				</div>
				<div className='writedesc'>
					<form action=''>
						<textarea
							id='writespacemake'
							onChange={(e) => {
								console.log(e.target.value)
								setCaption(e.target.value)
								let textarea = document.querySelector('#writespacemake')
								textarea.addEventListener('input', autoResize, false)

								function autoResize() {
									this.style.height = 'auto'
									this.style.height = this.scrollHeight + 'px'
								}
							}}
							value={caption}
							placeholder="What's on you mind today...!?"
						/>
					</form>
				</div>
				<div className='writedown' style={{ width: '100%', padding: '10px' }}>
					<IconButton
						aria-label='upload'
						variant='contained'
						onClick={handleUp}
						id='postbut'
						// href="#contained-buttons"
						style={{
							backgroundColor: 'rgba(36, 160, 237, 0.8)',
							color: 'white'
							// borderRadius: '10px',
						}}
					>
						<SendRoundedIcon />
					</IconButton>
					{/* <Button
                        id="uppicbut"
                        onClick={viewdiv}
                        variant="contained"
                        style={{
                            backgroundColor: 'rgba(30, 230, 0, 0)',
                            color: 'white',
                            border: '1px solid white',
                            borderRadius: '10px',
                        }}
                    > */}
					{divmake ? (
						<IconButton
							aria-label='upload'
							// id="uppicbut"
							onClick={viewdiv}
							variant='contained'
							color='secondary'
							style={{
								backgroundColor: '#24292e',
								color: 'white'
								// border: '1px solid white',
								// borderRadius: '10px',
							}}
						>
							<AddPhotoAlternateIcon />
						</IconButton>
					) : (
						<IconButton
							aria-label='upload'
							// id="uppicbut"
							onClick={viewdiv}
							variant='contained'
							style={{
								backgroundColor: 'rgba(255,100,0,0.5)',
								color: 'white'
								// border: '1px solid white',
								// borderRadius: '10px',
							}}
						>
							<DeleteIcon />
						</IconButton>
					)}
					{/* </Button> */}
				</div>
			</div>

			<div
				className='imageps'
				style={{ display: `${divmake ? 'none' : 'block'}` }}
			>
				<img id='output' src={imgprev} alt='' />
				<input type='file' accept='image/*' id='file' onChange={handleCh} />
				<div className='hellocaption'>
					<Button id='lablfrimg' className='caption' onClick={vwimg}>
						<label
							htmlFor='file'
							style={{ cursor: 'pointer', margin: '2rem 0' }}
						>
							<p
								style={{
									fontSize: '180px',
									margin: '0px',
									fontWeight: '100',
									lineHeight: '160px'
								}}
							>
								+
							</p>
							<p style={{ fontWeight: '200' }}>
								Upload images to elaborate your thoughts...
							</p>
						</label>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Postmake
