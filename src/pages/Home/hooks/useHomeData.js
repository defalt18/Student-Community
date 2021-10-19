import React from 'react'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

export default function useHomeData() {
	const { status, data: posts } = useFirestoreCollectionData(
		useFirestore().collection('posts').orderBy('timestamp', 'desc')
	)

	const loading = status === 'loading'

	return {
		loading,
		posts
	}
}
