import { useAsync } from 'react-use'
import { fetchAllCollectionData } from 'services/post-utils'

export function useAdminData() {
	const { loading: postStatus, value: posts } = useAsync(() =>
		fetchAllCollectionData('posts')
	)
	const { loading: storyStatus, value: stories } = useAsync(() =>
		fetchAllCollectionData('stories')
	)
	const { loading: userStatus, value: users } = useAsync(() =>
		fetchAllCollectionData('users')
	)
	const { loading: eventStatus, value: events } = useAsync(() =>
		fetchAllCollectionData('events')
	)
	const { loading: pollStatus, value: polls } = useAsync(() =>
		fetchAllCollectionData('polls')
	)

	const loading =
		postStatus || storyStatus || pollStatus || eventStatus || userStatus

	return {
		loading,
		data: {
			posts,
			stories,
			events,
			users,
			polls
		}
	}
}
