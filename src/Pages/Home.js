import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { db, auth } from '../lib/firebase.prod';
import Suggs from '../Suggs'
import {
    Header,
    Sidebar,
    CarouselMain,
    CarouselAdd,
    Post,
} from '../Components';
import './Home.css';
import Cal from './Calendar.svg'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useHistory } from 'react-router-dom'
import Usersuggest from './Usersuggest';
import Story from './Story'
import Welcome from '../Components/Modal/WelcomeModal.js'
import Storycreate from './Storycreate'
import { useAuthListener } from '../hooks';
import firebase from 'firebase';

export default function Home({ imgs }) {
    const { user } = useAuthListener();
    const [wel, setwel] = useState(0);
    const [state, setState] = useState([]);
    const [posts, setPosts] = useState([]);
    const [tales, settales] = useState([]);
    const [dum, setd] = useState(0);
    const [shows, setshow] = useState(1);

    const convert = (date) => {
        if (date!==  undefined){
            let year = Number(date.substring(0, 4)), month = Number(date.substring(5, 7)), day = Number(date.substring(8));
            return new Date(year, month - 1, day);
        }
    }

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });

        var yesterday = firebase.firestore.Timestamp.now();
        yesterday.seconds = yesterday.seconds - (24 * 60 * 60);

        db.collection('events').orderBy('date', 'desc').onSnapshot(snap => {
            if(convert(snap.docs[0].data().date) > new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()))
            setState(snap.docs[0].data())
        })

        db.collection('users').doc(user.uid).onSnapshot((snapshot) => { setwel(snapshot.data().firstLogin); });

        db.collection("stories").where("timestamp",">",yesterday)
                .get().then(function(snapshot) {
                    settales(
                        snapshot.docs.map((doc) => ({
                            ids: doc.id,
                            tale: doc.data(),
                        }))
                    );
                })
            .catch(function(error) {
                  console.log("Error getting documents: ", error);
            });
          
        db.collection("stories").where("timestamp","<",yesterday)
              .get().then(function(querySnapshote) {
                querySnapshote.forEach(element => {
                  element.ref.delete();
                });
              })

        setd(dum + 1);

        for (let k = 0; k < tales.length; k++) {
            if (user.uid === tales[k].ids) setshow(0)
        }

    }, [tales.length]);


    return (
        <div className="app">
            <Header uimg={imgs} />
            <CssBaseline />
            <Sidebar />
            {
                wel ? (
                    <Welcome uid={user.uid} />
                ) : (
                    <></>
                )
            }
            <div className="appmain">
                <div className="appleft">
                    <div style={{ margin: '20px', overflowX: 'scroll' }}>
                        <div style={{ padding: 0, background: 'transparent', display: 'flex', gap: '15px', width: '100%', flexWrap: 'no-wrap' }}>
                            {
                                shows === 1 ?
                                    (<Storycreate img={imgs} />)
                                    :
                                    (<></>)
                            }
                            {
                                tales.map(({ ids, tale }) => (
                                    <Story
                                        key={ids}
                                        img={tale.avimg}
                                        bg={tale.imgurl}
                                        name={tale.name}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div
                        className="carouselItem"
                        style={{ borderRadius: '25px' }}
                    >
                        <CarouselMain style={{ borderRadius: '25px' }} />
                    </div>
                    <div className="appitem welcome" style={{ boxShadow: '0 0 5px 0 rgba(0,0,0,0.75)' }}>
                        <h1>
                            {
                                wel ? (<span> Welcome {user?.displayName}</span>) : (<span> Welcome back {user?.displayName}</span>)
                            }
                        </h1>
                    </div>
                    {posts.map(({ id, post }) => (
                        <div
                            className="appitem"
                            style={{ padding: '0', background: 'transparent' }}
                            key={id}
                        >
                            <Post
                                lclss={post.UID}
                                pid={id}
                                key={id}
                                usernm={post.username}
                                text={post.caption}
                                img={post.imageUrl}
                                likes={post.likes}
                                comments={post.comments}
                            />
                        </div>
                    ))}
                </div>
                <div className="appright">
                    <div className="wrapper-main">
                        <div
                            className="carouselItem"
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
                        <div style={{
                            display: 'flex', gap: '10px', alignItems: 'center',
                            margin: '0 20px',
                        }}>
                            <img src={Cal} alt="" height="35px" />
                            <h2 style={{ margin: 0 }}>Upcoming Event</h2>
                        </div>
                        <div className="appitem" style={{ padding: 0, overflow: 'hidden', position: 'relative', background: 'transparent', borderRadius: '10px' }}>
                            <div style={{ height: '100%', width: '2%', background: 'rgb(0,150,255)', position: 'absolute', left: 10, top: '0', borderRadius: '25px' }}></div>
                            <div style={{ padding: "0 1%", paddingLeft: "7%", paddingRight: '3%', width: '100%' }}>
                                {/* <h2 style={{ margin:"10 0",width:'100%', textAlign:'center' }}>Upcoming Event</h2> */}
                                <div style={{ background: 'rgba(0,150,255,0.1)', borderRadius: '10px', padding: '10px', margin: '0', width: '100%', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    {
                                        console.log(state),
                                        state? <> 
                                            <img
                                                src={state?.poster}
                                                style={{ height: '100%', width: '25%', borderRadius: '10px' }} />
                                            <div>
                                                <h3 style={{ margin: 0 }}>{state?.name}</h3>
                                                <h4 style={{ margin: 0 }}>Venue : {state?.venue}</h4>
                                                <h4 style={{ margin: 0 }}>Time : {state?.time} hrs</h4>
                                            </div>
                                        </> : <h2>No Upcoming Events :(</h2>}
                                </div>
                            </div>
                        </div>
                        <Suggs />
                    </div>
                </div>
            </div>
        </div>
    );
}
