import React, { useState, useContext} from 'react';
import { useHistory ,Link} from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import * as ROUTES from '../Constants/routes';
import './Signup.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { storage,db } from '../lib/firebase.prod';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: 'flex',
        FormatAlignJustify: 'left',
        flexDirection: 'column',
        padding: '20px',
        textAlign: 'left',

        '& .MuiTextField-root': {
            // margin: theme.spacing(1),
            // width: '25ch',
            // border: 'none'
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderColor: ' transparent',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: ' transparent',
            },
            '&:hover fieldset': {
                borderColor: ' transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#073589',
            },
        },
    },
    inputRow: {
        // width: '300px',
        display: 'flex',
        alignItems: 'left',
        paddingTop: '10px',
    },
    inputFname: {
        width: '50%',
        background : 'rgba(0,0,0,0.3)',
        borderRadius : '10px'
    },
    inputLname: {
        marginLeft: '10%',
        background : 'rgba(0,0,0,0.3)',
        width: '40%',
        borderRadius : '10px'
    },
    inputGender: {
        width: '40%',
        background : 'rgba(0,0,0,0.3)',
        borderRadius : '10px',
    },
    inputBdate: {
        marginLeft: '20%',
        background : 'rgba(0,0,0,0.3)',
        width: '40%',
        borderRadius : '10px',
        color:'white',
    },
    inputCourse: {
        width: '26%',
        background : 'rgba(0,0,0,0.3)',
        borderRadius : '10px',
    },
    inputDegree: {
        marginLeft: '10%',
        background : 'rgba(0,0,0,0.3)',
        width: '26%',
        borderRadius : '10px'
    },
    inputBatch: {
        marginLeft: '10%',
        background : 'rgba(0,0,0,0.3)',
        width: '26%',
        borderRadius : '10px'
    },
    inputCity: {
        width: '30%',
        background : 'rgba(0,0,0,0.3)',
        borderRadius : '10px'
    },
    inputState: {
        marginLeft: '10%',
        background : 'rgba(0,0,0,0.3)',
        width: '30%',
        borderRadius : '10px'
    },
    inputCountry: {
        marginLeft: '10%',
        background : 'rgba(0,0,0,0.3)',
        width: '30%',
        borderRadius : '10px'
    },
    inputSkills: {
        width: '100%',
        background : 'rgba(0,0,0,0.3)',
        borderRadius : '10px'
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
};

const initialValues = {
    emailid: '',
    username: '',
    password: '',
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
    skills: [],
};

