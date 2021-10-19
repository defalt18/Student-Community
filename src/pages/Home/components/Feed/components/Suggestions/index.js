import React from 'react'
import { useAsync } from 'react-use'
import { fetchHomeSuggestions } from '../../../../utils/home-utils'
import { CircularProgress as Loader } from '@material-ui/core'
import _map from 'lodash/map'
import UserCard from '../../../../../../components/UserCards'

function Suggestions() {
	const { loading, value: suggests } = useAsync(() => fetchHomeSuggestions())

	return (
		<div className='mt-5 text-white flex flex-col'>
			<p className='text-secondary text-outline_blue mb-3'>Suggestions</p>
			{loading ? (
				<Loader className='mx-auto mt-5' color='inherit' />
			) : (
				<div className='h-60 overflow-y-scroll flex flex-col gap-y-2'>
					{_map(suggests, (suggest) => (
						<UserCard key={suggest.id} {...suggest} />
					))}
				</div>
			)}
		</div>
	)
}

export default Suggestions
