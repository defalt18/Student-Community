import { Posts, Stories } from '../fixtures/home-model'
import { db } from 'lib/firebase.prod'

export const fetchHomePosts = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Posts)
		}, 1000)
	})
}
export const fetchHomeStories = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Stories)
		}, 1000)
	})
}

export const fetchSearchResults = async (string) => {
	const documents = await db
		.collection('users')
		.orderBy('firstName')
		.startAt(string)
		.endAt(string + '\uf8ff')
		.get()

	return documents.docs.reduce((allUsers, user) => {
		return [...allUsers, { ...user.data(), uid: user.id }]
	}, [])
}

export const deletePostByID = async (postID) => {
	await db
		.collection('posts')
		.doc(postID)
		.delete()
}