export default function SignUp() {
    const classes = useStyles();
    const [dim,setdim] = useState('Individual');
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [skls, setSkills] = useState([]);
    const [values, setValues] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const [imgprev,setimgprev] = useState(null);
    const [img,setimgprevs] = useState(null);

    const [value, setValue] = React.useState('female');

    const handleChe = (event) => {
        setValue(event.target.value);
    };
    const handleSignup = (event) => {
        event.preventDefault();

        return firebase
            .auth()
            .createUserWithEmailAndPassword(values.emailid, values.password)
            .then((result) =>
                result.user
                    .updateProfile({
                        displayName: values.firstName,
                        displayImg : imgprev,
                    })
                    .then(() => {
                        db.collection('users').doc(result.user.uid).set({
                            Name: values.firstName,
                            image: '',
                            cover: '',
                        });
                        db.collection('users')
                            .doc(result.user.uid)
                            .collection('About')
                            .doc(result.user.uid)
                            .set({
                                firstname: values.firstName,
                                lastname: values.lastName,
                                gender: values.gender,
                                birthdate: values.bdate,
                                course: values.course,
                                degree: values.degree,
                                batch: values.batch,
                                city: values.city,
                                state: values.state,
                                country: values.country,
                                skills: skls,
                            });
                        
                        if (imgprev)
                        {
                            let nameit = (imgprev.name + Date.now().toString()).toString();
                            const upTak = storage.ref(`images/${nameit}`).put(imgprev);
                            upTak.on(
                                'state_changed',null,null,
                                () => {
                                    storage
                                        .ref('images')
                                        .child(nameit)
                                        .getDownloadURL()
                                        .then((url) => {
                                            db.collection('users')
                                                .doc(result.user.uid).update({
                                                    image:url
                                        });
                                })
                        })}

                        history.push(ROUTES.HOME);
                    })
            )
            .catch(() => {
                // setError(error.message);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="signup-page">
            <div style={{
                width:'100%',display:'flex',flexDirection:'column'}}>
                <div className='cranac'>
                    Register as a student
                </div>
            </div>
            <Link to ='/signin' style={{position:'absolute',zIndex:1,top:'30px',left:'30px'}}>
                <ArrowBackIosIcon fontSize='large' />
            </Link>
                <div className="signup-inner">
                    <form className={classes.root} autoComplete="off">
                        <label htmlFor='dp'>
                            <div id='backdiv' style={{borderRadius:'25px',backgroundSize:'cover',backgroundPosition:'center',background:'rgba(0,0,0,0.3)'}}>
                                <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',borderRadius:'25px',width:'100%',backdropFilter:'saturate(180%) blur(10px)'}}>
                                    <p id='capt' style={{color:'white',fontSize:'30px',fontWeight:'bold'}}>Upload a display picture</p>
                                    <input id='dp' onChange={(e)=>
                                        {   
                                            setimgprev(e.target.files[0]);
                                            setimgprevs(URL.createObjectURL(e.target.files[0]));
                                            let m = URL.createObjectURL(e.target.files[0]);
                                            document.getElementById('backdiv').style.backgroundImage = `url("${m}")`
                                            document.getElementById('capt').style.display = 'none';
                                        }
                                        }type='file' accept='image/*' style={{display:'none'}}/>
                                    <Avatar src={img} style={{margin:'20px', height:'150px', width:'150px'}}/>
                                </div>
                            </div>
                        </label>
                        <div className={classes.inputRow}>
                            <TextField
                                label="Email-id"
                                name="emailid"
                                inputProps={{
                                    autocomplete: 'nope',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                                className={classes.inputFname}
                                value={values.emailid}
                                onChange={handleChange}
                                variant='outlined'
                            />
                            <TextField
                                label="Username"
                                name="username"
                                className={classes.inputLname}
                                value={values.username}
                                onChange={handleChange}
                                inputProps={{
                                    autocomplete: 'nope',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                                variant='outlined'
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password" 
                                className={classes.inputLname}
                                value={values.password}
                                onChange={handleChange}
                                inputProps={{
                                    autocomplete: 'nope',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                                variant='outlined'
                                />
                        </div>
                        <div className={classes.inputRow} style={{alignItems:'center'}}>
                        <FormControl component="fieldset">
                        <FormLabel style={{color:'white' , fontSize:'20px', margin:'auto'}} component="legend">What are you signing up as ?</FormLabel>
                        <RadioGroup row aria-label="position" name="position" defaultValue="Individual">
                        <div style={{display:'flex',alignItems:'center',width:'46vw',marginTop:'20px',border:'0px solid green',justifyContent:'space-evenly'}}>
                            <FormControlLabel
                                style={{color:'white',padding:'0 20px',borderRadius:'10px',background : 'rgba(0,0,0,0.3)'}}
                                value="Club"
                                control={<Radio color="primary" />}
                                label="Club"
                                labelPlacement="start"
                                onChange={e=>{setdim(e.target.value)}}
                                />
                            <FormControlLabel
                                style={{color:'white',padding:'0 20px',borderRadius:'10px',background : 'rgba(0,0,0,0.3)'}}
                                value="Individual"
                                control={<Radio color="primary" />}
                                label="Individual"
                                labelPlacement="start"
                                onChange={e=>setdim(e.target.value)}
                                />
                        </div>
                        </RadioGroup>
                        </FormControl>
                        </div>
                        {
                            dim==='Individual'?
                        (
                            <>
                            <div id='indi' className={classes.inputRow} style={{alignItems:'center'}}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                className={classes.inputFname}
                                value={values.firstName}
                                onChange={handleChange}
                                autoComplete="nope"
                                inputProps={{
                                    autoComplete: 'nope',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                                variant='outlined'
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                className={classes.inputLname}
                                value={values.lastName}
                                onChange={handleChange}
                                inputProps={{
                                    autocomplete: 'nope',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                                variant='outlined'
                            />
                        </div>
                        <div id='indi' className={classes.inputRow}>
                            <FormControl variant='outlined' className={classes.inputGender}>
                                <InputLabel id="demo-simple-select-autowidth-label">
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    inputProps={{
                                        autocomplete: 'nope',
                                        form: {
                                            autocomplete: 'off',
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                    <MenuItem value={'other'}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Birthdate"
                                name="bdate"
                                type="date"
                                value={values.bdate}
                                onChange={handleChange}
                                className={classes.inputBdate}
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
                        <div id='indi' className={classes.inputRow} style={{justifyContent:'space-between'}}>
                            <FormControl variant='outlined' className={classes.inputCourse}>
                                <InputLabel id="demo-simple-select-autowidth-label">
                                    Course
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    name="course"
                                    value={values.course}
                                    onChange={handleChange}
                                    inputProps={{
                                        autocomplete: 'nope',
                                        form: {
                                            autocomplete: 'off',
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'ict'}>ICT</MenuItem>
                                    <MenuItem value={'ictcs'}>ICT+CS</MenuItem>
                                    <MenuItem value={'mnc'}>MnC</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant='outlined' className={classes.inputDegree}>
                                <InputLabel id="demo-simple-select-autowidth-label">
                                    Degree
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    name="degree"

                                    value={values.degree}
                                    onChange={handleChange}
                                    inputProps={{
                                        autocomplete: 'nope',
                                        form: {
                                            autocomplete: 'off',
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'btech'}>B.Tech</MenuItem>
                                    <MenuItem value={'mtech'}>M.Tech</MenuItem>
                                    <MenuItem value={'mscit'}>MscIT</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant='outlined' className={classes.inputBatch}>
                                <InputLabel id="demo-simple-select-autowidth-label">
                                    Batch
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    name="batch"
                                    
                                    value={values.batch}
                                    onChange={handleChange}
                                    MenuProps={MenuProps}
                                    inputProps={{
                                        autocomplete: 'nope',
                                        form: {
                                            autocomplete: 'off',
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {Array(21)
                                        .fill()
                                        .map((_, i) => (
                                            <MenuItem key={i} value={2021 - i}>
                                                {2021 - i}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div id='indi' className={classes.inputRow} style={{justifyContent:'space-between'}}>
                            <TextField
                                label="City"
                                name="city"
                                variant='outlined'
                                className={classes.inputCity}
                                value={values.city}
                                onChange={handleChange}
                                inputProps={{
                                    autocomplete: 'nope',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                            />
                            <TextField
                                label="State"
                                name="state"
                                variant='outlined'
                                className={classes.inputState}
                                value={values.state}
                                onChange={handleChange}
                                inputProps={{
                                    autocomplete: 'nope',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                            />
                            <TextField
                                label="Country"
                                name="country"
                                variant='outlined'
                                className={classes.inputCountry}
                                value={values.country}
                                onChange={handleChange}
                                inputProps={{
                                    autocomplete: 'nope',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                            />
                        </div>
                        <div id='indi' className={classes.inputRow}>
                            <Autocomplete
                                multiple
                                options={skillSet}
                                color="white"
                                getOptionLabel={(option) => option}
                                className={classes.inputSkills}
                                filterSelectedOptions
                                onChange={(event, value) => setSkills(value)} // prints the selected value
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant='outlined'
                                        label="Skills"
                                        placeholder="Add Skill"
                                    />
                                )}
                            />
                        </div>
                        </>
                        ):(<></>)}
                        <div className={classes.inputRow} style={{margin:'auto'}}>
                            <Button
                                variant="contained"
                                onClick={handleSignup}
                                style={{ backgroundColor: '#119' ,fontWeight:'bold',color:'rgba(255,255,255)'}}
                                className={classes.button}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
}

const skillSet = [
    'App Development',
    'UX design',
    'SEO/SEM marketing',
    'Blockchain',
    'Industrial design',
    'Creativity',
    'Web Development',
    'Cloud computing',
    'Artificial intelligence',
    'Machine Learning',
    'Video Editing',
];
