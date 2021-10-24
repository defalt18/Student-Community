import { db } from '../lib/firebase.prod'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'

const SUCCESS = 'Successful'

export const fetchAllCollectionData = async (collection) => {
	const result = await db.collection(collection).get()
	return _reduce(
		result.docs,
		(allPosts, post) => [...allPosts, { id: post.id, content: post.data() }],
		[]
	)
}

export const fetchPostsForId = async (id) => {
	const collection = await db.collection('posts').where('UID', '==', id).get()
	return _map(collection.docs, (post) => ({ id: post.id, post: post.data() }))
}

export const createPost = async (post, postId) => {
	const status = await db.collection('posts').doc(postId).set(post)
	return status || SUCCESS
}

export const updatePostPerformance = async (postID, performance) => {
	await db.collection('posts').doc(postID).update({ performance })
}

export const listenToPostCommentsForId = (id, setter) => {
	const listener = db
		.collection('posts')
		.doc(id)
		.collection('comments')
		.orderBy('timestamp', 'desc')
		.onSnapshot((comments) =>
			setter(
				_map(comments.docs, (comment) => ({
					id: comment.id,
					data: comment.data()
				}))
			)
		)
	return listener
}
