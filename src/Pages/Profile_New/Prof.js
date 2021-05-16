import { React, useState, useEffect } from 'react';
import { db, storage } from '../../lib/firebase.prod';
import PeopleIcon from '@material-ui/icons/People';
import { useAuthListener } from '../../hooks';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Avatar, Button, IconButton } from '@material-ui/core';
import { Header, Sidebar } from '../../Components';
import { Post } from '../../Components';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FacebookIcon from '@material-ui/icons/Facebook';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/School';
import './Proj.css'
import SchoolIcon from '@material-ui/icons/AccountBalance';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InstagramIcon from '@material-ui/icons/Instagram';
import EditProfile from '../../Components/Modal/EditProfileModal'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MailIcon from '@material-ui/icons/Mail';
import Chip from '@material-ui/core/Chip';
import {
    ProfilePhotos,
} from '../../Components';
import cov from './Images/cover__new.png'
import Popover from '@material-ui/core/Popover';



const initialValues = {
    firstName: '',
    lastName: '',
    gender: '',
    bdate: '',
    course: '',
    degree: '',
    batch: '',
    city: '',
    state: '',
    country: '',
    skls: [],
    insta: '',
    linkedin: '',
    whatsapp: '',
    fb: '',
    studentid: '',
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            style={{ width: "100%" }}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "inherit",
        color: "white",
        display: 'flex',
        height: "auto",
    },
    tabs: {
        borderRight: `0px solid rgba(255,255,255,0.2)`,
    },
    divider: {
        background: "rgba(0,0,0,0.5)",
    },
    typography: {
        padding: theme.spacing(2),
        color: 'lightgray',
    },
    bio: {
        color: "lightgray",
        fontSize: 'large',
        textAlign: 'center',
        width: '100%',
    }
}));

