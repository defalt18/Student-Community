/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import './Eventmake.css';
import { EditorState } from 'draft-js';
import PollIcon from '@material-ui/icons/Poll';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { db, storage } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'
import { IconButton } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircleOutlineOutlined';

const useStyles = makeStyles((theme) => ({

    textfield: {
        color: 'white',
        '&.MuiTextField-root': {
            color: 'white'
        },
        '&.Mui-focused fieldset': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '&.MuiOutlinedInput-input': {
            color: 'white',
        },
        '&.MuiInputBase-input': {
            color: 'white'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                color: 'white',
                borderColor: 'white',
            },
            '&:hover fieldset': {
                color: 'white',
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                color: 'white',
                borderColor: 'white',
            },
        },
    },
    radio: {
        color: 'white',
    }

}));

function EventMake({ handleClose, imgus }) {
    const classes = useStyles();
    const { user } = useAuthListener();
    const [orgcomm, setOrgcomm] = useState("");
    const [team, setteam] = useState(2);
    const [data, setdet] = useState("");
    const [det, setDet] = useState({
        name: "",
        desc: "",
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": ""
    })

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setdet(currentContentAsHTML)
    }

    const handleCh = (e) => {
        const { name, value } = e.target;
        setDet({ ...det, [name]: value });
        console.log(det, data);
    }

    const handleSubmit = () => {

        db.collection('polls').doc((det.name + user.uid).toString()).set({
            name: det.name,
            desc: data,
            verified: 0
        }).then(() => {
            db.collection('polls').doc((det.name + user.uid).toString()).collection("options").doc("1").set({
                text: det["1"],
                people: 0,
            })
            db.collection('polls').doc((det.name + user.uid).toString()).collection("options").doc("2").set({
                text: det["2"],
                people: 0,
            })
            db.collection('polls').doc((det.name + user.uid).toString()).collection("options").doc("3").set({
                text: det["3"],
                people: 0,
            })
            db.collection('polls').doc((det.name + user.uid).toString()).collection("options").doc("4").set({
                text: det["4"],
                people: 0,
            })
            db.collection('polls').doc((det.name + user.uid).toString()).collection("options").doc("5").set({
                text: det["5"],
                people: 0,
            })

            setDet({
                name: "",
                desc:"",
                "1": "",
                "2": "",
                "3": "",
                "4": "",
                "5": ""
            })
        })
        
        handleClose();
    }

    return (
        <div style={{ height: '80vh', width: '50vw', background: 'rgb(28,28,30)', borderRadius: '15px', overflow: 'scroll', color: 'lightgray' }}>
            <div style={{
                zIndex: 10, position: 'sticky', top: 0, height: '50px', background: 'rgb(44,44,46)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'lightgray', fontWeight: 'bold', fontSize: '25px', boxShadow: '0 0 5px 0 black',
            }}>Request a Poll</div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div style={{ paddingLeft: '3%', width: '70%' }}>
                    <h2>Community Polls</h2>
                    <p>
                        Polls are a way to raise an opinion or an issue which exists within a community. The relevance of these polls will
                        be judged by the community in order to be posted on this platform. Please refrain from posting unnecessary and bogus polls.
                        <br />
                        <br />
                        Every poll has a maximum of <b>5 answers</b> for the users to select
                    </p>
                </div>
                <PollIcon style={{ fontSize: '7rem', margin: 'auto' }} />
            </div>
            <div style={{ padding: "3%", width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                <TextField id="name" name="name" onChange={handleCh} value={det.name} label="Poll Title" variant="outlined" className={classes.textfield} />
                <h2 style={{ margin: 0 }}>
                    Describe your issue :
                </h2>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
                <h2 style={{ margin: 0 }}>
                    Suitable answers :
                </h2>
                {
                    Array(team).fill().map((_, i) => (
                        <TextField id="name" name={(i + 1).toString()} onChange={handleCh} value={det[(i + 1).toString()]} label={"Answer " + (i + 1).toString()} variant="outlined" className={classes.textfield} />
                    ))}
                {team < 5 && <IconButton onClick={() => { if (team < 5) setteam(team + 1) }}>
                    <AddCircle fontSize="large" style={{ color: 'lightgray' }} />
                </IconButton>}
                <Button onClick={handleSubmit} color="primary" variant="contained" style={{ background: '#073589' }}>
                    Request Poll
                </Button>
            </div>
        </div>
    );
}

export default EventMake;
