/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import './Settings.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../../context/firebase'
import * as ROUTES from '../../constants/routes'
import { db } from '../../lib/firebase.prod'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		},
		display: 'flex',
		FormatAlignJustify: 'left',
		flexDirection: 'column',
		padding: '20px',
		textAlign: 'left'
	},
	inputRow: {
		// width: '300px',
		display: 'flex',
		alignItems: 'left',
		paddingTop: '10px'
	},
	inputFname: {
		width: '40%'
	},
	inputLname: {
		marginLeft: '10%',
		width: '40%'
	},
	inputGender: {
		width: '20%'
	},
	inputBdate: {
		marginLeft: '10%',
		width: '30%'
	},
	inputCourse: {
		width: '26%'
	},
	inputDegree: {
		marginLeft: '10%',
		width: '26%'
	},
	inputBatch: {
		marginLeft: '10%',
		width: '26%'
	},
	inputCity: {
		width: '26%'
	},
	inputState: {
		marginLeft: '10%',
		width: '26%'
	},
	inputCountry: {
		marginLeft: '10%',
		width: '26%'
	},
	inputSkills: {
		width: '100%'
	}
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 200
		}
	}
}

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
	skills: []
}

function Settings() {
	const classes = useStyles()
	const history = useHistory()
	const { firebase } = useContext(FirebaseContext)
	const [skls, setSkills] = useState([])
	const [values, setValues] = useState(initialValues)
	// const [error, setError] = useState('');
	const handleChange = (e) => {
		const { name, value } = e.target
		setValues({
			...values,
			[name]: value
		})
	}

	// const handleSignup = (event) => {
	//     event.preventDefault();

	//     return firebase
	//         .auth()
	//         .createUserWithEmailAndPassword(values.emailid, values.password)
	//         .then((result) =>
	//             result.user
	//                 .updateProfile({
	//                     displayName: values.firstName,
	//                 })
	//                 .then(() => {
	//                     db.collection('users').doc(result.user.uid).set({
	//                         Name: values.firstName,
	//                         image: '',
	//                         cover: '',
	//                     });

	//                     db.collection('users')
	//                         .doc(result.user.uid)
	//                         .collection('About')
	//                         .doc(result.user.uid)
	//                         .set({
	//                             firstname: values.firstName,
	//                             lastname: values.lastName,
	//                             gender: values.gender,
	//                             birthdate: values.bdate,
	//                             course: values.course,
	//                             degree: values.degree,
	//                             batch: values.batch,
	//                             city: values.city,
	//                             state: values.state,
	//                             country: values.country,
	//                             skills: skls,
	//                         });

	//                     history.push(ROUTES.HOME);
	//                 })
	//         )
	//         .catch(() => {
	//             // setError(error.message);
	//         });
	// };
	return (
		<div className='settings'>
			<CssBaseline />
			<div className='settings__container'>
				<form className={classes.root} autoComplete='off'>
					<h1>Sign Up</h1>
					<hr />
					<div className={classes.inputRow}>
						<TextField
							label='Email-id'
							name='emailid'
							className={classes.inputFname}
							value={values.emailid}
							onChange={handleChange}
						/>
						<TextField
							label='Username'
							name='username'
							className={classes.inputLname}
							value={values.username}
							onChange={handleChange}
						/>
						<TextField
							label='Password'
							name='password'
							className={classes.inputLname}
							value={values.password}
							onChange={handleChange}
						/>
					</div>
					<div className={classes.inputRow}>
						<TextField
							label='First Name'
							name='firstName'
							className={classes.inputFname}
							value={values.firstName}
							onChange={handleChange}
						/>
						<TextField
							label='Last Name'
							name='lastName'
							className={classes.inputLname}
							value={values.lastName}
							onChange={handleChange}
						/>
					</div>
					<div className={classes.inputRow}>
						<FormControl className={classes.inputGender}>
							<InputLabel id='demo-simple-select-autowidth-label'>
								Gender
							</InputLabel>
							<Select
								labelId='demo-simple-select-autowidth-label'
								name='gender'
								value={values.gender}
								onChange={handleChange}
							>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={'male'}>Male</MenuItem>
								<MenuItem value={'female'}>Female</MenuItem>
								<MenuItem value={'other'}>Other</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label='Birthdate'
							name='bdate'
							type='date'
							value={values.bdate}
							onChange={handleChange}
							className={classes.inputBdate}
							InputLabelProps={{
								shrink: true
							}}
						/>
					</div>
					<div className={classes.inputRow}>
						<FormControl className={classes.inputCourse}>
							<InputLabel id='demo-simple-select-autowidth-label'>
								Course
							</InputLabel>
							<Select
								labelId='demo-simple-select-autowidth-label'
								name='course'
								value={values.course}
								onChange={handleChange}
							>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={'ict'}>ICT</MenuItem>
								<MenuItem value={'ictcs'}>ICT+CS</MenuItem>
								<MenuItem value={'mnc'}>MnC</MenuItem>
							</Select>
						</FormControl>
						<FormControl className={classes.inputDegree}>
							<InputLabel id='demo-simple-select-autowidth-label'>
								Degree
							</InputLabel>
							<Select
								labelId='demo-simple-select-autowidth-label'
								name='degree'
								value={values.degree}
								onChange={handleChange}
							>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={'btech'}>B.Tech</MenuItem>
								<MenuItem value={'mtech'}>M.Tech</MenuItem>
								<MenuItem value={'mscit'}>MscIT</MenuItem>
							</Select>
						</FormControl>
						<FormControl className={classes.inputBatch}>
							<InputLabel id='demo-simple-select-autowidth-label'>
								Batch
							</InputLabel>
							<Select
								labelId='demo-simple-select-autowidth-label'
								name='batch'
								value={values.batch}
								onChange={handleChange}
								MenuProps={MenuProps}
							>
								<MenuItem value=''>
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
					<div className={classes.inputRow}>
						<TextField
							label='City'
							name='city'
							className={classes.inputCity}
							value={values.city}
							onChange={handleChange}
						/>
						<TextField
							label='State'
							name='state'
							className={classes.inputState}
							value={values.state}
							onChange={handleChange}
						/>
						<TextField
							label='Country'
							name='country'
							className={classes.inputCountry}
							value={values.country}
							onChange={handleChange}
						/>
					</div>
					<div className={classes.inputRow}>
						<Autocomplete
							multiple
							options={skillSet}
							color='white'
							getOptionLabel={(option) => option}
							className={classes.inputSkills}
							filterSelectedOptions
							onChange={(event, value) => setSkills(value)} // prints the selected value
							renderInput={(params) => (
								<TextField
									{...params}
									variant='standard'
									label='Skills'
									placeholder='Add Skill'
								/>
							)}
						/>
					</div>
					<div className={classes.inputRow}>
						<Button
							variant='contained'
							// onClick={handleSignup}
							color='primary'
							className={classes.button}
						>
							Save
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
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
	'Video Editing'
]

export default Settings
