import { React, useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { db } from '../../lib/firebase.prod';
import Button from '@material-ui/core/Button';
import { useAuthListener } from '../../hooks';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './About.css';

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
        textAlign: 'left',
        '& .MuiFormControl-root': {
            background: '#232324',
        },
        // '& .MuiTextField-root': {
        //     // margin: theme.spacing(1),
        //     // width: '25ch',
        //     // border: 'none'
        //     background: 'red',
        // },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderColor: ' transparent',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: ' transparent',
                background: '0000003d',
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
        width: '40%',
        background: '#232324',
        borderRadius: '10px',
    },
    inputLname: {
        marginLeft: '10%',
        background: '#232324',
        width: '40%',
        borderRadius: '10px',
    },
    inputGender: {
        width: '40%',
        background: '#232324',
        borderRadius: '10px',
    },
    inputBdate: {
        marginLeft: '10%',
        background: '#232324',
        width: '40%',
        borderRadius: '10px',
        color: 'white',
    },
    inputCourse: {
        width: '26%',
        background: '#232324',
        borderRadius: '10px',
    },
    inputDegree: {
        marginLeft: '10%',
        background: '#232324',
        width: '26%',
        borderRadius: '10px',
    },
    inputBatch: {
        marginLeft: '10%',
        background: '#232324',
        width: '26%',
        borderRadius: '10px',
    },
    inputCity: {
        width: '30%',
        background: '#232324',
        borderRadius: '10px',
    },
    inputState: {
        marginLeft: '10%',
        background: '#232324',
        width: '30%',
        borderRadius: '10px',
    },
    inputCountry: {
        marginLeft: '10%',
        background: '#232324',
        width: '30%',
        borderRadius: '10px',
    },
    inputSkills: {
        width: '100%',
        background: '#232324',
        borderRadius: '10px',
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
};

