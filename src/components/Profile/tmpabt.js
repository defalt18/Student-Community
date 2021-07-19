/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import { FormatAlignJustify } from '@material-ui/icons'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { Firebase, db } from '../../lib/firebase.prod'
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
	firstName: '',
	lastName: '',
	gender: '',
	bdate: '',
	course: '',
	degree: '',
	batch: '',
	city: '',
	state: '',
	country: ''
}

export default function About(props) {
	const classes = useStyles()

	const [values, setValues] = useState(initialValues)
	// const [dated, setDated] = useState('5-1-2000');

	const handleChange = (e) => {
		const { name, value } = e.target
		setValues({
			...values,
			[name]: value
		})
	}

	const [names, setName] = useState([])
	var userstring = props.uid.toString()

	useEffect(() => {
		db.collection('users')
			.doc(userstring)
			.collection('About')
			.onSnapshot((snapshot) => {
				setName(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						name: doc.data()
					}))
				)
			})
	}, [])

	names.map(
		({ id, name }) => (
			(initialValues.lastName = name.lastname),
			(initialValues.firstName = name.firstname),
			(initialValues.gender = name.gender),
			(initialValues.bdate = name.birthdate),
			(initialValues.course = name.course),
			(initialValues.degree = name.degree),
			(initialValues.batch = name.batch),
			(initialValues.city = name.city),
			(initialValues.state = name.state),
			(initialValues.country = name.country)
		)
	)

	const handlesave = () => {
		console.log('hi')
		console.log(userstring)
		console.log(initialValues)
		console.log(values)
		db.collection('users')
			.doc(userstring)
			.collection('About')
			.doc('n3JDj4WgIDWtUge1FeuA')
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
				country: values.country
			})
			.then(function (docRef) {
				console.log('Document written with ID: ', userstring)
			})
			.catch(function (error) {
				console.error('Error adding document: ', error)
			})
	}

	return (
		<div className='profile-about'>
			<form className={classes.root} autoComplete='off'>
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
									<MenuItem value={2021 - i}>{2021 - i}</MenuItem>
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
						onClick={handlesave}
						color='primary'
						// className={classes.button}
					>
						SAVE
					</Button>
				</div>
			</form>
			<div>
				<h1 style={{ color: 'black' }}>About {values.firstName}</h1>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.25rem',
						// background: 'rgba(55,55,55,0.6)',
						color: 'black'
					}}
				>
					<div>First Name : {values.firstName}</div>
					<div>Last Name : {values.lastName}</div>
					<div>Birth date : {values.bdate}</div>
					<div>Course : {values.course}</div>
					<div>Degree : {values.degree}</div>
					<div>Batch : {values.batch}</div>
					<div>Gender : {values.gender}</div>
					<div>City : {values.city}</div>
					<div>State : {values.state}</div>
					<div>Country : {values.country}</div>
				</div>
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
