/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import 'date-fns';
import React, { useState, useEffect, useRef } from 'react';
import './Eventmake.css';
import { FileDrop } from 'react-file-drop'
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Radio from '@material-ui/core/Radio';
import { db, storage } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'

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
    const fileInputRef = useRef(null);
    const { user } = useAuthListener();
    const [Img, setImg] = useState(null);
    const [orgcomm, setOrgcomm] = useState("");
    const [team, setteam] = useState(0);
    const [det, setDet] = useState({
        name: "",
        poster: "",
        team: 0,
        tmsize: 1,
        venue: "",
        deadline: "",
        deadline_time: "",
        desc: "",
        time: "",
        date: ""
    })

    const onFileInputChange = (event) => {
        setImg(event.target.files[0]);
    }
    const onTargetClick = () => {
        fileInputRef.current.click()
    }

    useEffect(() => {
        db.collection('users').doc(user.uid)
            .onSnapshot(snap => setOrgcomm(snap.data().Name))
    }, [])

    const handleCh = (e) => {
        const { name, value } = e.target;
        setDet({ ...det, [name]: value });
    }

    const handleSubmit = () => {

        db.collection('events').doc((det.name + user.uid).toString()).set({
            name: det.name,
            poster: det.poster,
            team: det.team,
            tmsize: det.tmsize,
            venue: det.venue,
            deadline: det.deadline,
            deadline_time: det.deadline_time,
            desc: det.desc,
            time: det.time,
            date: det.date,
            uid : user.uid,
            org : orgcomm
        }).then(()=>{
            if (Img !== null) {
                let nameit = (Img.name + Date.now().toString()).toString();
                const uplTask = storage.ref(`event/posters/${nameit}`).put(Img);
                uplTask.on('state_changed', null, null, () => {
                    storage
                    .ref('event/posters')
                    .child(nameit)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection('events').doc((det.name + user.uid).toString()).update({
                            poster: url,
                        });
                    });
                });
            }
        })

        setDet({
            name: "",
            poster: "",
            team: 0,
            tmsize: 1,
            venue: "",
            deadline: "",
            deadline_time: "",
            desc: "",
            time: "",
            date: ""
        })

        handleClose();
    }

    return (
        <div style={{ height: '80vh', width: '50vw', background: 'rgb(28,28,30)', borderRadius: '15px', overflow: 'scroll', color: 'lightgray' }}>
            <div style={{
                zIndex: 10, position: 'sticky', top: 0, height: '50px', background: 'rgb(44,44,46)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'lightgray', fontWeight: 'bold', fontSize: '25px', boxShadow: '0 0 5px 0 black',
            }}>Event Registration</div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div style={{ paddingLeft: '3%', width: '70%' }}>
                    <h2>Community Events</h2>
                    <p>
                        Events are what holds the community together where students come together to showcase their talents. It is the responsibility
                        of the clubs to make sure these events are well organised and encourage significant participations.
                        <br />
                        <br />
                        Clubs can see participants info under Profile {"=>"} Events {"=>"} See Participants
                    </p>
                </div>
                <EventAvailableIcon style={{ fontSize: '7rem', margin: 'auto' }} />
            </div>
            <div style={{ padding: "3%", width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                <TextField id="name" name="name" onChange={handleCh} value={det.name} label="Name of the event" variant="outlined" className={classes.textfield} />
                <TextField id="desc" name="desc" onChange={handleCh} value={det.desc} label="Short Description of the event" variant="outlined" className={classes.textfield} />
                <TextField
                    label="Event Date"
                    id="date"
                    name="date"
                    className={classes.textfield}
                    onChange={handleCh} value={det.date}
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant='outlined'
                    inputProps={{
                        autocomplete: 'nope',
                        form: {
                            autocomplete: 'off',
                        },
                    }}
                />
                <TextField
                    label="Event Time"
                    id="date"
                    name="time"
                    className={classes.textfield}
                    onChange={handleCh} value={det.time}
                    type="time"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant='outlined'
                    inputProps={{
                        autocomplete: 'nope',
                        form: {
                            autocomplete: 'off',
                        },
                    }}
                />
                <RadioGroup row aria-label="position" name="position" defaultValue={det.team}>
                    <h3>Who will be participating :</h3>
                    <h3 style={{ marginLeft: '20px' }}>Team</h3>
                    <Radio className={classes.radio} onChange={handleCh} value={det.team} name="team" value="1" onClick={(e) => { setteam(e.target.value) }} />
                    <h3 style={{ marginLeft: '20px' }}>Individual</h3>
                    <Radio className={classes.radio} onChange={handleCh} value={det.team} name="team" value="0" onClick={(e) => { setteam(e.target.value) }} />
                </RadioGroup>
                {
                    team === "1" &&
                    <TextField id="team" name="tmsize" onChange={handleCh} value={det.tmsize} type="number" label="Team Size (Minimum)" variant="outlined" className={classes.textfield} />
                }
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <TextField
                        style={{ width: '47%' }}
                        label="Deadline Date (if any)"
                        id="date"
                        name="deadline"
                        onChange={handleCh} value={det.deadline}
                        className={classes.textfield}
                        type="date"
                        // value={values.bdate}
                        // onChange={handleChange}
                        // className={classes.inputBdate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant='outlined'
                        inputProps={{
                            autocomplete: 'nope',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                    />
                    <TextField
                        style={{ width: '47%' }}
                        label="Deadline Time (if any)"
                        id="date"
                        name="deadline_time"
                        onChange={handleCh} value={det.deadline_time}
                        className={classes.textfield}
                        type="time"
                        // value={values.bdate}
                        // onChange={handleChange}
                        // className={classes.inputBdate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant='outlined'
                        inputProps={{
                            autocomplete: 'nope',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                    />
                </div>
                <TextField id="venue" name="venue" onChange={handleCh} value={det.venue} label="Venue or Meet link" variant="outlined" className={classes.textfield} />
                <input
                    onChange={onFileInputChange}
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <FileDrop onTargetClick={onTargetClick}>
                    <p style={{ margin: '0', padding: '5vh 0' }}>{Img ? Img.name : "Drop your event poster"}</p></FileDrop>
                <TextField id="venue" onChange={handleCh} value={det.google_form} name="google_form" label="Google Form Link (Optional)" variant="outlined" className={classes.textfield} />
                <p style={{ margin: 0 }}>*In case you want more information from the participants, we allow the google form links as well!</p>
                <Button onClick={handleSubmit} color="primary" variant="contained" style={{ background: '#073589' }}>
                    Post Event
                </Button>
            </div>
        </div>
    );
}

export default EventMake;
