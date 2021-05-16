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
import { useHistory } from 'react-router-dom'
import Usersuggest from './Usersuggest';
import Story from './Story'
import Welcome from '../Components/Modal/WelcomeModal.js'
import Storycreate from './Storycreate'
import { useAuthListener } from '../hooks';

export default function Home({ imgs }) {
    const { user } = useAuthListener();
    const [wel, setwel] = useState(0);
    const [posts, setPosts] = useState([]);
    const [tales, settales] = useState([]);
    const [dum, setd] = useState(0);
    const [shows, setshow] = useState(1);


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

        db.collection('users').doc(user.uid).onSnapshot((snapshot) => { setwel(snapshot.data().firstLogin); });

        db.collection('stories')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                settales(
                    snapshot.docs.map((doc) => ({
                        ids: doc.id,
                        tale: doc.data(),
                    }))
                );
            });

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
                        <div className='appitem' style={{ background: 'url("https://images.unsplash.com/photo-1535525153412-5a42439a210d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80")', padding: '0px', backgroundSize: 'cover' }}>
                            <div className='reminderevent' style={{ textAlign: 'center', background: 'rgba(0,0,0,0.2)', backdropFilter: 'saturate(180%) blur(20px)', borderRadius: '20px', padding: '10px' }}>
                                <h1>Upcoming Event</h1>
                                <h2>Step up by DADC</h2>
                                <h2>Venue : OAT</h2>
                                <h2>Time : 15:00 onwards</h2>
                            </div>
                        </div>
                        {/* <div
                            className="appitem suggest_tabs"
                            style={{
                                padding: '0',
                                overflow: 'auto',
                                height: '40vh',
                            }}
                        >
                            <h3
                                style={{
                                    margin: '0',
                                    background: 'rgba(17,17,18)',
                                    padding: '1rem 1rem',
                                    color: 'white',
                                    position: 'sticky',
                                    top: '0',
                                    zIndex: '100',
                                }}
                            >
                                Suggestions
                            </h3>
                            <Usersuggest
                                keys="neds"
                                name="Ned Stark"
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
                                stream="ICT-CS"
                            />
                            <Usersuggest
                                keys="neds2"
                                name="Ned Stark"
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
                                stream="ICT"
                            />
                            <Usersuggest
                                keys="neds3"
                                name="Ned Stark"
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
                                stream="MNC"
                            />
                            <Usersuggest
                                keys="neds4"
                                name="Ned Stark"
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
                                stream="ICT"
                            />
                            <Usersuggest
                                keys="neds5"
                                name="Ned Stark"
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
                                stream="ICT"
                            />
                            <Usersuggest
                                keys="neds6"
                                name="Ned Stark"
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
                                stream="MscIT"
                            />
                            <Usersuggest
                                keys="neds7"
                                name="Ned Stark"
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
                                stream="ICT"
                            />
                        </div> */}
                        <Suggs />
                    </div>
                </div>
            </div>
        </div>
    );
}
