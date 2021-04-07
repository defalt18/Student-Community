/* eslint-disable no-unused-vars */
import {React, useEffect,useState} from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { db } from './lib/firebase.prod';
import {
    Home,
    SingIn,
    SignUp,
    Polling,
    ProfilePosts,
    ProfilePhotos,
    ProfileAbout,
    Settings,
} from './Pages';
import * as ROUTES from './Constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { useAuthListener } from './hooks';
import Clubs from './Pages/Clubs/Clubs';
import Events from './Pages/Events/Events'
import { Header, ProfileHeader, Sidebar } from './Components';
import Clubdesc from './Pages/Clubs/Clubdesc';
import Resources from './Pages/Acad_New/Acads';
import ChatApp from './Pages/Chats (IMP)/ChatApp';
import Friends from './Pages/Friends/Friends';

export default function App() {
    
    const { user } = useAuthListener();
    const [ussimg,setimtg] = useState(null);

    useEffect(() => {
        if (user) db.collection('users').doc(user.uid).onSnapshot((s)=>(setimtg(s.data().image)))
    }, [user?.uid])

    return (
        <Router>
            <Switch>
                <IsUserRedirect
                    user={user}
                    loggedInPath={ROUTES.HOME}
                    path={ROUTES.SIGN_IN}
                >
                    <SingIn />
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
                        title="The Music Club"
                        id="music_club"
                        img="https://www.lovethispic.com/uploaded_images/332802-Playing-The-Guitar-In-The-Dark.jpg"
                        insta="https://www.instagram.com/musicclubdaiict/"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.radioclub}>
                    <Clubdesc
                        title="The Radio Club"
                        id="radio_club"
                        insta="https://www.instagram.com/radioclub_daiict/"
                        img="https://www.businessinsider.in/thumb/msid-75063195,width-1200,height-900/radio-box.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.progclub}>
                    <Clubdesc
                        title="The Programming Club"
                        id="programming_club"
                        img="https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.msclub}>
                    <Clubdesc
                        title="The Microsoft Club (MSTC)"
                        id="mstc_club"
                        insta="https://www.instagram.com/mstc.daiict/"
                        img="https://static.wixstatic.com/media/2d0812_7f2e843227de41b784268d1e5136d5bd~mv2.gif"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.dscclub}>
                    <Clubdesc
                        title="The Developer Student Club (DSC)"
                        id="dsc_club"
                        insta="https://www.instagram.com/dscdaiict/"
                        img="https://www.appfutura.com/uploads/blog/2017/11/a679f645775b7603810c3415cc0e88511511950836.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum."
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.cult}>
                    <Clubdesc
                        title="The Cultural Committee"
                        id="cultural_club"
                        insta="https://www.instagram.com/cultural_daiict/"
                        img="https://cdn3.onlinemswprograms.com/content/c44e7d88c53a4af287b05cf97ddf9710/5296_MSW-Minisite_Cultural-Sensitivity-Hero.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.cubclub}>
                    <Clubdesc
                        title="The Cubing Club"
                        id="cubing_club"
                        img="https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/2019-05/rubiks_FINAL.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.pressclub}>
                    <Clubdesc
                        title="The Press Club"
                        id="press_club"
                        insta="https://www.instagram.com/pressclub.daiict/"
                        img="https://www.creativelive.com/blog/wp-content/uploads/2018/08/webimage-BF11CAB5-8391-473E-B901DFE294B54B64-620x414.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.danceclub}>
                    <Clubdesc
                        title="The Dance Club (DADC)"
                        id="dance_club"
                        insta="https://www.instagram.com/__dadc__/"
                        img="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.busclub}>
                    <Clubdesc
                        title="The Business Club"
                        id="business_club"
                        insta="https://www.instagram.com/business.daiict/"
                        img="https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/01/Picture1-1.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.musicclub}>
                    <Clubdesc
                        title="The Music Club"
                        id="music_club"
                        img="https://www.lovethispic.com/uploaded_images/332802-Playing-The-Guitar-In-The-Dark.jpg"
                        insta="https://www.instagram.com/musicclubdaiict/"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                    "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.filmclub}>
                    <Clubdesc
                        title="The Film Club"
                        id="film_club"
                        insta=""
                        img="https://thewell.unc.edu/files/2020/04/film1.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.chessclub}>
                    <Clubdesc
                        title="The Chess Club"
                        id="chess_club"
                        insta="https://www.instagram.com/chess_club_daiict/"
                        img="https://sites.google.com/site/iiscchess/_/rsrc/1494396442724/config/customLogo.gif?revision=7"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.picclub}>
                    <Clubdesc
                        title="The Photography Club"
                        id="photography_club"
                        insta="https://www.instagram.com/pmmc__daiict/"
                        img="https://cdn.mos.cms.futurecdn.net/gvQ9NhQP8wbbM32jXy4V3j.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.spcomm}>
                    <Clubdesc
                        title="The Sports Committee"
                        id="sports_committee"
                        insta="https://www.instagram.com/sportsatdaiict/"
                        img="https://mongooseagency.com/files/3415/9620/1413/Return_of_Sports.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.HMcomm}>
                    <Clubdesc
                        title="The Hostel Management Committee"
                        id="hmc_committee"
                        img="https://upload.wikimedia.org/wikipedia/commons/e/e8/Hostel_Dormitory.jpg"
                        descon="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                        "
                    />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.clubs}>
                    <Header uimg={ussimg}/>
                    <Sidebar />
                    <Clubs />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.resources}>
                    <Header uimg={ussimg}/>
                    <Sidebar />
                    <Resources />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.events}>
                    <Header uimg={ussimg}/>
                    <Sidebar />
                    <Events />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.chats}>
                    <Header uimg={ussimg}/>
                    <Sidebar />
                    <ChatApp />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.friends}>
                    <Header uimg={ussimg}/>
                    <Sidebar />
                    <Friends />
                </ProtectedRoute>
                <ProtectedRoute
                    user={user}
                    path="/profile/:id/posts"
                    component={ProfilePosts}
                ></ProtectedRoute>
                <ProtectedRoute
                    user={user}
                    path="/profile/:id/about"
                    component={ProfileAbout}
                ></ProtectedRoute>
                <ProtectedRoute
                    user={user}
                    path="/profile/:id/photos"
                    component={ProfilePhotos}>
                </ProtectedRoute>
                <ProtectedRoute
                    user={user}
                    exact
                    path={ROUTES.POLLING}
                    component={Polling}
                ></ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.settings}>
                    <Header uimg={ussimg}/>
                    <Sidebar />
                    <Settings />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path={ROUTES.HOME}>
                    <Home imgs={ussimg}/>
                </ProtectedRoute>
            </Switch>
        </Router>
    );
}
