import {
	useFirestore,
	useFirestoreCollectionData,
	useFirestoreDocData
} from 'reactfire'
import { db } from 'lib/firebase.prod'

export default function UseUserData({ userId }) {
	const { status: userStatus, data: userdata } = useFirestoreDocData(
		useFirestore().collection('users').doc(userId)
	)

	const { status: postStatus, data: posts } = useFirestoreCollectionData(
		useFirestore().collection('posts').where('creatorId', '==', userId)
	)

	const { status: eventStatus, data: events } = useFirestoreCollectionData(
		useFirestore().collection('events').where('creatorId', '==', userId)
	)

	const loading =
		userStatus === 'loading' ||
		postStatus === 'loading' ||
		eventStatus === 'loading'

	return {
		loading,
		userdata,
		posts,
		events
	}
}

export async function useHomeSuggestions(year) {
	const data = await db
		.collection('users')
		.where('batch', '==', year)
		.limit(5)
		.get()

	return data.docs.reduce((allUsers, user) => {
		return [...allUsers, { ...user.data(), uid: user.id }]
	}, [])
}
