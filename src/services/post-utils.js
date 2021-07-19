import { db } from '../lib/firebase.prod'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'

const SUCCESS = 'Successful'

export const fetchAllPosts = (setter) => {
	const listener = db
		.collection('posts')
		.orderBy('timestamp', 'desc')
		.limit(10)
		.onSnapshot((posts) =>
			setter(
				_reduce(
					posts.docs,
					(posts, post) => [...posts, { id: post.id, post: post.data() }],
					[]
				)
			)
		)
	return listener
}

export const fetchPostsForId = async (id) => {
	const collection = await db.collection('posts').where('UID', '==', id).get()
	return _map(collection.docs, (post) => ({ id: post.id, post: post.data() }))
}

export const createPost = async (post) => {
	const status = await db
		.collection('posts')
		.add(post)
		.catch((error) => error)
	return status || SUCCESS
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
