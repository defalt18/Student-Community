import React from 'react'
import _map from 'lodash/map'
import UserCard from 'components/UserCards'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import { useHomeSuggestions as fetchSuggestions } from 'pages/NewProfile/hooks/useUserData'
import { useAsync } from 'react-use'

function Suggestions(props) {
	const { userdata, user } = props
	const { value: suggests } = useAsync(() => fetchSuggestions(userdata?.batch))

	return (
		<div className='mt-5 text-white flex flex-col'>
			<p className='text-secondary text-outline_blue mb-3'>Suggestions</p>
			{_isEmpty(suggests) ? (
				<p className='text-secondary text-white'>Always be positive...💯</p>
			) : (
				<div className='h-60 overflow-y-scroll flex flex-col gap-y-2'>
					{_map(
						_filter(suggests, (suggest) => suggest.uid !== user.uid),
						(suggest) => (
							<UserCard key={suggest.uid} {...suggest} userdata={userdata} />
						)
					)}
				</div>
			)}
		</div>
	)
}

export default React.memo(Suggestions)
