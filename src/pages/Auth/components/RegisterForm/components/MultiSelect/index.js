/* eslint-disable no-use-before-define */
import React from 'react'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createTheme();

theme.overrides = {
	MuiAutocomplete: {
		root: {
			backgroundColor: 'rgb(0, 6, 19)',
		}
	},
	MuiOutlinedInput: {
		notchedOutline: {
			borderColor: 'white',
		},
	},
	MuiFormLabel: {
		root: {
			color: 'white',
			"&$focused": {
				color: 'white',
			}
		},
		focused: {}
	},
	MuiChip: {
		root: {
			backgroundColor: 'rgb(170, 176, 189)'
		}
	}
};

export default function FixedTags({ label, placeholder }) {
	const fixedOptions = []
	const [value, setValue] = React.useState([...fixedOptions])

	return (
		<MuiThemeProvider theme={theme} >
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
				fullWidth
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						variant='outlined'
						placeholder={placeholder}
					/>
				)}
			/>
		</MuiThemeProvider>
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
