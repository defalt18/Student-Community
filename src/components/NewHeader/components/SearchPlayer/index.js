import React, { useCallback, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Close } from '@material-ui/icons'
import Button from 'components/Button'
import { useThrottle, useToggle } from 'react-use'
import { default as Portal } from 'react-portalize'
import SearchResultDetails from './components/SearchResultDetails'

const closeIconStyles = {
	color: '#7DACF9'
}

function SearchPlayer(props) {
	const { userdata } = props
	const [open, toggle] = useToggle(false)
	const [searchString, setSearch] = useState('')

	const throttledValue = useThrottle(searchString, 2500)

	const onChange = useCallback(
		(_event) => {
			setSearch(_event.target.value)
		},
		[setSearch]
	)

	if (!open)
		return (
			<Button callback={toggle} className='rounded-3xl p-2'>
				<SearchIcon color='inherit' />
			</Button>
		)

	return (
		<Portal container='#search_header'>
			<div className='w-screen h-screen bg-black bg-opacity-50 absolute z-30 top-0 bottom-0 left-0 right-0'>
				<div className='relative top-2 mx-auto flex gap-x-4 p-2 w-120 items-center bg-component_core text-white rounded'>
					<SearchIcon color='inherit' />
					<input
						autoFocus
						value={searchString}
						onChange={onChange}
						onBlur={toggle}
						placeholder='Search in the community'
						className='text-white text-secondary bg-component_core border-none outline-none w-full'
					/>
					<Button callback={toggle} className='rounded-3xl'>
						<Close style={closeIconStyles} />
					</Button>
				</div>
				<SearchResultDetails
					searchString={throttledValue}
					userdata={userdata}
				/>
			</div>
		</Portal>
	)
}

export default React.memo(SearchPlayer)
