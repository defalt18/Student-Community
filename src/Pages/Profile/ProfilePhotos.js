import React,{useState,useEffect} from 'react';
import {
    Header,
    Sidebar,
    ProfileHeader,
    CarouselAdd,
    ProfilePhotos,
} from '../../Components';
import './Profile-Common.css';
import './ProfilePhotos.css';
import {db} from '../../lib/firebase.prod' 
import CssBaseline from '@material-ui/core/CssBaseline';
import { useAuthListener } from '../../hooks';


export default function Home(props) {

    const {user} = useAuthListener();
    const [ims,setims]= useState(null)
    useEffect(()=>{
        db.collection('users').doc(user.uid).onSnapshot((s)=>(setims(s.data().image)))
    },[])
    return (
        <div className="profile">
            <CssBaseline />
            <Header uimg={ims}/>
            <Sidebar />
            <div className="profile-appmain">
                <ProfileHeader uid={props.match.params.id}/>
                <div className="profilepage">
                    <div className="profilepage-left">
                        <div className="appitem">
                            <CarouselAdd style={{ borderRadius: '25px' }} />
                        </div>
                        
                    </div>
                    <div className="profilepage-right">
                        <div className="appitem">
                            <ProfilePhotos />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
