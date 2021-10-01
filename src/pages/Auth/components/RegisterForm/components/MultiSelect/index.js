/* eslint-disable no-use-before-define */
import React from 'react'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default function FixedTags() {
	const fixedOptions = []
	const [value, setValue] = React.useState([...fixedOptions])

	return (
		<Autocomplete
			multiple
			id='fixed-tags-demo'
			value={value}
			onChange={(event, newValue) => {
				setValue([
					...fixedOptions,
					...newValue.filter((option) => fixedOptions.indexOf(option) === -1)
				])
			}}
			options={SKILLS}
			getOptionLabel={(option) => option}
			renderTags={(tagValue, getTagProps) =>
				tagValue.map((option, index) => (
					<Chip
						label={option}
						{...getTagProps({ index })}
						disabled={fixedOptions.indexOf(option) !== -1}
					/>
				))
			}
			style={{ width: '100%' }}
			renderInput={(params) => (
				<TextField
					{...params}
					label='Fixed tag'
					variant='outlined'
					placeholder='Favorites'
					InputProps={{
						className: {
							color: 'lightgray'
						}
					}}
				/>
			)}
		/>
	)
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const SKILLS = [
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
