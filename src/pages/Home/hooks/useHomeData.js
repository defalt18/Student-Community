import React from 'react'
import {
	useFirestore,
	useFirestoreCollectionData,
	useFirestoreDocData
} from 'reactfire'
import { useAuthListener } from 'hooks'

export default function useHomeData() {
	const { user } = useAuthListener()
	const { status: postStatus, data: posts } = useFirestoreCollectionData(
		useFirestore().collection('posts').orderBy('timestamp', 'desc')
	)

	let { status: storyStatus, data: stories } = useFirestoreCollectionData(
		useFirestore().collection('stories').orderBy('timestamp', 'desc')
	)

	const { status: eventStatus, data: events } = useFirestoreCollectionData(
		useFirestore().collection('events').orderBy('timestamp', 'desc')
	)

	const { status: pollStatus, data: polls } = useFirestoreCollectionData(
		useFirestore().collection('polls').orderBy('timestamp', 'desc')
	)

	const { status: userStatus, data: userdata } = useFirestoreDocData(
		useFirestore().collection('users').doc(user?.uid)
	)

	const loading =
		postStatus === 'loading' ||
		userStatus === 'loading' ||
		eventStatus === 'loading' ||
		pollStatus === 'loading' ||
		storyStatus === 'loading'

	return {
		loading,
		posts,
		userdata,
		stories,
		events,
		polls
	}
}
