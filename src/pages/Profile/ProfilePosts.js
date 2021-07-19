import { React, useState, useEffect } from 'react'
import { Header, Sidebar, ProfileHeader, Post } from '../../components'
import './Profile-Common.css'
import './ProfilePosts.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import { db } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'

export default function Home(props) {
	const [posts, setPosts] = useState([])
	const [ims, setims] = useState(null)
	const { user } = useAuthListener()
	const [np, snp] = useState(false)

	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						post: doc.data()
					}))
				)
			})

		db.collection('users')
			.doc(user.uid)
			.onSnapshot((s) => setims(s.data().image))

		posts.map(({ id, post }) => {
			post.UID === props.match.params.id ? snp(true) : console.log(post.UID)
		})
	}, [posts.length, props.match.params.id])

	return (
		<div className='profile'>
			<CssBaseline />
			<Header uimg={ims} />
			<Sidebar />
			<div className='profile-appmain'>
				<ProfileHeader uid={props.match.params.id} />
				<div className='profilepage'>
					<div className='profilepage-left'>
						<h3 className='appitem'> Posts </h3>
						<div className='appitem'>
							<p style={{ fontSize: '20px', margin: '0' }}>Badges</p>
							{BADGES.map((_, id) => (
								<div key={id}>
									<hr
										style={{
											backgroundColor: 'white',
											height: '1px',
											border: 'none',
											margin: '15px 0'
										}}
									/>
									<p
										style={{
											fontSize: '16px',
											margin: '0',
											fontWeight: '100'
										}}
									>
										{BADGES[id]}
									</p>
								</div>
							))}
						</div>
						{/* Socials */}
						<div className='appitem'>
							<p
								style={{
									fontSize: '20px',
									margin: '0'
									// paddingBottom: '10px',
								}}
							>
								Social Account
							</p>
							<hr
								style={{
									backgroundColor: 'white',
									height: '1px',
									border: 'none',
									margin: '15px 0'
								}}
							/>
							<div
								className='iconset'
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(3,1fr)'
									// flexWrap: 'wrap',

									// flexDirection: 'row',
								}}
							>
								{SOCIAL_ACC.map((accnt, id) => (
									<div
										key={id}
										style={{
											margin: '10px',
											// padding:'10px',
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										<img
											src={accnt}
											alt={accnt}
											style={{
												heigth: '40px',
												width: '40px'
											}}
										></img>
									</div>
								))}
							</div>
						</div>
						{/* </div> */}
					</div>
					<div className='profilepage-right'>
						{np ? (
							posts.map(({ id, post }) =>
								post.UID === props.match.params.id ? (
									<div
										className='appitem'
										style={{
											padding: '0',
											background: 'transparent'
										}}
									>
										<Post
											key={id}
											pid={id}
											lclss={post.UID}
											usernm={post.username}
											text={post.caption}
											img={post.imageUrl}
											likes={post.likes}
											comments={post.comments}
										/>
									</div>
								) : (
									<></>
								)
							)
						) : (
							<h1>No Posts to Show!</h1>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
const BADGES = ['Member of EHC club 2019']
const SOCIAL_ACC = [
	'https://i0.wp.com/www.clixmarketing.com/blog/wp-content/uploads/2013/06/linkedin-icon.png',
	'https://cdn3.iconfinder.com/data/icons/inficons/512/github.png',
	'https://www.flaticon.com/premium-icon/icons/svg/2504/2504925.svg',
	'https://firebasestorage.googleapis.com/v0/b/da-student-connect.appspot.com/o/images%2Fgoogle.png?alt=media&token=a1e06507-1078-43dd-9ce1-e786b0149c28',
	'https://firebasestorage.googleapis.com/v0/b/da-student-connect.appspot.com/o/images%2Finstagram.png?alt=media&token=4e0655ff-e6b8-493d-9d67-11303cc537b8',
	'https://firebasestorage.googleapis.com/v0/b/da-student-connect.appspot.com/o/images%2Ffacebook.png?alt=media&token=07705033-624f-4608-89cb-51a1fbe0508d',
	'https://www.flaticon.com/premium-icon/icons/svg/3536/3536445.svg'
]
