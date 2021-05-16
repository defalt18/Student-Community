import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { db } from '../lib/firebase.prod';
import PollCard from './PollCard'
import {
    Header,
    Sidebar,
    
    CarouselAdd,

} from '../Components';
import './Polling.css';
import CreatePoll from '../Components/Modal/CreatePoll';
import { useAuthListener } from '../hooks';

export default function Polling() {
    const [polls, setpol] = useState([]);
    const {user} = useAuthListener();

    const [uiimg,sety]=useState(null);
    useEffect(() => {
        db.collection('polls').onSnapshot((snapshot) => {
            setpol(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    poll: doc.data(),
                }))
            );
        });

        db.collection('users').doc(user.uid).onSnapshot((s)=>(sety(s.data().image)))
    }, [polls.length]);

    return (
        <div className="app" style={{paddingBottom:'20px'}}>
            <Header uimg = {uiimg}/>
            <Sidebar />
            <div className="appmain">
                <div className="appleft" style={{display:'flex', gap:'20px', flexDirection:'column'}}>
                    <h1>Running Polls</h1>
                    {
                    polls?.map(({ id, poll }) => (
                        poll.verified===1 && <PollCard id={id} uid={user.uid}/>
                    ))}
                </div>
                <div className="appright">
                    <div className="wrapper-main">
                        <div
                            className="appitem"
                            style={{
                                padding: 0,
                                backgroundColor: 'transparent',
                            }}
                        >
                            <div
                                className="carouselItem"
                                style={{ borderRadius: '25px', margin: 0 }}
                            >
                                <CarouselAdd style={{ borderRadius: '25px' }} />
                            </div>
                        </div>
                        <div
                            className="appitem"
                            style={{ padding: 0, overflow: 'hidden' }}
                        >
                            <CreatePoll style={{cursor:'pointer'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
