import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import RadioGroup from '@material-ui/core/RadioGroup'
import Card from '@material-ui/core/Card'
import { db } from '../lib/firebase.prod'
import Radio from '@material-ui/core/Radio'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { red } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useFirestore, useFirestoreDocData } from 'reactfire'

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
		background: 'rgb(41,39,39)',
		color: 'white'
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(0deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
}))

function PollCard({ pollData, uid }) {
	const { title, description, options, timestamp } = pollData
	const classes = useStyles()
	const [expanded, setExpanded] = React.useState(false)
	const [choice, setChoice] = useState({
		name: '',
		choice: ''
	})

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	const { data: userChoice } = useFirestoreDocData(
		useFirestore()
			.collection('users')
			.doc(uid)
			.collection('polls')
			.doc(pollData.id)
	)

	const handleClick = async () => {
		if (userChoice.choice === undefined) {
			await db
				.collection('users')
				.doc(uid)
				.collection('polls')
				.doc(pollData.id)
				.set({ choice: choice.choice })
			await db
				.collection('polls')
				.doc(pollData.id)
				.update({
					options: {
						...options,
						[choice.name]: {
							...options[choice.name],
							supporters: options[choice.name].supporters + 1
						}
					}
				})
		}
		setExpanded(false)
	}

	return (
		<Card className={classes.root}>
			<div style={{ padding: '0 20px' }}>
				<h2>{title}</h2>
				<p
					style={{ fontSize: 'large' }}
					dangerouslySetInnerHTML={{ __html: description }}
				></p>
			</div>
			<CardActions disableSpacing>
				{expanded && (
					<Button
						color='primary'
						onClick={handleClick}
						disabled={userChoice?.choice !== undefined}
						variant='contained'
						style={{ marginLeft: 10 }}
					>
						Submit your stance
					</Button>
				)}
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'
				>
					<ExpandMoreIcon style={{ color: 'white' }} />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<h3>What is your stance on the matter ?</h3>
					<RadioGroup
						// name={id}
						defaultValue={userChoice?.choice ?? choice}
					>
						{Object.entries(options)?.map(([name, data]) => (
							<>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<Radio
										value={data.option}
										onClick={(e) => {
											setChoice({ name: name, choice: e.target.value })
										}}
										style={{ color: 'white' }}
									/>
									<div>
										<h3 style={{ margin: 0 }}>{data.option}</h3>(
										{data.supporters} people voted this!)
									</div>
								</div>
								<br />
							</>
						))}
					</RadioGroup>
				</CardContent>
			</Collapse>
		</Card>
	)
}

export default React.memo(PollCard)
