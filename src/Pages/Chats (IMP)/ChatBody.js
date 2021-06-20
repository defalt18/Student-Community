/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import {
    createMuiTheme,
    withStyles,
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { green } from '@material-ui/core/colors';
import './ChatBody.css';
import { useParams } from 'react-router-dom';
import { Firebase, db, storage } from '../../lib/firebase.prod';
import { useAuthListener } from '../../hooks';
import firebase from 'firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScrollToBottom from 'react-scroll-to-bottom';

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

function Chat() {
    const [input, setInput] = useState('');
    const [pic, setPic] = useState(null);
    const { friendId } = useParams();
    const [info, setInfo] = useState([]);
    const [friendInfo, setFriendInfo] = useState([]);
    const [messages, setMessages] = useState([]);
    const { user } = useAuthListener();
    var userstring = user.uid.toString();

    useEffect(() => {
        if (friendId) {
            db.collection('users')
                .doc(friendId)
                .onSnapshot((snapshot) => setFriendInfo(snapshot.data()));

            db.collection('users')
                .doc(userstring)
                .collection('friends')
                .doc(friendId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [friendId, messages.length]);

    useEffect(() => {
        db.collection('users')
            .doc(userstring)
            .onSnapshot((snapshot) => {
                setInfo(snapshot.data());
            });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('users')
            .doc(userstring)
            .collection('friends')
            .doc(friendId)
            .collection('messages')
            .add({
                message: input,
                msgSenderId: userstring,
                imgUrl: '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

        db.collection('users')
            .doc(userstring)
            .collection('friends')
            .doc(friendId)
            .set({lastTime: firebase.firestore.FieldValue.serverTimestamp()})

        db.collection('users')
            .doc(friendId)
            .collection('friends')
            .doc(userstring)
            .collection('messages')
            .add({
                message: input,
                msgSenderId: userstring,
                imgUrl: '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

        db.collection('users')
            .doc(friendId)
            .collection('friends')
            .doc(userstring)
            .set({lastTime: firebase.firestore.FieldValue.serverTimestamp()})

        setInput('');
    };

    function handleUpload(e) {
        let img = e.target.files[0];
        console.log(img);
        // setPic(e.target.files[0]);
        // if (img || imgprev) {
        const uploadTask = storage.ref(`images/${img.name}`).put(img);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.Bytestransferred / snapshot.totalBytes) * 100
                );
                // setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref('images')
                    .child(img.name)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection('users')
                            .doc(friendId)
                            .collection('friends')
                            .doc(userstring)
                            .collection('messages')
                            .add({
                                timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
                                message: input,
                                imgUrl: url,
                                msgSenderId: userstring,
                            });

                        db.collection('users')
                            .doc(userstring)
                            .collection('friends')
                            .doc(friendId)
                            .collection('messages')
                            .add({
                                timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
                                message: input,
                                imgUrl: url,
                                msgSenderId: userstring,
                            });
                        setInput('');
                        // setPic(null);
                    });
            }
        );
    }

    function handleDelete() {
        const ref = db.collection('users').doc(userstring).collection('friends').doc(friendId).collection('messages');
        ref.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                ref.doc(doc.id).delete();
            });
        });
    }

    return (
        <ScrollToBottom className="scrollB">
        <div className="chat">
            <CssBaseline />
            <div className="chat__header">
                <Avatar src={friendInfo.image} />
                <div className="chat__headerInfo">
                    <h3>{friendInfo.Name}</h3>
                    <p>
                        Last seen at{' '}
                        {new Date(friendInfo.lastSeen?.seconds*1000).toDateString() + ' at ' + new Date(friendInfo.lastSeen?.seconds*1000).toLocaleTimeString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <Tooltip title="Delete your entire Chat" arrow>
                        <Button variant="contained" color="secondary" onClick={handleDelete}>
                            <DeleteIcon />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="chat__body">    
                <div>
                {messages.map((message) => (
                    <Tooltip title={message?.timestamp?.toDate().toDateString()} arrow placement="right">
                            <p
                                className={`chat__message ${
                                    message.msgSenderId == userstring &&
                                    'chat__reciever'
                                }`}
                            >
                                <img
                                    src={message.imgUrl}
                                    style={{ padding: 0, margin: 0 }}
                                    className="chat__body_uploadedPic"
                                />
                                {message.message}
                                <span className="chat__timeStamp">
                                    {new Date(
                                        message?.timestamp?.toDate()
                                    ).toLocaleTimeString()}
                                </span>
                            </p>
                    </Tooltip>
                ))}
                </div>
                
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        type="text"
                        placeholder="Type A Message Here..."
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        />
                    <button type="submit" onClick={sendMessage}>
                        Send a msg
                    </button>
                </form>

                <input
                    type="file"
                    id="upload_input"
                    value={pic}
                    onChange={handleUpload}
                    accept="image/*"
                    />
                <Tooltip title="Upload" arrow>
                    <Button
                        variant="contained"
                        style={{
                            background: ' #2997ff',
                            color: 'white',
                            borderRadius: '200px',
                            width: '30px',
                            zIndex: '100',
                        }}
                        >
                        <label htmlFor="upload_input">
                            <PhotoLibraryIcon />
                        </label>
                    </Button>
                </Tooltip>
            </div>
        </div>
        </ScrollToBottom>
    );
}

export default Chat;
