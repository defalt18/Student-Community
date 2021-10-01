import {
	useFirestore,
	useFirestoreCollectionData,
	useFirestoreDocData
} from 'reactfire'

export default function UseUserData({ userId }) {
	const { status: userStatus, data: userdata } = useFirestoreDocData(
		useFirestore().collection('users').doc(userId)
	)

	const { status: postStatus, data: posts } = useFirestoreCollectionData(
		useFirestore().collection('posts').where('creatorId', '==', userId)
	)

	const loading = userStatus === 'loading' || postStatus === 'loading'

	return {
		loading,
		userdata,
		posts
	}
}
