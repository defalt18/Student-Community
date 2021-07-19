import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ProfileHeader.css'
import { db, storage } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'
import EditIcon from '@material-ui/icons/Edit'

export default function ProfileHeader({ uid }) {
	const { user } = useAuthListener()
	const [names, setName] = useState([])
	const [usrimg, setUsrimg] = useState('')
	const [val, setval] = useState(0)
	const [fol, setfol] = useState([])
	const [cover, setCov] = useState('./Images/cover.jpg')
	const [ca, setda] = useState(0)

	var userstring = uid.toString()
	useEffect(() => {
		db.collection('users')
			.doc(userstring)
			.collection('About')
			.onSnapshot((snapshot) => {
				setName(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						name: doc.data()
					}))
				)
			})

		db.collection('users')
			.doc(uid)
			.onSnapshot((snapshot) => {
				setUsrimg(snapshot.data().image)
				setCov(snapshot.data().cover)
			})

		document.getElementsByClassName(
			'profile-navbar-container'
		)[0].style.backgroundImage = `url('${cover}')`

		db.collection('users')
			.doc(uid)
			.collection('friends')
			.onSnapshot((snapshot) => {
				setfol(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						fols: doc.data()
					}))
				)
			})

		fol.map((fols) => (fols.id === user.uid ? setval(1) : 1))

		setda(ca + 1)
	}, [cover, fol.length, usrimg, uid])

	function followme() {
		let b = document.getElementById('folwbot')
		if (b) {
			db.collection('users')
				.doc(uid)
				.collection('friends')
				.doc(user.uid)
				.delete()
			db.collection('users')
				.doc(user.uid)
				.collection('friends')
				.doc(uid)
				.delete()
			setval(0)
		} else {
			console.log(b)
			db.collection('users')
				.doc(uid)
				.collection('friends')
				.doc(user.uid)
				.set({ status: 'friend' })
			db.collection('users')
				.doc(user.uid)
				.collection('friends')
				.doc(uid)
				.set({ status: 'friend' })
			setval(1)
		}
	}
	const userabt = {
		firstName: '',
		lastName: '',
		degree: '',
		course: '',
		year: ''
	}
	names.map(
		({ name }) => (
			(userabt.lastName = name.lastname),
			(userabt.firstName = name.firstname),
			(userabt.degree = name.degree),
			(userabt.course = name.course),
			(userabt.year = name.batch)
		)
	)

	const toTitleCase = (str) => {
		str = str.toLowerCase().split(' ')
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
		}
		return str.join(' ')
	}

	const handlechange = (e) => {
		let img = e.target.files[0]
		let nameit = (img.name + Date.now().toString()).toString()
		const uTk = storage.ref(`images/${nameit}`).put(img)
		uTk.on('state_changed', null, null, () => {
			storage
				.ref('images')
				.child(nameit)
				.getDownloadURL()
				.then((url) => {
					db.collection('users').doc(uid).update({
						cover: url
					})
					setCov(url)
				})
		})
	}
	const handlechangedp = (e) => {
		let img = e.target.files[0]
		let nameit = (img.name + Date.now().toString()).toString()
		const uplTask = storage.ref(`images/${nameit}`).put(img)
		uplTask.on('state_changed', null, null, () => {
			storage
				.ref('images')
				.child(nameit)
				.getDownloadURL()
				.then((url) => {
					db.collection('users').doc(user.uid).update({
						image: url
					})
					setUsrimg(null)
				})
		})
	}
	return (
		<div className='profile-navbar-container'>
			{user.uid === uid ? (
				<div>
					<input
						type='file'
						accept='image/*'
						id='coverup'
						onChange={handlechange}
						style={{ display: 'none' }}
					/>
					<label htmlFor='coverup'>
						<EditIcon
							style={{
								fontSize: '30px',
								position: 'absolute',
								top: 0,
								right: 0,
								margin: '10px',
								padding: '5px',
								background: 'white',
								color: 'black',
								borderRadius: '10px'
							}}
						/>
					</label>
				</div>
			) : (
				<b />
			)}
			<div className='profile-navbar-inner'>
				<div className='profile-navbar'>
					<div className='profile-navbar-left'>
						<div className='new' style={{ display: 'flex' }}>
							<img
								className='profile-photo-main'
								src={usrimg}
								alt='Profile'
								style={{
									height: '200px',
									width: '200px',
									objectFit: 'fill'
								}}
							/>
							{user.uid === uid ? (
								<div>
									<input
										type='file'
										accept='image/*'
										id='dpup'
										onChange={handlechangedp}
										style={{ display: 'none' }}
									/>
									<label htmlFor='dpup'>
										<EditIcon
											style={{
												fontSize: '30px',
												padding: '5px',
												position: 'relative',
												top: '80%',
												background: 'white',
												color: 'black',
												borderRadius: '10px'
											}}
										/>
									</label>
								</div>
							) : (
								<b />
							)}
						</div>
						<h3 className='profile-name'>
							{toTitleCase(userabt.firstName) +
								' ' +
								toTitleCase(userabt.lastName)}
						</h3>
						<p className='profile-small-discription'>
							{toTitleCase(userabt.degree)} {userabt.course.toUpperCase()}
							<br />
							{userabt.year}
						</p>
					</div>
					<div className='profile-navbar-right'>
						<ul className='profile-navbar-list'>
							<li className='profile-navbar-item'>
								<Link to='posts'>Posts</Link>
							</li>
							<li className='profile-navbar-item'>
								<Link to='about'>About</Link>
							</li>
							<li className='profile-navbar-item'>
								<Link to='photos'>Photos</Link>
							</li>
						</ul>
						<ul className='profile-navbar-list'>
							<li className='profile-navbar-item'>
								<p>{fol.length} People following</p>
							</li>
							{user.uid !== uid ? (
								<li className='profile-navbar-item'>
									{val ? (
										<button id='folwbot' onClick={followme}>
											Following
										</button>
									) : (
										<button onClick={followme}>Follow</button>
									)}
								</li>
							) : (
								<b />
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
