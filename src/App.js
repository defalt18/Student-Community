/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
	Home,
	SignIn,
	SignUp,
	Polling,
	Settings,
	Resources,
	ChatApp,
	Clubs,
	Parts,
	Clubdesc,
	Events,
	Friends,
	Prof
} from './pages'
import * as ROUTES from './constants/routes'
import { IsUserRedirect, ProtectedRoute } from './helpers/routes'
import { useAuthListener } from './hooks'
import { getMinimalUserById } from "./services/user-utils";
import { Navbar, Sidebar } from './components'
import { db } from './lib/firebase.prod'

import "./components/Custom/Custom.import"
import avatar_icon from "./components/Profile/Images/avatar.png"

export default function App() {
	const { user } = useAuthListener();
	const [userDetails, setUserDetails] = useState({
		name: "user",
		image: avatar_icon,
	});
	// here dummy details are used to avoid render condition and null object error
	// in future, this will be replaced with dummy elements

	async function fetchUserDetails() {
		const details = await getMinimalUserById(user.uid);
		setUserDetails(details);
	}

	useEffect(() => {
		if (user) {
			fetchUserDetails();
		}
	}, [user])

	return (
		<Router>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={"light"}
			/>
			<Switch>
				<IsUserRedirect
					user={user}
					loggedInPath={ROUTES.HOME}
					path={ROUTES.SIGN_IN}
				>
					<SignIn />
				</IsUserRedirect>
				<IsUserRedirect
					user={user}
					loggedInPath={ROUTES.HOME}
					path={ROUTES.SIGN_UP}
				>
					<SignUp />
				</IsUserRedirect>
				<ProtectedRoute user={user} exact path={ROUTES.musicclub}>
					<Clubdesc
						title='The Music Club'
						id='music_club'
						img='https://www.lovethispic.com/uploaded_images/332802-Playing-The-Guitar-In-The-Dark.jpg'
						insta='https://www.instagram.com/musicclubdaiict/'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.radioclub}>
					<Clubdesc
						title='The Radio Club'
						id='radio_club'
						insta='https://www.instagram.com/radioclub_daiict/'
						img='https://www.businessinsider.in/thumb/msid-75063195,width-1200,height-900/radio-box.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.progclub}>
					<Clubdesc
						title='The Programming Club'
						id='programming_club'
						img='https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.msclub}>
					<Clubdesc
						title='The Microsoft Club (MSTC)'
						id='mstc_club'
						insta='https://www.instagram.com/mstc.daiict/'
						img='https://static.wixstatic.com/media/2d0812_7f2e843227de41b784268d1e5136d5bd~mv2.gif'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.dscclub}>
					<Clubdesc
						title='The Developer Student Club (DSC)'
						id='dsc_club'
						insta='https://www.instagram.com/dscdaiict/'
						img='https://www.appfutura.com/uploads/blog/2017/11/a679f645775b7603810c3415cc0e88511511950836.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.'
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.cult}>
					<Clubdesc
						title='The Cultural Committee'
						id='cultural_club'
						insta='https://www.instagram.com/cultural_daiict/'
						img='https://cdn3.onlinemswprograms.com/content/c44e7d88c53a4af287b05cf97ddf9710/5296_MSW-Minisite_Cultural-Sensitivity-Hero.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.cubclub}>
					<Clubdesc
						title='The Cubing Club'
						id='cubing_club'
						img='https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/2019-05/rubiks_FINAL.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.pressclub}>
					<Clubdesc
						title='The Press Club'
						id='press_club'
						insta='https://www.instagram.com/pressclub.daiict/'
						img='https://www.creativelive.com/blog/wp-content/uploads/2018/08/webimage-BF11CAB5-8391-473E-B901DFE294B54B64-620x414.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.danceclub}>
					<Clubdesc
						title='The Dance Club (DADC)'
						id='dance_club'
						insta='https://www.instagram.com/__dadc__/'
						img='https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.busclub}>
					<Clubdesc
						title='The Business Club'
						id='business_club'
						insta='https://www.instagram.com/business.daiict/'
						img='https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/01/Picture1-1.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.musicclub}>
					<Clubdesc
						title='The Music Club'
						id='music_club'
						img='https://www.lovethispic.com/uploaded_images/332802-Playing-The-Guitar-In-The-Dark.jpg'
						insta='https://www.instagram.com/musicclubdaiict/'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.filmclub}>
					<Clubdesc
						title='The Film Club'
						id='film_club'
						insta=''
						img='https://thewell.unc.edu/files/2020/04/film1.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.chessclub}>
					<Clubdesc
						title='The Chess Club'
						id='chess_club'
						insta='https://www.instagram.com/chess_club_daiict/'
						img='https://sites.google.com/site/iiscchess/_/rsrc/1494396442724/config/customLogo.gif?revision=7'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.picclub}>
					<Clubdesc
						title='The Photography Club'
						id='photography_club'
						insta='https://www.instagram.com/pmmc__daiict/'
						img='https://cdn.mos.cms.futurecdn.net/gvQ9NhQP8wbbM32jXy4V3j.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.spcomm}>
					<Clubdesc
						title='The Sports Committee'
						id='sports_committee'
						insta='https://www.instagram.com/sportsatdaiict/'
						img='https://mongooseagency.com/files/3415/9620/1413/Return_of_Sports.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.HMcomm}>
					<Clubdesc
						title='The Hostel Management Committee'
						id='hmc_committee'
						img='https://upload.wikimedia.org/wikipedia/commons/e/e8/Hostel_Dormitory.jpg'
						descon='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        '
					/>
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.clubs}>
					<Navbar userDetails={userDetails} />
					<Sidebar />
					<Clubs />
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.resources}>
					<Navbar userDetails={userDetails} />
					<Sidebar />
					<Resources />
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.events}>
					<Navbar userDetails={userDetails} />
					<Sidebar />
					<Events />
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.chats}>
					<Navbar userDetails={userDetails} />
					<Sidebar />
					<ChatApp />
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.friends}>
					<Navbar userDetails={userDetails} />
					<Sidebar />
					<Friends />
				</ProtectedRoute>
				<ProtectedRoute
					user={user}
					path='/profile/:id'
					component={Prof}
				></ProtectedRoute>
				{user?.displayName === 'Club' && (
					<ProtectedRoute user={user} exact path={ROUTES.participants}>
						<Navbar userDetails={userDetails} />
						<Sidebar />
						<Parts />
					</ProtectedRoute>
				)}
				<ProtectedRoute
					user={user}
					exact
					path={ROUTES.POLLING}
					component={Polling}
				></ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.settings}>
					<Navbar userDetails={userDetails} />
					<Sidebar />
					<Settings />
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.HOME}>
					<Navbar userDetails={userDetails} />
					<Home user={userDetails.image} user={user} />
				</ProtectedRoute>
			</Switch>
		</Router>
	)
}