export default function About({ uid, func }) {
    const classes = useStyles();
    const { user } = useAuthListener();

    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const [names, setName] = useState([]);
    var userstring = uid.toString();

    const toTitleCase = (str) => {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }

    useEffect(() => {
        db.collection('users')
            .doc(userstring)
            .collection('About')
            .onSnapshot((snapshot) => {
                setName(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data(),
                    }))
                );
            });
    }, [userstring]);

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
            (initialValues.whatsapp = name.whatsapp)
        )
    );

    const handlesave = () => {
        db.collection('users')
            .doc(userstring)
            .collection('About')
            .doc(uid)
            .update({
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
            })
            .then(function () {
                console.log('Document written with ID: ', userstring);
            })
            .catch(function (error) {
                console.error('Error adding document: ', error);
            });
        func();
    };

    return (
        <div className="about-right" style={{ minWidth: '60vw', background: "#232324" }}>
            {user.uid === uid ? (
                <div className="appitem" style={{ background: '#232324' }}>
                    <ThemeProvider theme={theme}>
                        <form className={classes.root} autoComplete="off">
                            <div className={classes.inputRow}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    className={classes.inputFname}
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    className={classes.inputLname}
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.inputRow}>
                                <FormControl className={classes.inputGender}>
                                    <InputLabel id="demo-simple-select-autowidth-label">
                                        Gender
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        name="gender"
                                        value={values.gender}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>
                                            Female
                                        </MenuItem>
                                        <MenuItem value={'other'}>
                                            Other
                                        </MenuItem>
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
                                />
                            </div>
                            <div className={classes.inputRow}>
                                <FormControl className={classes.inputCourse}>
                                    <InputLabel id="demo-simple-select-autowidth-label">
                                        Course
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        name="course"
                                        value={values.course}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'ict'}>ICT</MenuItem>
                                        <MenuItem value={'ictcs'}>
                                            ICT+CS
                                        </MenuItem>
                                        <MenuItem value={'mnc'}>MnC</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.inputDegree}>
                                    <InputLabel id="demo-simple-select-autowidth-label">
                                        Degree
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        name="degree"
                                        value={values.degree}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'btech'}>
                                            B.Tech
                                        </MenuItem>
                                        <MenuItem value={'mtech'}>
                                            M.Tech
                                        </MenuItem>
                                        <MenuItem value={'mscit'}>
                                            MscIT
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.inputBatch}>
                                    <InputLabel id="demo-simple-select-autowidth-label">
                                        Batch
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        name="batch"
                                        value={values.batch}
                                        onChange={handleChange}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {Array(21)
                                            .fill()
                                            .map((_, i) => (
                                                <MenuItem
                                                    value={2021 - i}
                                                    key={i}
                                                >
                                                    {2021 - i}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.inputRow}>
                                <TextField
                                    label="City"
                                    name="city"
                                    className={classes.inputCity}
                                    value={values.city}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="State"
                                    name="state"
                                    className={classes.inputState}
                                    value={values.state}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Country"
                                    name="country"
                                    className={classes.inputCountry}
                                    value={values.country}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.inputRow}>
                                <Autocomplete
                                    multiple
                                    options={skillSet}
                                    color="white"
                                    getOptionLabel={(option) => option}
                                    defaultValue={initialValues.skls}
                                    className={classes.inputSkills}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Skills"
                                            placeholder="Add Skill"
                                        />
                                    )}
                                />
                            </div>

                            <div className={classes.inputRow}>
                                <d style={{fontSize:'20px', fontWeight:'bold'}}>Where can one reach you at !?</d>
                            </div>
                            <div className={classes.inputRow}>
                                <TextField
                                    label="Instagram"
                                    name="insta"
                                    className={classes.inputFname}
                                    value={values.insta}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="LinkedIn"
                                    name="linkedin"
                                    className={classes.inputLname}
                                    value={values.linkedin}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.inputRow}>

                                <TextField
                                    label="WhatsApp Number"
                                    name="whatsapp"
                                    className={classes.inputFname}
                                    value={values.whatsapp}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Facebook"
                                    name="fb"
                                    className={classes.inputLname}
                                    value={values.fb}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className={classes.inputRow}>
                                    <Button
                                        variant="contained"
                                        onClick={handlesave}
                                        color="primary"
                                        // className={classes.button}
                                        style={{
                                            color: ' white',
                                            background: ' #2997ff',
                                            fontWeight: '600',
                                        }}
                                    >
                                        SAVE
                                </Button>
                                </div>
                        </form>
                    </ThemeProvider>
                </div>
            ) : (
                    <div>
                        <div className="appitem">
                            <div className="about-right-title">General</div>
                            <div className="about-right-detail">
                                <div className="about-right-detail-row">
                                    <div className="about-right-detail-lable">
                                        First Name{DASH_CHAR}
                                        <span className="about-right-detail-value">
                                            &nbsp; {toTitleCase(values.firstName)}
                                        </span>{' '}
                                    </div>
                                    <div className="about-right-detail-lable">
                                        Last Name{DASH_CHAR}
                                        <span className="about-right-detail-value">
                                            &nbsp; {toTitleCase(values.lastName)}
                                        </span>{' '}
                                    </div>
                                    <div className="about-right-detail-lable">
                                        Gender{DASH_CHAR}
                                        <span className="about-right-detail-value">
                                            &nbsp;{toTitleCase(values.gender)}
                                        </span>{' '}
                                    </div>
                                </div>
                                <div className="about-right-detail-row">
                                    <div className="about-right-detail-lable">
                                        Birth Date{DASH_CHAR}
                                        <span className="about-right-detail-value">
                                            &nbsp; {values.bdate}
                                        </span>{' '}
                                    </div>
                                    <div className="about-right-detail-lable">
                                        From{DASH_CHAR}
                                        <span className="about-right-detail-value">
                                            &nbsp; {toTitleCase(values.city)},&nbsp;{' '}
                                            {values.state}
                                        ,&nbsp; {values.country}
                                        </span>{' '}
                                    </div>
                                </div>
                                <div className="about-right-detail-row">
                                    <div className="about-right-detail-lable">
                                        Degree{DASH_CHAR}
                                        <span className="about-right-detail-value">
                                            &nbsp; {toTitleCase(values.degree)}
                                        </span>{' '}
                                    </div>
                                    <div className="about-right-detail-lable">
                                        Course{DASH_CHAR}
                                        <span className="about-right-detail-value">
                                            &nbsp; {values.course.toUpperCase()}
                                        </span>{' '}
                                    </div>
                                    <div className="about-right-detail-lable">
                                        Batch{DASH_CHAR}
                                        <span className="about-right-detail-value">
                                            &nbsp;{values.batch}
                                        </span>{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="appitem" style={{ marginTop: '40px' }}>
                            <div className="about-right-title">Skills</div>
                            <div className="about-right-detail">
                                <div className="about-right-skill-set">
                                    {initialValues.skls.map((_, id) => (
                                        <div className="about-right-skill-item" key={id}>{initialValues.skls[id]}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
            )}
                </div>
            );
}

const USER_SKILLSETS = ['C/C++', 'Python', 'JavaScript', 'Web Development'];

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

const DASH_CHAR = ' :';
