import React, { useState, useEffect, useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import { UserList } from '../Profile/User'
import './Search.css'
import { getAllUsersDetails } from '../../services/user-utils'

function SearchBar() {
	const [text, setText] = useState('')
	const [open, setOpen] = useState(false)
	const inpRef = useRef()

	useEffect(() => {
		if (open) {
			inpRef.current.focus();
		}
	}, [open])
	
	useEffect(() => {
		if (open) {
			window.addEventListener('click', close_handler)
			
			return () => {
				window.removeEventListener('click', close_handler)
			}
		}
	})

	function close_handler() {
		setText("");
		setOpen(false);
	}
	
	function click_handler(e) {
		e.stopPropagation();
	}

	return (
		<div onClick={click_handler}>
			<div className={`flex place-items-center px-2 rounded ${open ? 'bg-sky-800 w-96' : ''}`}>
				<button className='bg-transparent' onClick={() => setOpen(true)}>
					<SearchIcon />
				</button>
				{
					open &&
					<>
						<input
							type='text'
							className='inp-search flex-grow'
							placeholder='Search people here'
							value={text}
							ref={inpRef}
							onChange={(e) => {
								setText(e.target.value)
							}}
						/>
						<button className='bg-transparent' onClick={close_handler}>
							<CloseIcon />
						</button>
					</>
				}
			</div>
			{
				open &&
				<SearchResult query={text.trim()} />
			}
		</div>
	)
}

function SearchResult({ query }) {
	const [result, setResult] = useState([])
	const [found, setFound] = useState(true)

	async function fetchUsers(search_query) {
		const users = await getAllUsersDetails(search_query)
		users.length ? setResult(users) : setFound(false)
	}

	useEffect(() => {
		if (query) {
			setResult([])
			setFound(true)
			fetchUsers(query)
		}
	}, [query])

	return (
		<div className='search-result w-96'>
			{/* {query && !found && <div className='not-found'>User Not Found</div>} */}
			{query && <UserList users={result} />}
			{/* loading animation */}
		</div>
	)
}

export { SearchBar }
