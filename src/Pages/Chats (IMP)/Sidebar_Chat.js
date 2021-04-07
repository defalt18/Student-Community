/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Sidebar_Chat.css';
import Avatar from '@material-ui/core/Avatar';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Sidebar_Chat__friends from './Sidebar_Chat__friends';
import { Firebase, db } from '../../lib/firebase.prod';
import { useAuthListener } from '../../hooks';

function Sidebar_Chat() {
    const [friends, setFriends] = useState([]);
    const [info, setInfo] = useState([]);
    const { user } = useAuthListener();
    var userstring = user.uid.toString();

    useEffect(() => {
        db.collection('users')
            .doc(userstring)
            .collection('friends')
            .onSnapshot((snapshot) => {
                setFriends(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        friend: doc.data(),
                    }))
                );
            });
    }, []);

    useEffect(() => {
        db.collection('users')
            .doc(userstring)
            .onSnapshot((snapshot) => {
                setInfo(snapshot.data());
            });
    }, []);

    return (
        <div className="sidebar_Chat">
            <div className="sidebar_chat__header" style={{
                background:'linear-gradient(45deg,#073589,green)'
                }}>
                {/* <div style={{display:'flex',backdropFilter:'saturate(180%) blur(10px)',width:'100%',alignItems:'center',gap:'20px'}}> */}
                <Avatar
                    src={info.image}
                    style={{ height: '70px', width: '70px' }}
                    />
                <h1 style={{ fontSize: '30px' }}>{info.Name}</h1>
                {/* </div> */}
            </div>

            <div className="sidebar_Chat__search">
                <div className="sidebar_Chat__searchContainer">
                    <SearchIcon />
                    <input
                        placeholder="Seacrh or start a new conversation"
                        type="text"
                    />
                </div>
            </div>

            {/* <div className="sidebar_Chat__addFriend">
                <Button variant="contained" color="secondary">
                    Add a Friend
                </Button>
            </div> */}

            <div className="sidebar_chat__chats">
                {/* <Sidebar_Chat__friends /> */}
                {friends?.map(({ id, friend }) => (
                    <Sidebar_Chat__friends id={id} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar_Chat;