function Prof(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { user } = useAuthListener();
    const [events, setevents] = useState([])
    const [np, snp] = useState(0);
    const [names, setName] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [role, setrole] = useState(0);
    const [posts, setPosts] = useState([]);
    const [head, sethd] = useState([]);
    const [usrimg, setUsrimg] = useState('');
    const [val, setval] = useState(0);
    const [fol, setfol] = useState([]);
    const [cover, setCov] = useState("");
    const [ca, setda] = useState(0);

    var uid = props.match.params.id.toString();

    useEffect(() => {

        db.collection('users')
            .doc(uid)
            .collection('About')
            .onSnapshot((snapshot) => {
                setName(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data(),
                    }))
                );
            });

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

        db.collection('users').doc(uid).collection('photos')
            .onSnapshot((snapshot) => {
                setPhotos(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        pic: doc.data(),
                    }))
                );
            });

        // if (user.displayName === "Club") {

        db.collection('events').where("uid", "==", uid).onSnapshot(
            snap => {
                setevents(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
                console.log(snap)
            }
        )

        // }

        db.collection('posts').where('UID', '==', uid).get().then(resp => snp(resp.kf.docChanges.length));

        db.collection('users')
            .doc(uid)
            .onSnapshot((snapshot) => {
                setUsrimg(snapshot.data().image);
                setCov(snapshot.data().cover);
                setrole(snapshot.data().club);
            });

        db.collection('users')
            .doc(user.uid)
            .onSnapshot((snapshot) => {
                sethd(snapshot.data().image);
            });

        db.collection('users')
            .doc(uid)
            .collection('friends')
            .onSnapshot((snapshot) => {
                setfol(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        fols: doc.data(),
                    }))
                );
            });

        fol.map((fols) => (fols.id === user.uid ? setval(1) : 1));

        setda(ca + 1);


    }, [cover, fol.length, usrimg, uid, names.length, val, photos.length]);


    names.map(
        ({ name }) => (
            (initialValues.lastName = name.lastname),
            (initialValues.firstName = name.firstname),
            (initialValues.gender = name.gender),
            (initialValues.bdate = name.birthdate),
            (initialValues.course = name.course),
            (initialValues.degree = name.degree),
            (initialValues.batch = name.batch),
            (initialValues.city = name.city),
            (initialValues.state = name.state),
            (initialValues.country = name.country),
            (initialValues.skls = name.skills),
            (initialValues.insta = name.insta),
            (initialValues.fb = name.fb),
            (initialValues.linkedin = name.linkedin),
            (initialValues.whatsapp = name.whatsapp),
            (initialValues.studentid = name.studentid)
        )
    );

    function followme() {
        // let b = document.getElementById('folwbot');
        if (val) {
            db.collection('users')
                .doc(uid)
                .collection('friends')
                .doc(user.uid)
                .delete();
            db.collection('users')
                .doc(user.uid)
                .collection('friends')
                .doc(uid)
                .delete();
            setval(0);
        } else {
            db.collection('users')
                .doc(uid)
                .collection('friends')
                .doc(user.uid)
                .set({ status: 'friend' });
            db.collection('users')
                .doc(user.uid)
                .collection('friends')
                .doc(uid)
                .set({ status: 'friend' });
            setval(1);
        }
    }
    const userabt = {
        firstName: '',
        lastName: '',
        degree: '',
        course: '',
        year: '',
    };
    names.map(
        ({ name }) => (
            (userabt.lastName = name.lastname),
            (userabt.firstName = name.firstname),
            (userabt.degree = name.degree),
            (userabt.course = name.course),
            (userabt.year = name.batch)
        )
    );

    const toTitleCase = (str) => {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }

    const handlechange = (e) => {
        let img = e.target.files[0];
        let nameit = (img.name + Date.now().toString()).toString();
        const uTk = storage.ref(`images/${nameit}`).put(img);
        uTk.on('state_changed', null, null, () => {
            storage
                .ref('images')
                .child(nameit)
                .getDownloadURL()
                .then((url) => {
                    db.collection('users').doc(uid).update({
                        cover: url,
                    });
                    setCov(url);
                });
        });
    };
    const handlechangedp = (e) => {
        let img = e.target.files[0];
        let nameit = (img.name + Date.now().toString()).toString();
        const uplTask = storage.ref(`images/${nameit}`).put(img);
        uplTask.on('state_changed', null, null, () => {
            storage
                .ref('images')
                .child(nameit)
                .getDownloadURL()
                .then((url) => {
                    db.collection('users').doc(user.uid).update({
                        image: url,
                    });
                    setUsrimg(null);
                });
        });
    };

    const handlephotoupload = (e) => {

        let img = e.target.files[0];
        let nameit = (img.name + Date.now().toString()).toString();
        const uplTask = storage.ref(`images/${nameit}`).put(img);
        uplTask.on('state_changed', null, null, () => {
            storage
                .ref('images')
                .child(nameit)
                .getDownloadURL()
                .then((url) => {
                    db.collection('users').doc(user.uid).collection('photos').add({
                        image: url,
                    });
                });
        });

    };
    return (
        <>
            <Header uimg={head} />
            <Sidebar />
            {
                user.uid === props.match.params.id ? (<>
                    <input onChange={handlechange} accept="image/*" type="file" id="cover" style={{ display: 'none' }} />
                    <Typography style={{
                        position: 'fixed', background: 'rgb(31,30,30)', width: "auto", textAlign: 'center',
                        top: "80px", right: "20px", zIndex: 1, color: 'white', padding: '10px', borderRadius: '10px', cursor: 'pointer'
                    }}>
                        <label htmlFor="cover" style={{ padding: 0, margin: 0, cursor: 'pointer' }}>
                            Upload Cover
                        </label>
                    </Typography>
                </>) : (<></>)
            }
            <img src={cover === "" ? cov : cover} style={{
                position: 'fixed',
                objectFit: 'cover', boxShadow: '0 3px 5px 0 black',
                top: 0, width: '100vw', height: '60vh'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '30vh', paddingBottom: "5vh", background: '#151516', minHeight: '100vh', paddingLeft: "60px" }}>
                <div style={{ margin: 'auto', background: 'rgb(31,30,30)', boxShadow: "0 3px 5px 0 black", position: 'relative', width: '75vw', borderRadius: '10px', padding: "20px" }}>
                    <Avatar onClick={handleClick} src={usrimg} style={{ height: '150px', width: "150px", position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)', top: 0 }} />
                    <Popover
                        className='popover'
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <a href={usrimg}><Typography className={classes.typography}>View Image</Typography></a>
                        {
                            user.uid === props.match.params.id ? (<>
                                <input onChange={handlechangedp} accept="image/*" type="file" id="dp" style={{ display: 'none' }} />
                                <Typography className={classes.typography} style={{ cursor: "pointer" }}><label htmlFor="dp">Upload Image</label></Typography>
                            </>) : (<></>)
                        }
                    </Popover>
                    <div className="Stats" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '0 5vw' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <d style={{ fontSize: 'xx-large', fontWeight: 'bold', color: 'white' }}>{fol.length}</d>
                            <d style={{ color: 'lightgray' }}>Friends</d>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <d style={{ fontSize: 'xx-large', fontWeight: 'bold', color: 'white' }}>{np}</d>
                            <d style={{ color: 'lightgray' }}>Posts</d>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <d style={{ fontSize: 'xx-large', fontWeight: 'bold', color: 'white' }}>{photos.length}</d>
                            <d style={{ color: 'lightgray' }}>Photos</d>
                        </div>
                        {role === 1 && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <d style={{ fontSize: 'xx-large', fontWeight: 'bold', color: 'white' }}>{events.length}</d>
                            <d style={{ color: 'lightgray' }}>Events</d>
                        </div>}
                        <Button variant="contained" style={{ marginLeft: 'auto', background: "rgba(0,150,255,0.7)", color: 'white' }}>
                            {
                                user.uid === props.match.params.id ? (<EditProfile uid={user.uid} />) :
                                    (
                                        val ? <d onClick={followme}>Following</d> : <d onClick={followme}>Follow</d>
                                    )
                            }
                        </Button>
                    </div>
                    <h1 style={{ margin: 'auto', color: 'white', textAlign: 'center', textTransform: 'capitalize' }}>{userabt.firstName} {userabt.lastName}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        {
                            role === 1 ?
                                <Chip
                                    avatar={<PeopleIcon style={{ color: 'rgba(0,100,255,1)' }} />}
                                    label="Club"
                                    variant="outlined"
                                    style={{ color: 'rgba(0,100,255,1)', borderColor: 'rgba(0,100,255,1)', marginTop: '10px', fontSize: "15px", padding: "0 10px", background: 'rgba(0,100,255,0.2)' }}
                                /> :
                                <Chip
                                    avatar={<FaceIcon style={{ color: 'darkgreen' }} />}
                                    label="Student"
                                    variant="outlined"
                                    style={{ color: 'green', borderColor: 'darkgreen', marginTop: '10px', background: 'rgba(0,255,0,0.05)' }}
                                />
                        }
                        <div style={{ display: 'flex', alignItems: 'center', gap: "10px", color: 'gray', justifyContent: "center" }}>
                            <LocationOnIcon fontSize="medium" />
                            <h2>{initialValues.city}, {initialValues.state}</h2>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: "30px", gap: "10px", color: 'gray', justifyContent: "center" }}>
                            <SchoolIcon fontSize="medium" />
                            <d style={{ fontSize: "20px", textTransform: 'uppercase' }}>{initialValues.degree} {initialValues.batch}, {initialValues.course}</d>
                        </div>
                    </div>
                    <p style={{ position: 'relative', textAlign: 'center', color: 'lightgray', fontSize: 'large', padding: "10px 10vw" }}>
                        {
                            role !== 1 ?
                                <d>Hey I am a student at DAIICT!</d> : <d>We are a club at DAIICT!</d>
                        }
                    </p>
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        {
                            initialValues.insta === undefined ? (<></>) :
                                (
                                    <IconButton href={initialValues.insta}>
                                        <InstagramIcon style={{ color: "#DD2A7B" }} />
                                    </IconButton>

                                )
                        }
                        {
                            initialValues.fb === undefined ? (<></>) :
                                (
                                    <IconButton href={initialValues.fb}>
                                        <FacebookIcon style={{ color: "#4267B2" }} />
                                    </IconButton>
                                )
                        }
                        {
                            initialValues.whatsapp === undefined ? (<></>) : (
                                <Tooltip title={initialValues.whatsapp}>
                                    <IconButton>
                                        <WhatsAppIcon style={{ color: "green" }} />
                                    </IconButton>
                                </Tooltip>
                            )}
                        {
                            initialValues.linkedin === undefined ? (<></>) : (

                                <IconButton href={initialValues.linkedin}>
                                    <LinkedInIcon color="primary" />
                                </IconButton>
                            )}
                        <a href={"mailto:" + initialValues.studentid + "@daiict.ac.in"}>
                            <IconButton >
                                <MailIcon style={{ color: "red" }} />
                            </IconButton>
                        </a>
                    </div>
                    <div className={classes.root}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label="Posts" {...a11yProps(0)} />
                            <Tab label="About" {...a11yProps(1)} />
                            <Tab label="Photos" {...a11yProps(2)} />
                            {role === 1 && <Tab label="Events" {...a11yProps(3)} />}
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            {
                                np ? (
                                    posts.map(({ id, post }) => (
                                        post.UID === props.match.params.id ?
                                            <div
                                                className="appitem"
                                                style={{
                                                    padding: '0',
                                                    background: 'transparent',
                                                }}
                                            >
                                                <Post
                                                    key={id}
                                                    pid={id}
                                                    lclss={post.UID}
                                                    usernm={post.username}
                                                    text={post.caption}
                                                    img={post.imageUrl}
                                                    likes={post.likes}
                                                    comments={post.comments}
                                                />
                                            </div>
                                            : <></>
                                    ))) :
                                    (
                                        <div style={{ display: 'flex', flexDirection: 'column', color: 'gray', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                                            <ErrorOutlineIcon style={{ fontSize: '100px' }} />
                                            <d style={{ fontSize: '35px', color: 'gray' }}>No posts to show!</d>
                                        </div>)
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <div style={{ width: "50%" }}>
                                    <h2 style={{ margin: 0 }}>Personal Information</h2>
                                    <hr />
                                    <p>First Name : {initialValues.firstName}</p>
                                    <p>Last Name : {initialValues.lastName}</p>
                                    <p>Birthday : {initialValues.bdate}</p>
                                    <p style={{ textTransform: "capitalize" }}>Gender : {initialValues.gender}</p>
                                </div>
                                <div style={{ width: "50%" }}>
                                    <h2 style={{ margin: 0 }}>Educational Information</h2>
                                    <hr />
                                    <p style={{ textTransform: "capitalize" }}>Degree : {initialValues.degree}</p>
                                    <p>Batch : {initialValues.batch}</p>
                                    <p>Course : <d style={{ textTransform: "uppercase" }}>{initialValues.course}</d></p>
                                    <p style={{ textTransform: "capitalize" }}>Country : {initialValues.country}</p>
                                </div>
                            </div>
                            <div style={{ width: "100%" }}>
                                <h2 style={{ margin: 0 }}>Skill Set</h2>
                                <hr />
                                <div className="about-right-skill-set">
                                    {initialValues.skls.map((_, id) => (
                                        <div className="about-right-skill-item" key={id}>{initialValues.skls[id]}</div>
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {/* <ProfilePhotos /> */}
                            <div style={{ position: 'sticky', display: 'flex', top: 0, alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'inherit', boxShadow: '0 5px 5px 0 rgba(0,0,0,0.5)' }}>
                                <Avatar src={usrimg} style={{ margin: `${user.uid !== uid ? "auto" : ""}` }} />
                                <input type="file" id='photos' accept="image/*" onChange={handlephotoupload} style={{ display: 'none' }} />
                                {
                                    user.uid === uid ? (
                                        <Button variant="contained" style={{ background: "rgba(0,150,255,0.7)", color: 'white' }}>
                                            <label htmlFor="photos">
                                                Upload Photos
                                            </label>
                                        </Button>
                                    ) : (<></>)
                                }
                            </div>
                            <div style={{ maxHeight: "90vh", overflow: 'auto' }}>
                                <Grid container spacing={0} >
                                    {
                                        photos.map(({ id, pic }) => (
                                            <Grid item xs={4}>
                                                <img src={pic.image} style={{ objectFit: 'cover', maxHeight: '200px', margin: 0, boxShadow: '0 0 3px 0 black' }} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </div>
                        </TabPanel>
                        {
                            role === 1 &&
                            <TabPanel value={value} index={3}>
                                <h2 style={{ margin: '0 5px', marginBottom: '10px' }}>Events by {initialValues.studentid} will show here</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                    {
                                        events.map(({ id, data }) => (
                                            <div style={{ display: 'flex', width: '100%', padding: '20px', background: 'black', alignItems: 'center', borderRadius: '20px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    <h3 style={{ margin: 0 }}>{data.name}</h3>
                                                    {
                                                        console.log(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())),
                                                        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) < new Date(new Date(data.date).getFullYear(), new Date(data.date).getMonth(), new Date(data.date).getDate()) ?
                                                            <Chip
                                                                label="Running"
                                                                variant="outlined"
                                                                style={{ color: 'rgba(0,200,100,1)', width: 'fit-content', borderColor: 'rgba(0,200,100,1)', padding: "0 10px", background: 'rgba(0,200,100,0.2)' }}
                                                            />
                                                            :
                                                            <Chip
                                                                label="Completed"
                                                                variant="outlined"
                                                                style={{ color: 'rgba(200,100,0,1)', width: 'fit-content', borderColor: 'rgba(200,100,0,1)', padding: "0 10px", background: 'rgba(200,100,0,0.2)' }}
                                                            />}
                                                    <p style={{ margin: 0 }}>Date : {data.date}</p>
                                                    <p style={{ margin: 0 }}>Deadline : {data.deadline}</p>
                                                    {
                                                        user.uid === uid && <Link to={`/participants/${id}`}>
                                                            <Button style={{ width: 'fit-content', background: 'white', color: 'black' }}>
                                                                See Participants
                                                            </Button>
                                                        </Link>
                                                    }
                                                </div>
                                                <div style={{ borderRadius: '5px', marginLeft: 'auto' }}>
                                                    <img src={data.poster} alt={data.name} style={{ height: '150px', borderRadius: '5px', marginLeft: 'auto' }} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabPanel>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Prof
