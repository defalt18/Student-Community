import { useFirestore, useFirestoreCollectionData } from 'reactfire'

function useNotifications(userId) {
	const { data: notifications, status } = useFirestoreCollectionData(
		useFirestore().collection('users').doc(userId).collection('notifications')
	)

	return {
		loading: status === 'loading',
		notifications
	}
}

export default useNotifications
