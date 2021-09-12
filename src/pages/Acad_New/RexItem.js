import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		color: 'white',
		background: 'rgb(31,30,30)'
	},
	media: {
		height: 200
	},
	text: {
		color: 'white'
	}
})

export default function MediaCard({ name, image, text }) {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia className={classes.media} image={image} title={name} />
				<CardContent>
					<Typography
						gutterBottom
						variant='h5'
						component='h2'
						className={classes.text}
					>
						{name}
					</Typography>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'
						className={classes.text}
					>
						{text}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size='small' color='primary'>
					Go to Resource
				</Button>
			</CardActions>
		</Card>
	)
}
